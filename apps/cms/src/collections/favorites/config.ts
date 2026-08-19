import { checkRole } from '@/access/checkRole'
import type { CollectionConfig } from 'payload'

/**
 * Избранное вынесено в отдельную коллекцию (не поле-массив в Users):
 * хранится на backend, доступно с любого устройства после входа,
 * доступ к записям ограничен владельцем (или админом).
 */
export const Favorites: CollectionConfig = {
  slug: 'favorites',
  admin: {
    useAsTitle: 'id',
    defaultColumns: ['user', 'content', 'createdAt'],
  },
  access: {
    read: ({ req: { user } }) => {
      if (!user) return false
      if (checkRole(['admin'], user)) return true
      return { user: { equals: user.id } }
    },
    create: ({ req: { user } }) => Boolean(user),
    update: () => false,
    delete: ({ req: { user } }) => {
      if (!user) return false
      if (checkRole(['admin'], user)) return true
      return { user: { equals: user.id } }
    },
  },
  fields: [
    {
      name: 'user',
      type: 'relationship',
      relationTo: 'users',
      required: true,
      index: true,
      admin: {
        description: 'Владелец записи',
      },
    },
    {
      name: 'content',
      type: 'relationship',
      relationTo: 'content',
      required: true,
      admin: {
        description: 'Фильм или сериал; тип определяется через content.type',
      },
    },
  ],
  // createdAt/updatedAt проставляются автоматически Payload (timestamps: true по умолчанию)
}
