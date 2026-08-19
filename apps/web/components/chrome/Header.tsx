"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { Search, Heart, User, Menu, X, Home, Grid2x2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Btn } from "@/components/ui/Btn";
import { useAuth } from "@/components/providers/AuthContext";

const navItems = [
  { label: "Каталог", href: "/catalog" },
  { label: "Фильмы", href: "/catalog?type=movie" },
  { label: "Сериалы", href: "/catalog?type=series" },
  { label: "Избранное", href: "/favorites" },
];

export function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const { isLoggedIn } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchActive, setSearchActive] = useState(false);
  const [searchVal, setSearchVal] = useState("");

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchVal.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchVal.trim())}`);
      setSearchActive(false);
    }
  };

  return (
    <>
      <header
        className={cn(
          "fixed top-0 inset-x-0 z-50 transition-all duration-300",
          scrolled
            ? "bg-[#08080A]/90 backdrop-blur-xl border-b border-white/8 shadow-[0_8px_30px_-8px_rgba(0,0,0,0.6)]"
            : "bg-gradient-to-b from-black/50 to-transparent border-b border-transparent"
        )}
      >
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          <Link href="/" className="shrink-0 text-xl font-black tracking-tight transition-opacity hover:opacity-90">
            CINE<span className="bg-[linear-gradient(135deg,#FF6A5A,#EF4A4F)] bg-clip-text text-transparent">HUB</span>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className={cn(
                  "relative px-4 py-2 rounded-lg text-sm font-medium transition-colors",
                  pathname === item.href.split("?")[0]
                    ? "text-white bg-white/[0.07]"
                    : "text-[#A1A1AA] hover:text-white hover:bg-white/[0.04]"
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
                  placeholder="Поиск..."
                  className="w-48 sm:w-64 bg-white/8 border border-white/10 rounded-lg px-3 py-1.5 text-sm text-white placeholder:text-[#71717A] outline-none focus:border-[#EF4A4F]/50"
                />
                <button type="button" onClick={() => setSearchActive(false)} className="p-2 text-[#71717A] hover:text-white">
                  <X className="w-4 h-4" />
                </button>
              </form>
            ) : (
              <button
                onClick={() => setSearchActive(true)}
                className="p-2 rounded-lg text-[#A1A1AA] hover:text-white hover:bg-white/6 transition-colors"
                aria-label="Поиск"
              >
                <Search className="w-5 h-5" />
              </button>
            )}

            {isLoggedIn ? (
              <Link
                href="/profile"
                className={cn(
                  "w-9 h-9 rounded-full bg-gradient-to-br from-[#EF4A4F] to-[#C73237] flex items-center justify-center text-white text-sm font-bold transition-transform hover:scale-105",
                  pathname === "/profile" && "ring-2 ring-[#EF4A4F]/50"
                )}
              >
                А
              </Link>
            ) : (
              <Link href="/login">
                <Btn size="sm">Войти</Btn>
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

        {mobileOpen && (
          <div className="md:hidden bg-[#08080A]/98 backdrop-blur-xl border-b border-white/6 px-4 py-3 flex flex-col gap-1">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="text-left px-4 py-2.5 rounded-lg text-sm font-medium text-[#A1A1AA] hover:text-white hover:bg-white/5 transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </div>
        )}
      </header>

      <nav className="md:hidden fixed bottom-0 inset-x-0 z-50 bg-[#08080A]/98 backdrop-blur-xl border-t border-white/8 px-2 py-1 flex items-center justify-around safe-area-inset-bottom">
        {[
          { icon: Home, label: "Главная", href: "/" },
          { icon: Grid2x2, label: "Каталог", href: "/catalog" },
          { icon: Search, label: "Поиск", href: "/search" },
          { icon: Heart, label: "Избранное", href: "/favorites" },
          { icon: User, label: "Профиль", href: isLoggedIn ? "/profile" : "/login" },
        ].map(({ icon: Icon, label, href }) => (
          <Link
            key={label}
            href={href}
            className={cn(
              "flex flex-col items-center gap-0.5 px-3 py-2 rounded-xl transition-colors min-w-[44px]",
              pathname === href ? "text-[#EF4A4F]" : "text-[#71717A] hover:text-white"
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
