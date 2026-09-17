"use client";

import React, { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { Search, Heart, User, Menu, X, Home, Grid2x2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Btn } from "@/components/ui/Btn";
import { useAuth } from "@/components/providers/AuthContext";

const navItems = [
  { label: "Каталог", href: "/catalog" },
  { label: "Фильмы", href: "/catalog?type=movie" },
  { label: "Сериалы", href: "/catalog?type=series" },
  { label: "Избранное", href: "/favorites" },
] as const;

export function Header() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const { isLoggedIn } = useAuth();

  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchActive, setSearchActive] = useState(false);
  const [searchVal, setSearchVal] = useState("");

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY >= 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Точное определение активной ссылки с учётом query-параметров
  const isActive = (href: string) => {
    const [path, query] = href.split("?");
    if (path !== pathname) return false;

    // Если у ссылки нет query-параметров — активна только когда
    // в URL тоже нет соответствующего параметра (например, /catalog без ?type)
    if (!query) return true;

    // Если у ссылки есть query — проверяем совпадение параметра
    const params = new URLSearchParams(query);
    for (const [key, value] of params.entries()) {
      if (searchParams.get(key) !== value) return false;
    }
    return true;
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = searchVal.trim();
    if (!trimmed) return;
    router.push(`/search?q=${encodeURIComponent(trimmed)}`);
    setSearchActive(false);
    setMobileOpen(false);
  };

  return (
    <>
      <header
        className={cn(
          "fixed top-0 inset-x-0 z-50 transition-all duration-300 ease-out",
          scrolled
            ? "bg-[#08080A]/95 backdrop-blur-md border-b border-white/10 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)]"
            : "bg-gradient-to-b from-black/60 to-transparent border-b border-transparent"
        )}
      >
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          <Link
            href="/"
            className="shrink-0 text-xl font-black tracking-tight transition-opacity hover:opacity-90"
          >
            CINE<span className="bg-[linear-gradient(135deg,#FF6A5A,#EF4A4F)] bg-clip-text text-transparent">
              HUB
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "relative px-4 py-2 rounded-lg text-sm font-medium transition-colors",
                  isActive(item.href)
                    ? "text-white bg-white/[0.12] ring-1 ring-white/20"
                    : "text-[#A1A1AA] hover:text-white hover:bg-white/[0.06]"
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            {searchActive ? (
              <form onSubmit={handleSearch} className="flex items-center gap-2">
                <input
                  autoFocus
                  value={searchVal}
                  onChange={(e) => setSearchVal(e.target.value)}
                  placeholder="Поиск по названию..."
                  className="w-48 sm:w-64 bg-[#111113] border border-white/15 rounded-lg px-3 py-1.5 text-sm text-white placeholder:text-[#71717A] outline-none focus:border-[#EF4A4F]/50 focus:ring-1 focus:ring-[#EF4A4F]/30"
                />
                <button
                  type="button"
                  onClick={() => {
                    setSearchActive(false);
                    setSearchVal("");
                  }}
                  className="p-2 text-[#71717A] hover:text-white"
                  aria-label="Закрыть поиск"
                >
                  <X className="w-5 h-5" />
                </button>
              </form>
            ) : (
              <button
                onClick={() => setSearchActive(true)}
                className="p-2 rounded-lg text-[#A1A1AA] hover:text-white hover:bg-white/8 transition-colors"
                aria-label="Поиск"
              >
                <Search className="w-5 h-5" />
              </button>
            )}

            {isLoggedIn ? (
              <Link
                href="/profile"
                className={cn(
                  "w-9 h-9 rounded-full bg-gradient-to-br from-[#EF4A4F] to-[#C73237] flex items-center justify-center text-white text-sm font-bold transition-transform hover:scale-105 shadow-md shadow-[#EF4A4F]/20",
                  pathname === "/profile" && "ring-2 ring-[#EF4A4F]/60"
                )}
              >
                А
              </Link>
            ) : (
              <Link href="/login">
                <Btn size="sm" variant="outline">
                  Войти
                </Btn>
              </Link>
            )}

            <button
              className="md:hidden p-2 text-[#A1A1AA] hover:text-white"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Меню"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {mobileOpen && !searchActive && (
          <div className="md:hidden bg-[#08080A]/98 backdrop-blur-xl border-b border-white/6 px-4 py-3 flex flex-col gap-1 absolute top-16 left-0 right-0">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => {
                  setMobileOpen(false);
                  setSearchActive(false);
                }}
                className={cn(
                  "text-left px-4 py-2.5 rounded-lg text-sm font-medium transition-colors",
                  isActive(item.href)
                    ? "text-white bg-white/[0.12]"
                    : "text-[#A1A1AA] hover:text-white hover:bg-white/5"
                )}
              >
                {item.label}
              </Link>
            ))}
          </div>
        )}
      </header>

      <nav
        className={cn(
          "md:hidden fixed bottom-0 inset-x-0 z-50 bg-[#08080A]/98 backdrop-blur-xl border-t border-white/8 px-2 py-1 flex items-center justify-around safe-area-inset-bottom transition-opacity duration-200",
          searchActive && "opacity-90 blur-sm pointer-events-none"
        )}
      >
        {[
          { icon: Home, label: "Главная", href: "/" },
          { icon: Grid2x2, label: "Каталог", href: "/catalog" },
          { icon: Search, label: "Поиск", href: "/search", disabled: searchActive },
          { icon: Heart, label: "Избранное", href: "/favorites" },
          {
            icon: User,
            label: "Профиль",
            href: isLoggedIn ? "/profile" : "/login",
          },
        ].map(({ icon: Icon, label, href, disabled }) => (
          <Link
            key={label}
            href={href}
            onClick={() => (disabled ? undefined : setMobileOpen(false))}
            className={cn(
              "flex flex-col items-center gap-0.5 px-3 py-2 rounded-xl transition-colors min-w-[44px]",
              isActive(href)
                ? "text-[#EF4A4F]"
                : "text-[#71717A] hover:text-white",
              disabled && "opacity-50 pointer-events-none"
            )}
          >
            <Icon className="w-5 h-5" />
            <span className="text-[10px] font-medium">{label}</span>
          </Link>
        ))}
      </nav>
    </>
  );
}
