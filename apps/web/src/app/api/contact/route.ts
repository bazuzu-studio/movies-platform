import { NextRequest, NextResponse } from "next/server";

import { contactMessageEndpointUrl } from "@/lib/cms";

/**
 * POST /api/contact
 *
 * Сам не отправляет писем — только валидирует запрос и проксирует его в
 * CMS (POST <cms>/api/contact-message, см. apps/cms/src/endpoints/contact-message.ts),
 * где уже настроен email-адаптер (nodemailer). Так во frontend-приложении
 * нет собственных SMTP-учётных данных.
 *
 * CMS повторяет ту же валидацию у себя (defense in depth, endpoint публичный
 * и может быть вызван напрямую) — проверки здесь нужны в первую очередь,
 * чтобы не тратить сетевой запрос к CMS на заведомо некорректные данные
 * и чтобы честно и быстро сработал rate-limit/honeypot на этом уровне.
 */

const NAME_MAX = 100;
const EMAIL_MAX = 200;
const MESSAGE_MIN = 10;
const MESSAGE_MAX = 5000;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Простой in-memory rate-limit: не более 3 писем в час с одного IP.
// Сбрасывается при рестарте процесса — этого достаточно, чтобы отсечь
// случайного бота; CMS дополнительно применяет свой (более мягкий) лимит.
const RATE_LIMIT = 3;
const RATE_WINDOW_MS = 60 * 60 * 1000;
const hits = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = (hits.get(ip) ?? []).filter((t) => now - t < RATE_WINDOW_MS);

  if (timestamps.length >= RATE_LIMIT) {
    hits.set(ip, timestamps);
    return true;
  }

  timestamps.push(now);
  hits.set(ip, timestamps);
  return false;
}

// Сколько ждём ответа от CMS, прежде чем считать её недоступной.
// Без этого таймаута зависший/недоступный CMS-хост держал бы соединение
// с браузером открытым неопределённо долго.
const CMS_TIMEOUT_MS = 10_000;

export async function POST(request: NextRequest) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { message: "Слишком много сообщений, попробуйте позже" },
      { status: 429 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ message: "Некорректный запрос" }, { status: 400 });
  }

  const { name, email, message, website } = (body as Record<string, unknown>) ?? {};

  // Honeypot: проходит без реальной отправки, чтобы боту не подсказывать,
  // что его вычислили (тот же приём продублирован и на стороне CMS).
  if (typeof website === "string" && website.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  if (typeof name !== "string" || typeof email !== "string" || typeof message !== "string") {
    return NextResponse.json({ message: "Заполните все поля" }, { status: 400 });
  }

  const trimmedName = name.trim();
  const trimmedEmail = email.trim();
  const trimmedMessage = message.trim();

  if (!trimmedName || trimmedName.length > NAME_MAX) {
    return NextResponse.json({ message: "Некорректное имя" }, { status: 400 });
  }

  if (!EMAIL_RE.test(trimmedEmail) || trimmedEmail.length > EMAIL_MAX) {
    return NextResponse.json({ message: "Некорректный email" }, { status: 400 });
  }

  if (trimmedMessage.length < MESSAGE_MIN || trimmedMessage.length > MESSAGE_MAX) {
    return NextResponse.json(
      { message: `Сообщение должно быть от ${MESSAGE_MIN} до ${MESSAGE_MAX} символов` },
      { status: 400 },
    );
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), CMS_TIMEOUT_MS);

  let cmsResponse: Response;
  try {
    cmsResponse = await fetch(contactMessageEndpointUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: trimmedName, email: trimmedEmail, message: trimmedMessage }),
      signal: controller.signal,
    });
  } catch (error) {
    const isTimeout = error instanceof Error && error.name === "AbortError";
    console.error(
      `POST /api/contact: не удалось достучаться до CMS (${contactMessageEndpointUrl})`,
      isTimeout ? "timeout" : error,
    );

    return NextResponse.json(
      { message: "Не удалось отправить сообщение, попробуйте позже" },
      { status: 502 },
    );
  } finally {
    clearTimeout(timeout);
  }

  // Тело ответа CMS парсим отдельно от проверки статуса: если у CMS сбой
  // (например, отдаёт HTML-страницу 502 от reverse proxy, а не JSON),
  // res.json() сам бросит — это тоже валидный повод вернуть 502 с понятным
  // сообщением, а не падать с необработанным исключением.
  const data = await cmsResponse.json().catch(() => null) as { message?: string; ok?: boolean } | null;

  if (!cmsResponse.ok) {
    console.error(
      `POST /api/contact: CMS ответила ${cmsResponse.status}`,
      data?.message ?? "(без сообщения)",
    );

    // 4xx от CMS означает, что CMS сама не приняла данные (например, её
    // валидация строже — расхождение стоит явно увидеть в логах, см. выше),
    // а не что письмо технически не отправилось. Пробрасываем её сообщение
    // пользователю как есть — оно уже написано по-русски и без внутренних
    // деталей (см. apps/cms/src/endpoints/contact-message.ts).
    // 5xx от CMS (SMTP недоступен и т.п.) — тоже отдаём как есть, статус
    // сохраняем, чтобы клиент мог отличить "неверные данные" от "попробуйте позже".
    return NextResponse.json(
      { message: data?.message || "Не удалось отправить сообщение, попробуйте позже" },
      { status: cmsResponse.status },
    );
  }

  return NextResponse.json({ ok: true });
}
