import React from "react";
import { cn } from "@/lib/utils";

interface BtnProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "ghost" | "outline" | "danger";
  size?: "sm" | "md" | "lg";
}

export function Btn({ variant = "primary", size = "md", className, children, ...rest }: BtnProps) {
  const base =
    "inline-flex items-center justify-center gap-2 font-semibold rounded-xl transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#EF4A4F]/50 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.97]";
  const variants = {
    primary:
      "text-white bg-[linear-gradient(135deg,#FF6A5A_0%,#EF4A4F_55%,#C7333B_100%)] shadow-[0_1px_0_rgba(255,255,255,0.15)_inset,0_10px_24px_-8px_rgba(239,74,79,0.55)] hover:shadow-[0_1px_0_rgba(255,255,255,0.2)_inset,0_14px_32px_-8px_rgba(239,74,79,0.7)] hover:brightness-[1.06]",
    ghost: "text-[#A1A1AA] hover:text-white hover:bg-white/6",
    outline:
      "border border-white/12 text-white bg-white/[0.02] hover:bg-white/8 hover:border-white/25 backdrop-blur-sm",
    danger: "bg-[#EF4A4F]/10 text-[#FF7A7D] hover:bg-[#EF4A4F]/20 border border-[#EF4A4F]/25",
  };
  const sizes = { sm: "px-3 py-1.5 text-sm", md: "px-5 py-2.5 text-sm", lg: "px-7 py-3.5 text-base" };
  return (
    <button className={cn(base, variants[variant], sizes[size], className)} {...rest}>
      {children}
    </button>
  );
}
