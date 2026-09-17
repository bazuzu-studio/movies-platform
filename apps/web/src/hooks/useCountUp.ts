// useCountUp.ts
"use client";

import { useEffect, useState } from "react";

export function useCountUp(from: number, to: number, duration = 600) {
  const [displayValue, setDisplayValue] = useState<number>(from);

  useEffect(() => {
    if (from === to) {
      setDisplayValue(to);
      return;
    }

    const start = performance.now();

    const step = (timestamp: number) => {
      const elapsed = timestamp - start;
      const progress = Math.min(elapsed / duration, 1);
      const current = from + Math.floor((to - from) * progress);
      setDisplayValue(current);

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        setDisplayValue(to);
      }
    };

    requestAnimationFrame(step);
  }, [from, to, duration]);

  return displayValue;
}
