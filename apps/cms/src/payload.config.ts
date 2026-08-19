import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'
import { s3Storage } from '@payloadcms/storage-s3'
import { Users } from './collections/users/config'
import { Media } from './collections/media/config'
import { s3StorageOptions } from './lib/storage/s3'
import { Genres } from './collections/genres/config'
import { Content } from './collections/content/config'
import { Episodes } from './collections/episodes/config'
import { Favorites } from './collections/favorites/config'
import { Seasons } from './collections/seasons/config'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Media, Genres, Content, Episodes, Favorites, Seasons],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || '',
    },
  }),
  sharp,

  plugins: [s3Storage(s3StorageOptions)],
})
