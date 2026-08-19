"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { Header } from "./Header";
import { Footer } from "./Footer";

const NO_CHROME = ["/login", "/register", "/forgot-password"];

export function AppChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const showChrome = !NO_CHROME.includes(pathname);

  return (
    <>
      {showChrome && <Header />}
      <main>{children}</main>
      {showChrome && <Footer />}
    </>
  );
}
