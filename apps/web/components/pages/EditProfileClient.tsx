"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
import { Btn } from "@/components/ui/Btn";
import { useAuth } from "@/components/providers/AuthContext";

export function EditProfileClient() {
  const router = useRouter();
  const { user, updateProfile } = useAuth();
  const [name, setName] = useState(user?.name ?? "");
  const [email, setEmail] = useState(user?.email ?? "");
  const [showPass, setShowPass] = useState(false);
  const [password, setPassword] = useState("");

  if (!user) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: заменить на PATCH /api/users/:id (ТЗ, раздел 9)
    updateProfile({ name, email });
    toast.success("Профиль обновлён");
    router.push("/profile");
  };

  return (
    <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-8">
      <button
        onClick={() => router.push("/profile")}
        className="flex items-center gap-2 text-sm text-[#71717A] hover:text-white mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> Назад к профилю
      </button>
      <h1 className="text-3xl font-black tracking-tight text-white mb-8">Редактировать профиль</h1>

      <form onSubmit={handleSubmit} className="max-w-md flex flex-col gap-5">
        <div>
          <label className="block text-sm font-medium text-[#A1A1AA] mb-2">Имя</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-[#EF4A4F]/50 transition-colors"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-[#A1A1AA] mb-2">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-[#EF4A4F]/50 transition-colors"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-[#A1A1AA] mb-2">Новый пароль</label>
          <div className="relative">
            <input
              type={showPass ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Оставьте пустым, чтобы не менять"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-[#3f3f46] outline-none focus:border-[#EF4A4F]/50 transition-colors pr-12"
            />
            <button
              type="button"
              onClick={() => setShowPass(!showPass)}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 text-[#71717A] hover:text-white"
            >
              {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>
        <div className="flex gap-3 pt-2">
          <Btn type="submit" size="lg">
            Сохранить изменения
          </Btn>
          <Btn type="button" variant="outline" size="lg" onClick={() => router.push("/profile")}>
            Отмена
          </Btn>
        </div>
      </form>
    </div>
  );
}
