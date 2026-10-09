import React from "react";
import Link from "next/link";

const DOCS = [
  { label: "Условия использования", href: "/terms" },
  { label: "Конфиденциальность", href: "/privacy" },
  { label: "Правообладателям", href: "/copyright" },
  { label: "Контакты", href: "/contact" },
];

interface LegalPageProps {
  title: string;
  updated: string;
  children: React.ReactNode;
}

/** Единая обёртка юридических страниц: заголовок, дата, навигация между документами. */
export function LegalPage({ title, updated, children }: LegalPageProps) {
  return (
    <div className="mx-auto max-w-3xl px-4 pb-16 pt-24 sm:px-6">
      <h1 className="mb-2 text-3xl font-black tracking-tight text-white">{title}</h1>
      <p className="mb-8 text-xs text-[#6B6B75]">Последнее обновление: {updated}</p>
      <div className="space-y-4 text-sm leading-relaxed text-[#A1A1AA]">{children}</div>
      <nav aria-label="Другие документы" className="mt-12 flex flex-wrap gap-x-5 gap-y-2 border-t border-white/8 pt-6">
        {DOCS.map(({ label, href }) => (
          <Link key={href} href={href} className="text-sm text-[#8E8E98] transition-colors hover:text-white">
            {label}
          </Link>
        ))}
      </nav>
    </div>
  );
}

export function H2({ children }: { children: React.ReactNode }) {
  return <h2 className="pt-4 text-lg font-bold text-white">{children}</h2>;
}

export function A({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="text-[#FF7A7D] underline">
      {children}
    </Link>
  );
}
