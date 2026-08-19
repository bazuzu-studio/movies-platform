import type { S3StorageOptions } from '@payloadcms/storage-s3'

const requireEnv = (name: string): string => {
  const value = process.env[name]?.trim()

  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`)
  }

  return value
}

const publicUrl = requireEnv('S3_PUBLIC_URL').replace(/\/+$/, '')

const getObjectKey = (filename: string, prefix?: string | null): string => {
  return [prefix, filename].filter((value): value is string => Boolean(value)).join('/')
}

export const s3StorageOptions: S3StorageOptions = {
  enabled: true,

  bucket: requireEnv('S3_BUCKET'),

  collections: {
    media: {
      disablePayloadAccessControl: true,

      generateFileURL: ({ filename, prefix }) => {
        const key = getObjectKey(filename, prefix)

        return `${publicUrl}/${key.split('/').map(encodeURIComponent).join('/')}`
      },
    },
  },

  config: {
    endpoint: requireEnv('S3_ENDPOINT'),

    region: process.env.S3_REGION?.trim() || 'us-east-1',

    forcePathStyle: true,

    credentials: {
      accessKeyId: requireEnv('S3_ACCESS_KEY_ID'),
      secretAccessKey: requireEnv('S3_SECRET_ACCESS_KEY'),
    },
  },
}
