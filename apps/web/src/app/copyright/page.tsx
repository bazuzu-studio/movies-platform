import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Правообладателям",
  description: "Как правообладателям связаться с otakuum.",
};

export default function Page() {
  return (
    <div className="mx-auto max-w-3xl px-4 pb-16 pt-24 sm:px-6">
      <h1 className="mb-6 text-3xl font-black tracking-tight text-white">Правообладателям</h1>
      <div className="space-y-4 text-sm leading-relaxed text-[#A1A1AA]">
        <p>
          otakuum является каталогом и не хранит видеофайлы на своих серверах: видео воспроизводится
          во встроенных плеерах сторонних сервисов.
        </p>
        <p>
          Если вы правообладатель и считаете, что материал нарушает ваши права, отправьте обращение
          через страницу <a href="/contact" className="text-[#FF7A7D] underline">контактов</a>:
          укажите ссылку на страницу, подтверждение ваших прав и контактные данные. Мы рассмотрим
          обращение и при необходимости уберём материал из каталога.
        </p>
      </div>
    </div>
  );
}
