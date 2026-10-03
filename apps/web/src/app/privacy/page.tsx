import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Политика конфиденциальности",
  description: "Какие данные хранит otakuum и зачем.",
};

export default function Page() {
  return (
    <div className="mx-auto max-w-3xl px-4 pb-16 pt-24 sm:px-6">
      <h1 className="mb-6 text-3xl font-black tracking-tight text-white">Политика конфиденциальности</h1>
      <div className="space-y-4 text-sm leading-relaxed text-[#A1A1AA]">
        <p>Последнее обновление: 28 сентября 2026 г.</p>
        <h2 className="pt-2 text-lg font-bold text-white">Какие данные мы храним</h2>
        <p>
          При регистрации — имя, адрес электронной почты и пароль (в виде хеша). В вашем браузере
          (localStorage) сохраняются подтверждение возраста, отметки просмотренных серий, список
          «Продолжить просмотр» и настройка автоперехода. Эти данные остаются на вашем устройстве.
        </p>
        <h2 className="pt-2 text-lg font-bold text-white">Cookie</h2>
        <p>
          Для входа в аккаунт используется cookie авторизации. Она нужна для работы сайта и не
          используется для рекламы.
        </p>
        <h2 className="pt-2 text-lg font-bold text-white">Сторонние плееры</h2>
        <p>
          Видео воспроизводится во встроенных плеерах сторонних сервисов; они могут получать данные
          о вашем устройстве по собственным правилам.
        </p>
        <h2 className="pt-2 text-lg font-bold text-white">Обратная связь и удаление данных</h2>
        <p>
          Чтобы получить или удалить свои данные, напишите нам через страницу{" "}
          <a href="/contact" className="text-[#FF7A7D] underline">контактов</a>.
        </p>
      </div>
    </div>
  );
}
