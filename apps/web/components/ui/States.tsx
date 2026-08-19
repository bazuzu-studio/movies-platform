import React from "react";
import { Btn } from "./Btn";

export function EmptyState({
  icon: Icon,
  title,
  subtitle,
  action,
}: {
  icon: React.ElementType;
  title: string;
  subtitle: string;
  action?: { label: string; onClick: () => void };
}) {
  return (
    <div className="flex flex-col items-center justify-center py-24 gap-4 text-center px-4">
      <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/8 flex items-center justify-center">
        <Icon className="w-7 h-7 text-[#71717A]" />
      </div>
      <div>
        <p className="text-lg font-semibold text-white">{title}</p>
        <p className="text-sm text-[#71717A] mt-1 max-w-xs">{subtitle}</p>
      </div>
      {action && (
        <Btn variant="outline" size="sm" onClick={action.onClick}>
          {action.label}
        </Btn>
      )}
    </div>
  );
}

export function SkeletonCard() {
  return (
    <div className="animate-pulse">
      <div className="aspect-[2/3] rounded-xl bg-white/6" />
      <div className="mt-3 space-y-2">
        <div className="h-3.5 bg-white/6 rounded w-3/4" />
        <div className="h-3 bg-white/4 rounded w-1/2" />
      </div>
    </div>
  );
}
