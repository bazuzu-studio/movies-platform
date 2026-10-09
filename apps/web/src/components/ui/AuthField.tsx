"use client";

import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface AuthFieldProps {
  id: string;
  label: string;
  type?: "text" | "email" | "password";
  value: string;
  onChange: (value: string) => void;
  /** Значение атрибута autocomplete: email, username, name, current-password, new-password. */
  autoComplete: string;
  placeholder?: string;
  icon?: LucideIcon;
  required?: boolean;
  disabled?: boolean;
  maxLength?: number;
  /** Короткая подсказка под полем (например, требования к паролю). */
  hint?: string;
}

/**
 * Поле формы авторизации. Одно место для того, что раньше повторялось в
 * каждой форме: связка label/input через id, name и autocomplete (чтобы
 * менеджеры паролей и браузер понимали, что это за форма), кнопка
 * «показать пароль» с подписью для скринридеров.
 */
export function AuthField({
  id,
  label,
  type = "text",
  value,
  onChange,
  autoComplete,
  placeholder,
  icon: Icon,
  required = true,
  disabled,
  maxLength,
  hint,
}: AuthFieldProps) {
  const [revealed, setRevealed] = useState(false);
  const isPassword = type === "password";

  return (
    <div>
      <label htmlFor={id} className="block text-xs font-medium text-[#A1A1AA] mb-1.5">
        {label}
      </label>
      <div className="relative">
        {Icon && (
          <Icon
            aria-hidden="true"
            className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8E8E98]"
          />
        )}
        <input
          id={id}
          name={id}
          type={isPassword && revealed ? "text" : type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          autoComplete={autoComplete}
          autoCapitalize={type === "email" ? "none" : undefined}
          spellCheck={false}
          required={required}
          disabled={disabled}
          maxLength={maxLength}
          placeholder={placeholder}
          aria-describedby={hint ? `${id}-hint` : undefined}
          className={`w-full bg-white/5 border border-white/10 rounded-xl py-3 text-sm text-white placeholder:text-[#6B6B75] outline-none focus:border-[#EF4A4F]/50 transition-colors disabled:opacity-60 ${
            Icon ? "pl-10" : "pl-4"
          } ${isPassword ? "pr-11" : "pr-4"}`}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setRevealed((v) => !v)}
            aria-label={revealed ? "Скрыть пароль" : "Показать пароль"}
            aria-pressed={revealed}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 text-[#8E8E98] hover:text-white"
          >
            {revealed ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        )}
      </div>
      {hint && (
        <p id={`${id}-hint`} className="mt-1.5 text-xs text-[#6B6B75]">
          {hint}
        </p>
      )}
    </div>
  );
}
