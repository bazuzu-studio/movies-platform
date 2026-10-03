"use client";

import { useSyncExternalStore } from "react";
import { AGE_CONFIRMED_KEY } from "@/lib/age";

const EVENT = "age-confirmed";

function subscribe(cb: () => void) {
  window.addEventListener("storage", cb);
  window.addEventListener(EVENT, cb);
  return () => {
    window.removeEventListener("storage", cb);
    window.removeEventListener(EVENT, cb);
  };
}

function getSnapshot(): boolean {
  try {
    return localStorage.getItem(AGE_CONFIRMED_KEY) === "true";
  } catch {
    return false;
  }
}

/**
 * Подтвердил ли посетитель, что ему есть 18. На сервере и при гидратации
 * всегда false (HTML совпадает), затем читается localStorage. Обновляется во
 * всех компонентах сразу, как только возраст подтверждён где-то одном.
 */
export function useAgeConfirmed(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, () => false);
}

export function confirmAge() {
  try {
    localStorage.setItem(AGE_CONFIRMED_KEY, "true");
  } catch {
    // localStorage недоступен (приватный режим) — подтверждение живёт до перезагрузки.
  }
  window.dispatchEvent(new Event(EVENT));
}
