import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import React from "react";
import "./globals.css";
import { Providers } from "@/components/providers/Providers";
import { AppChrome } from "@/components/chrome/AppChrome";


// next/font самостоятельно скачивает и самостоятельно хостит шрифт при сборке
// (self-hosted, без раннего внешнего запроса к fonts.googleapis.com):
// это устраняет layout shift/блокирующий запрос и помогает уложиться в
// LCP ≤ 2.5s из ТЗ (п.4.1), а также убирает предупреждение сборщика о
// порядке @import в globals.css.
const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  // viewport-fit=cover нужен, чтобы env(safe-area-inset-bottom) работал на
  // iPhone с «чёлкой»/жестовой полосой — иначе нижняя навигация налезает на неё.
  viewportFit: "cover",
  themeColor: "#08080A",
};

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: {
    default: "otakuum — фильмы и сериалы",
    template: "%s · otakuum",
  },
  description: "Премиальный каталог фильмов и сериалов otakuum. Смотрите описания, рейтинги и добавляйте в избранное.",
  icons: {
    icon: [{ url: "/icon-192.png", sizes: "192x192", type: "image/png" }],
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    type: "website",
    siteName: "otakuum",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" className={`dark ${inter.variable}`}>
      <body className="min-h-screen bg-[#08080A] text-white antialiased">
        <Providers>
          <AppChrome>{children}</AppChrome>
        </Providers>
      </body>
    </html>
  );
}
