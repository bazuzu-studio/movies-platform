import { admin } from '@/access/admin'
import { editor } from '@/access/editor'
import type { CollectionConfig } from 'payload'
import { revalidateAfterChange, revalidateAfterDelete } from '@/hooks/revalidate'

export const Episodes: CollectionConfig = {
  slug: 'episodes',
  admin: {
    group: 'Каталог',
    useAsTitle: 'title',
    defaultColumns: ['season', 'episodeNumber', 'title', 'airingAt', 'firstAvailableAt', 'sourcesCount'],
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
  fields: [
    {
      name: 'season',
      type: 'relationship',
      relationTo: 'seasons',
      required: true,
      admin: {
        description: 'Родительский сезон',
      },
    },
    {
      name: 'episodeNumber',
      type: 'number',
      required: true,
    },
    {
      name: 'title',
      type: 'text',
      required: true,
      defaultValue: "Эпизод"
    },
    {
      name:"playerLink",
      type: 'text',
    },
    {
      name: 'description',
      type: 'richText',
    },
    {
      name: 'duration',
      type: 'number',
      admin: {
        description: 'Длительность в минутах',
      },
    },
    {
      name: 'airingAt',
      type: 'number',
      label: 'Время эфира (Unix)',
      admin: {
        description: 'Время выхода эпизода (Unix-время, секунды). Фронтенд показывает его как дату выхода серии',
      },
    },
    {
      // Когда серия впервые появилась на сайте (хотя бы у одной озвучки), в отличие от
      // airingAt — это не время эфира в Японии. Заполняет kodik-pipeline; у серий,
      // загруженных до появления поля, пусто (реальное время неизвестно).
      name: 'firstAvailableAt',
      type: 'date',
      label: 'Появилась на сайте',
      index: true,
      admin: {
        readOnly: true,
        position: 'sidebar',
        description: 'Когда пайплайн впервые увидел серию. Заполняется автоматически (sync-dubs / update-ongoing).',
        date: { pickerAppearance: 'dayAndTime' },
      },
    },
    {
      name: 'sourcesCount',
      type: 'number',
      label: 'Озвучек у серии',
      admin: {
        readOnly: true,
        position: 'sidebar',
        description: 'Сколько озвучек (episode-sources) есть у этой серии. Заполняет пайплайн.',
      },
    },

  ],
}
