import { admin } from '@/access/admin'
import { editor } from '@/access/editor'
import type { CollectionConfig } from 'payload'
import { revalidateAfterChange, revalidateAfterDelete } from '@/hooks/revalidate'

/**
 * Источники серий: ссылка на плеер для каждой пары «серия ↔ озвучка».
 *
 * Серия (`episodes`) остаётся одной на номер и хранит ссылку основной озвучки в
 * `playerLink`; остальные озвучки лежат здесь — по одной строке на (серия, озвучка).
 * Таблицу заполняет kodik-pipeline: `python pipeline.py sync-dubs`.
 *
 * Внешние ключи в миграции — ON DELETE CASCADE (а не set null, как по умолчанию
 * у Payload для обязательных связей): иначе удаление серии/озвучки (в том числе
 * `fix-seasons` пайплайна, удаляющий дубли сезонов) упиралось бы в NOT NULL.
 */
export const EpisodeSources: CollectionConfig = {
  slug: 'episode-sources',
  // Имена в GraphQL задаём явно: по умолчанию они строятся из labels, а кириллица
  // в имени типа делает схему невалидной (имена GraphQL — только [_A-Za-z0-9]).
  graphQL: { singularName: 'EpisodeSource', pluralName: 'EpisodeSources' },
  labels: { singular: 'Источник серии', plural: 'Источники серий' },
  admin: {
    group: 'Каталог',
    useAsTitle: 'playerLink',
    defaultColumns: ['episode', 'voiceover', 'playerLink'],
  },
  access: {
    // Как у episodes: ссылки на плеер читаются публично (сайт запрашивает их без входа).
    read: () => true,
    create: editor,
    update: editor,
    delete: admin,
  },
  hooks: {
    afterChange: [revalidateAfterChange],
    afterDelete: [revalidateAfterDelete],
  },
  // Одна озвучка — одна ссылка на серию.
  indexes: [{ fields: ['episode', 'voiceover'], unique: true }],
  fields: [
    {
      name: 'episode',
      type: 'relationship',
      relationTo: 'episodes',
      label: 'Серия',
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
      name: 'playerLink',
      type: 'text',
      label: 'Ссылка на плеер',
      required: true,
    },
  ],
}
