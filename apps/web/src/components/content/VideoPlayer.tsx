"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { getSafeEmbedUrl } from "@/lib/embed-allowlist";

interface VideoPlayerProps {
  embedUrl: string | undefined | null;
  episodeNumber?: number;
  className?: string;
}

const LOAD_TIMEOUT_MS = 15_000;

function buildEmbedSrc(base: string, episodeNumber?: number): string {
  if (!episodeNumber) return base;
  const url = new URL(base);
  url.searchParams.set("episode", String(episodeNumber));
  return url.toString();
}

export function VideoPlayer({ embedUrl, episodeNumber, className }: VideoPlayerProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [loading, setLoading] = useState(true);
  const [timedOut, setTimedOut] = useState(false);
  // Форс-ремонт iframe при retry: меняем ключ → React пересоздаёт элемент
  const [retryKey, setRetryKey] = useState(0);

  const safeUrl = getSafeEmbedUrl(embedUrl);
  const src = safeUrl ? buildEmbedSrc(safeUrl, episodeNumber) : null;

  const handleLoad = useCallback(() => {
    setLoading(false);
    setTimedOut(false);
  }, []);

  useEffect(() => {
    if (!src) {
      setLoading(false);
      return;
    }

    setLoading(true);
    setTimedOut(false);

    const timer = setTimeout(() => {
      setLoading((prev) => {
        if (prev) setTimedOut(true);
        return false;
      });
    }, LOAD_TIMEOUT_MS);

    return () => clearTimeout(timer);
  }, [src, retryKey]);

  console.log(safeUrl);
  

  // Fallback: нет валидного URL
  if (!src) {
    return (
      <div className="flex aspect-video w-full items-center justify-center rounded-xl bg-[#0a0a0c] text-zinc-500 border border-white/8">
        <div className="flex flex-col items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="48"
            height="48"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect width="20" height="14" x="2" y="3" rx="2" />
            <line x1="8" x2="16" y1="21" y2="21" />
            <line x1="12" x2="12" y1="17" y2="21" />
          </svg>
          <p className="text-sm">
            {embedUrl ? "Видео скоро появится" : "Выберите эпизод для просмотра"}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-black">
      {loading && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-[#0a0a0c]">
          {timedOut ? (
            <div className="flex flex-col items-center gap-3 text-zinc-400">
              <p className="text-sm">Не удалось загрузить плеер</p>
              <button
                type="button"
                onClick={() => {
                  setRetryKey((k) => k + 1);
                  setLoading(true);
                  setTimedOut(false);
                }}
                className="rounded-lg bg-zinc-700 px-4 py-2 text-sm text-white transition hover:bg-zinc-600"
              >
                Повторить
              </button>
            </div>
          ) : (
            <div className="h-10 w-10 animate-spin rounded-full border-2 border-zinc-600 border-t-white" />
          )}
        </div>
      )}

      {/* key меняется при смене серии И при retry → iframe пересоздаётся, src никогда не пустой */}
      <iframe
        key={`${src}-${retryKey}`}
        ref={iframeRef}
        src={src}
        className="absolute inset-0 h-full w-full"
        allow="autoplay; fullscreen; picture-in-picture"
        allowFullScreen
        sandbox="allow-scripts allow-same-origin allow-presentation"
        referrerPolicy="no-referrer"
        loading="lazy"
        onLoad={handleLoad}
        title="Видеоплеер"
      />
    </div>
  );
}
