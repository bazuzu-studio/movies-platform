import type { NextRequest } from "next/server";

/**
 * IP клиента для rate-limit. x-forwarded-for дописывается прокси В КОНЕЦ, а
 * первые элементы клиент может подделать, поэтому берём адрес справа:
 * TRUSTED_PROXY_HOPS = 1 (Traefik) или 2 (Cloudflare → Traefik).
 */
const HOPS = Math.max(1, Number(process.env.TRUSTED_PROXY_HOPS) || 1);

export function getClientIp(request: NextRequest): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    const parts = forwarded.split(",").map((p) => p.trim()).filter(Boolean);
    const ip = parts[Math.max(0, parts.length - HOPS)];
    if (ip) return ip;
  }
  return request.headers.get("x-real-ip")?.trim() || "unknown";
}
