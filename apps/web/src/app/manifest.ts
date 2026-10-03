import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "otakuum — фильмы и сериалы",
    short_name: "otakuum",
    description: "Каталог фильмов и сериалов",
    start_url: "/",
    display: "standalone",
    background_color: "#08080A",
    theme_color: "#08080A",
    lang: "ru",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
      { src: "/icon-maskable-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
