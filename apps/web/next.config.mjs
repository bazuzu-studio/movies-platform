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
    ],
  },
};

export default nextConfig;
