"use client";

import React, { Suspense } from "react";
import { usePathname } from "next/navigation";
import { Header } from "./Header";
import { Footer } from "./Footer";

const NO_CHROME = ["/login", "/register", "/forgot-password"];

export function AppChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const showChrome = !NO_CHROME.includes(pathname);

  return (
    <>
       <Suspense fallback={null}>{showChrome && <Header />}</Suspense>
      <main>{children}</main>
      {showChrome && <Footer />}
    </>
  );
}
