/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "http", hostname: "localhost" }, // разрешает картинки с localhost:*
    ],
  },
  headers: async () => [
    {
      source: "/:path*",
      headers: [
        {
          key: "Content-Security-Policy",
          value:
            "frame-src 'self' kodikplayer.com; " 
            // "img-src 'self' data: https: http:; " +
            // // Самое важное: разрешаем запросы к Payload на localhost:4000
            // "connect-src 'self' http://localhost:4000; " +
            // "script-src 'self'; " +
            // "style-src 'self' 'unsafe-inline'; " +
            // "font-src 'self';",
        },
      ],
    },
  ],
};

export default nextConfig;
