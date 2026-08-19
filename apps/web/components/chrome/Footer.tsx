import React from "react";
import Link from "next/link";

const links = [
  { label: "Каталог", href: "/catalog" },
  { label: "Фильмы", href: "/catalog?type=movie" },
  { label: "Сериалы", href: "/catalog?type=series" },
  { label: "Избранное", href: "/favorites" },
  { label: "Профиль", href: "/profile" },
];

export function Footer() {
  return (
    <footer className="relative border-t border-white/8 bg-[#08080A] mt-20 pb-20 md:pb-0 overflow-hidden">
      <div className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-[600px] h-[240px] rounded-full bg-[#EF4A4F]/[0.06] blur-3xl" />
      <div className="relative max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8">
          <div>
            <p className="text-xl font-black tracking-tight">
              CINE<span className="bg-[linear-gradient(135deg,#FF6A5A,#EF4A4F)] bg-clip-text text-transparent">HUB</span>
            </p>
            <p className="text-sm text-[#71717A] mt-2 max-w-xs">
              Премиальный каталог фильмов и сериалов. Откройте для себя мир кино.
            </p>
          </div>
          <div className="flex flex-wrap gap-x-10 gap-y-4">
            {links.map(({ label, href }) => (
              <Link key={label} href={href} className="text-sm text-[#71717A] hover:text-white transition-colors">
                {label}
              </Link>
            ))}
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-white/6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-[#3f3f46]">© 2026 CineHub. Концепт. Все права защищены.</p>
          <p className="text-xs text-[#3f3f46]">Только для просмотра. Видеоплеер не предусмотрен в MVP.</p>
        </div>
      </div>
    </footer>
  );
}
