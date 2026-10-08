import type { Field } from 'payload'

/**
 * Поля «следующая серия» для коллекции Content. Заполняются командой пайплайна
 * `python pipeline.py sync-schedule` по расписанию AniList; руками не редактируются.
 *
 * Подключение: в коллекции Content добавить `...scheduleFields` в `fields`,
 * затем `pnpm payload migrate:create next-episode` и `pnpm payload migrate`
 * (миграция создаст колонки content.next_episode_number / next_episode_at и их
 * версионные копии). Пока колонок нет, пайплайн этот шаг пропускает.
 *
 * Время хранится как Unix-секунды (UTC) — в том же формате, что Episodes.airingAt,
 * и это время ЭФИРА в Японии, а не время появления серии на сайте.
 */
export const scheduleFields: Field[] = [
  {
    name: 'nextEpisodeNumber',
    type: 'number',
    label: 'Следующая серия (номер)',
    admin: { position: 'sidebar', readOnly: true },
  },
  {
    name: 'nextEpisodeAt',
    type: 'number',
    label: 'Следующая серия (эфир, Unix-секунды UTC)',
    admin: {
      position: 'sidebar',
      readOnly: true,
      description: 'Заполняется пайплайном (sync-schedule) по расписанию AniList.',
    },
  },
]
