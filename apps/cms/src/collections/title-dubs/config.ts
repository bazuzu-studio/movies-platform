import { admin } from '@/access/admin'
import { editor } from '@/access/editor'
import type { CollectionConfig } from 'payload'
import { revalidateAfterChange, revalidateAfterDelete } from '@/hooks/revalidate'

/**
 * Озвучки тайтла: по одной строке на пару «тайтл ↔ озвучка» со сводкой по ней —
 * сколько серий озвучено и какая последняя.
 *
 * Зачем отдельно от `episode-sources` (ссылка на плеер по каждой серии):
 *   - сайт показывает выбор озвучки со счётчиком («SHIZA 5 из 12») одним запросом,
 *     не считая episode-sources;
 *   - пайплайн по `kodikUpdatedAt` / `lastEpisode` / `episodesCount` понимает, что у
 *     озвучки ничего не изменилось, и не разбирает её серии заново (sync-dubs).
 *
 * Заполняет kodik-pipeline (`python pipeline.py sync-dubs`); руками не редактируется.
 * Внешние ключи в миграции — ON DELETE CASCADE, как у episode-sources.
 */
export const TitleDubs: CollectionConfig = {
  slug: 'title-dubs',
  // Имена в GraphQL задаём явно: из slug с дефисом имя типа получилось бы невалидным.
  graphQL: { singularName: 'TitleDub', pluralName: 'TitleDubs' },
  labels: { singular: 'Озвучка тайтла', plural: 'Озвучки тайтлов' },
  admin: {
    group: 'Каталог',
    useAsTitle: 'kodikId',
    defaultColumns: ['content', 'voiceover', 'episodesCount', 'lastEpisode', 'kodikUpdatedAt'],
  },
  access: {
    read: () => true,
    create: editor,
    update: editor,
    delete: admin,
  },
  hooks: {
    afterChange: [revalidateAfterChange],
    afterDelete: [revalidateAfterDelete],
  },
  // Одна озвучка — одна сводка на тайтл (нужен пайплайну для INSERT … ON CONFLICT).
  indexes: [{ fields: ['content', 'voiceover'], unique: true }],
  fields: [
    {
      name: 'content',
      type: 'relationship',
      relationTo: 'content',
      label: 'Тайтл',
      required: true,
      index: true,
    },
    {
      name: 'voiceover',
      type: 'relationship',
      relationTo: 'voiceovers',
      label: 'Озвучка',
      required: true,
      index: true,
    },
    {
      name: 'kodikId',
      type: 'text',
      label: 'ID записи в Kodik',
      required: true,
      admin: { description: 'Запись Kodik этой озвучки; по нему можно запросить её отдельно.' },
    },
    {
      name: 'episodesCount',
      type: 'number',
      label: 'Серий озвучено',
    },
    {
      name: 'lastEpisode',
      type: 'number',
      label: 'Последняя серия',
    },
    {
      name: 'kodikUpdatedAt',
      type: 'date',
      label: 'Обновлено в Kodik',
      admin: { date: { pickerAppearance: 'dayAndTime' } },
    },
  ],
}
