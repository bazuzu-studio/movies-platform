// Публичный URL S3/MinIO (например https://s3.otakuum.ru/media) — берётся при сборке,
// чтобы next/image разрешил картинки с этого хоста.
const s3PublicUrl = process.env.S3_INTERNAL_URL;
const s3Pattern = (() => {
  if (!s3PublicUrl) return null;
  try {
    const u = new URL(s3PublicUrl);
    return {
      protocol: u.protocol.replace(":", ""),
      hostname: u.hostname,
      ...(u.port ? { port: u.port } : {}),
    };
  } catch {
    return null;
  }
})();

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Минимальный самодостаточный сервер для Docker (.next/standalone)
  output: "standalone",
  images: {
    remotePatterns: [
      { protocol: 'http', hostname: 'minio',  // ← имя сервиса из docker-compose
        port: '9000', },
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "http", hostname: "localhost" }, // dev: картинки с localhost:*
      ...(s3Pattern ? [s3Pattern] : []),
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
