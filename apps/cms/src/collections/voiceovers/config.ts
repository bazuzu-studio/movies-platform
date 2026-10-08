import { admin } from '@/access/admin'
import { anyone } from '@/access/anyone'
import { editor } from '@/access/editor'
import type { CollectionConfig } from 'payload'
import { revalidateAfterChange, revalidateAfterDelete } from '@/hooks/revalidate'

/**
 * Озвучки (студии дубляжа): AniLibria, AniDub, SHIZA Project и т. д.
 *
 * Справочник наполняет kodik-pipeline: `sync-voiceovers` (файл voiceovers.json)
 * создаёт записи, `match-voiceovers` находит id озвучки в Kodik. На справочник
 * ссылается коллекция `episode-sources` (ссылка на плеер для пары «серия ↔ озвучка»).
 */
export const Voiceovers: CollectionConfig = {
  slug: 'voiceovers',
  // Имена в GraphQL задаём явно: по умолчанию они строятся из labels, а кириллица
  // в имени типа делает схему невалидной (имена GraphQL — только [_A-Za-z0-9]).
  graphQL: { singularName: 'Voiceover', pluralName: 'Voiceovers' },
  labels: { singular: 'Озвучка', plural: 'Озвучки' },
  admin: {
    group: 'Каталог',
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'kodikTranslationId'],
  },
  access: {
    read: anyone,
    create: editor,
    update: editor,
    delete: admin,
  },
  hooks: {
    afterChange: [revalidateAfterChange],
    afterDelete: [revalidateAfterDelete],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Название',
      required: true,
      unique: true,
    },
    {
      name: 'slug',
      type: 'text',
      label: 'Slug',
      required: true,
      unique: true,
      admin: {
        description: 'Стабильный идентификатор студии, например anilibria, shiza-project',
      },
    },
    {
      name: 'kodikTranslationId',
      type: 'number',
      label: 'ID озвучки в Kodik',
      unique: true,
      admin: {
        description: 'translation.id из Kodik API; по нему пайплайн сопоставляет озвучки (python pipeline.py match-voiceovers).',
      },
    },
  ],
}
