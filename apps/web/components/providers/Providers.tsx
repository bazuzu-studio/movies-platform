"use client";

import React from "react";
import { Toaster } from "sonner";
import { AuthProvider } from "./AuthContext";
import { FavoritesProvider } from "./FavoritesContext";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <FavoritesProvider>
        {children}
        <Toaster
          position="top-right"
          toastOptions={{
            style: { background: "#1A1A1D", border: "1px solid rgba(255,255,255,0.1)", color: "#FAFAFA" },
          }}
        />
      </FavoritesProvider>
    </AuthProvider>
  );
}
