import type { CollectionConfig } from 'payload'

import { editor } from '@/access/editor'
import { admin } from '@/access/admin'
import { anyone } from '@/access/anyone'

/**
 * Единая коллекция для фильмов и сериалов.
 * Поле `type` различает movie / series; поля, нерелевантные для конкретного
 * типа (duration — для сериала, seasons — для фильма), скрыты в admin UI
 * через `admin.condition` и не обязательны.
 */
export const Content: CollectionConfig = {
  slug: 'content',
  admin: {
    useAsTitle: 'titleEn',
    defaultColumns: ['titleEn', 'titleRu', 'type', 'releaseYear', 'status'],
  },
  access: {
    read: anyone,
    create: editor,
    update: editor,
    delete: admin,
  },
  versions: {
    drafts: true,
  },
  fields: [
    {
      name: 'type',
      type: 'select',
      required: true,
      options: [
        { label: 'Фильм', value: 'movie' },
        { label: 'Сериал', value: 'series' },
      ],
      admin: {
        description: 'Определяет, какие поля/связи актуальны для записи',
      },
    },
    {
      name: 'titleEn',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        description: 'Название на английском языке — основной идентификатор, источник slug',
      },
    },
    {
      name: 'titleRu',
      type: 'text',
      required: true,
      index: true,
      admin: {
        description: 'Название на русском языке — отображается в интерфейсе по умолчанию',
      },
    },
    {
      name: 'originalTitle',
      type: 'text',
      admin: {
        description: 'Оригинальное название, если отличается от titleEn',
      },
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        position: 'sidebar',
        description: 'Генерируется автоматически из titleEn, если оставить пустым',
      },
      hooks: {
        beforeValidate: [
          ({ value, data }) => {
            if (value) return value
            return data?.titleEn
              ?.toLowerCase()
              .trim()
              .replace(/[^a-z0-9]+/g, '-')
              .replace(/(^-|-$)/g, '')
          },
        ],
      },
    },
    {
      name: 'description',
      type: 'richText',
    },
    {
      name: 'releaseYear',
      type: 'number',
      required: true,
      admin: {
        description: 'Год выпуска (movie) или год начала выхода (series)',
      },
    },
    {
      name: 'duration',
      type: 'number',
      admin: {
        description: 'Длительность в минутах (только для фильмов)',
        condition: (data) => data?.type === 'movie',
      },
    },
    {
      name: 'genres',
      type: 'relationship',
      relationTo: 'genres',
      hasMany: true,
    },
    {
      name: 'rating',
      type: 'number',
      min: 0,
      max: 10,
    },
    {
      name: 'poster',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Постер (вертикальный)',
      },
    },
    {
      name: 'backdrop',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Фоновое изображение',
      },
    },
    {
      name: 'seasons',
      type: 'join',
      collection: 'seasons',
      on: 'content',
      admin: {
        description: 'Связанные сезоны (обратная связь, только для сериалов)',
        condition: (data) => data?.type === 'series',
      },
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'draft',
      options: [
        { label: 'Черновик', value: 'draft' },
        { label: 'Опубликовано', value: 'published' },
      ],
    },
  ],
}
