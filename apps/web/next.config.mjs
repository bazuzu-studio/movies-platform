/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      // TODO: добавить домен хранилища MinIO/S3 из ТЗ (раздел 2), когда
      // изображения начнут отдаваться с backend, например:
      // { protocol: "https", hostname: "media.cinehub.example.com" },

       {
        protocol: "http", // Локальные серверы обычно работают без SSL
        hostname: "localhost",
        port: "9000", // Замените на порт вашего бэкенда (например, 5000, 8080 или 4000)
      },
      {
        protocol: "http", // Локальные серверы обычно работают без SSL
        hostname: "localhost",
        port: "9001", // Замените на порт вашего бэкенда (например, 5000, 8080 или 4000)
      },
      {
        protocol: "http", // Локальные серверы обычно работают без SSL
        hostname: "localhost",
        port: "4000", // Замените на порт вашего бэкенда (например, 5000, 8080 или 4000)
      },
    ],
  },
};

export default nextConfig;
