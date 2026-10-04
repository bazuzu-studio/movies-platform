// Хосты S3/MinIO, с которых next/image может тянуть картинки. Значения берутся
// ПРИ СБОРКЕ (remotePatterns вшиваются в образ), поэтому в Dockerfile/compose
// они передаются как build args:
//   S3_PUBLIC_URL   — публичный адрес файлов, например https://s3.otakuum.ru/media
//   S3_INTERNAL_URL — (необязательно) внутренний адрес MinIO в docker-сети
function patternFromUrl(value) {
  if (!value) return null;
  try {
    const u = new URL(value);
    return {
      protocol: u.protocol.replace(":", ""),
      hostname: u.hostname,
      ...(u.port ? { port: u.port } : {}),
    };
  } catch {
    return null;
  }
}

const s3Patterns = [process.env.S3_PUBLIC_URL, process.env.S3_INTERNAL_URL]
  .map(patternFromUrl)
  .filter(Boolean);

const isProd = process.env.NODE_ENV === "production";

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Минимальный самодостаточный сервер для Docker (.next/standalone)
  output: "standalone",
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      ...s3Patterns,
      // Только для локальной разработки (docker-compose.local.yml / pnpm dev)
      ...(isProd
        ? []
        : [
            { protocol: "http", hostname: "minio", port: "9000" },
            { protocol: "http", hostname: "localhost" },
          ]),
    ],
  },
  headers: async () => [
    {
      source: "/:path*",
      headers: [
        {
          key: "Content-Security-Policy",
          // frame-src — синхронно с ALLOWED_EMBED_HOSTS в src/lib/embed-allowlist.ts.
          // frame-ancestors запрещает встраивать сайт чужим страницам,
          // base-uri/object-src закрывают подмену <base> и плагины.
          value:
            "frame-src 'self' kodikplayer.com embed.kinobox.ru video.collabs.ru; frame-ancestors 'self'; base-uri 'self'; object-src 'none';",
        },
        { key: "X-Content-Type-Options", value: "nosniff" },
        { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        {
          key: "Permissions-Policy",
          value: "camera=(), microphone=(), geolocation=()",
        },
      ],
    },
  ],
};

export default nextConfig;
