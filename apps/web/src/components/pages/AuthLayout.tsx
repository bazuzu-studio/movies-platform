import React from "react";
import Link from "next/link";

const LEGAL_LINKS = [
  { label: "Условия использования", href: "/terms" },
  { label: "Конфиденциальность", href: "/privacy" },
  { label: "Правообладателям", href: "/copyright" },
  { label: "Контакты", href: "/contact" },
];

interface AuthLayoutProps {
  children: React.ReactNode;
  /**
   * Показывать под формой описание сайта и ссылки на юридические страницы.
   * Страницы входа/регистрации рендерятся без шапки и подвала, и без этого
   * блока остаётся голая форма с полем пароля — именно так выглядят
   * фишинговые страницы, и антифишинговые фильтры на них реагируют.
   * Там, где подвал сайта уже есть (контакты), передайте legal={false}.
   */
  legal?: boolean;
}

export function AuthLayout({ children, legal = true }: AuthLayoutProps) {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 relative">
      <div className="absolute inset-0 bg-gradient-to-br from-[#08080A] via-[#121214] to-[#08080A]" />
      <div
        className="absolute inset-0 opacity-30"
        style={{ backgroundImage: "radial-gradient(ellipse at 20% 50%, rgba(239,74,79,0.15) 0%, transparent 60%)" }}
      />
      <div className="relative w-full max-w-sm">
        <div className="text-center mb-8">
          <Link href="/" className="inline-block text-2xl font-black tracking-tight" aria-label="otakuum — на главную">
            ota<span className="text-[#EF4A4F]">kuum</span>
          </Link>
          {legal && (
            <p className="mt-2 text-xs text-[#8E8E98]">Каталог аниме, фильмов и сериалов · otakuum.ru</p>
          )}
        </div>
        <div className="bg-[#121214] border border-white/8 rounded-2xl p-8 shadow-2xl">{children}</div>
        {legal && (
          <footer className="mt-6 text-center">
            <nav aria-label="Информация о сайте" className="flex flex-wrap justify-center gap-x-4 gap-y-1.5">
              {LEGAL_LINKS.map(({ label, href }) => (
                <Link key={href} href={href} className="text-xs text-[#8E8E98] hover:text-white transition-colors">
                  {label}
                </Link>
              ))}
            </nav>
            <p className="mt-3 text-xs text-[#6B6B75] leading-relaxed">
              Пароль вводите только на otakuum.ru. Мы никогда не просим его по почте или в сообщениях.
            </p>
            <p className="mt-2 text-xs text-[#6B6B75]">© {new Date().getFullYear()} otakuum</p>
          </footer>
        )}
      </div>
    </div>
  );
}
