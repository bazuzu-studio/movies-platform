import React from "react";

export function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 relative">
      <div className="absolute inset-0 bg-gradient-to-br from-[#08080A] via-[#121214] to-[#08080A]" />
      <div
        className="absolute inset-0 opacity-30"
        style={{ backgroundImage: "radial-gradient(ellipse at 20% 50%, rgba(239,74,79,0.15) 0%, transparent 60%)" }}
      />
      <div className="relative w-full max-w-sm">
        <div className="text-center mb-8">
          <p className="text-2xl font-black tracking-tight">
            CINE<span className="text-[#EF4A4F]">HUB</span>
          </p>
        </div>
        <div className="bg-[#121214] border border-white/8 rounded-2xl p-8 shadow-2xl">{children}</div>
      </div>
    </div>
  );
}
