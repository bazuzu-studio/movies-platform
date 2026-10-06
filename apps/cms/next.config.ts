import { withPayload } from '@payloadcms/next/withPayload'
import type { NextConfig } from 'next'
import path from 'path'

const nextConfig: NextConfig = {
  output: 'standalone',

  turbopack: {
    root: path.resolve(__dirname, '../../'),
  },

  serverExternalPackages: [
    '@aws-sdk/client-s3',
    '@aws-sdk/s3-request-presigner',
  ],

  images: {
    localPatterns: [
      {
        pathname: '/api/media/file/**',
      },
    ],
  },

  headers: async () => [
    {
      source: '/:path*',
      headers: [
        { key: 'X-Content-Type-Options', value: 'nosniff' },
        { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
        { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
      ],
    },
  ],

  webpack: (webpackConfig, { isServer }) => {
    webpackConfig.resolve.extensionAlias = {
      '.cjs': ['.cts', '.cjs'],
      '.js': ['.ts', '.tsx', '.js', '.jsx'],
      '.mjs': ['.mts', '.mjs'],
    }

    // Принудительно делаем AWS SDK external для серверной сборки
    if (isServer) {
      if (!webpackConfig.externals) {
        webpackConfig.externals = []
      }
      if (Array.isArray(webpackConfig.externals)) {
        webpackConfig.externals.push('@aws-sdk/client-s3')
        webpackConfig.externals.push('@aws-sdk/s3-request-presigner')
      } else if (typeof webpackConfig.externals === 'object') {
        webpackConfig.externals['@aws-sdk/client-s3'] = '@aws-sdk/client-s3'
        webpackConfig.externals['@aws-sdk/s3-request-presigner'] = '@aws-sdk/s3-request-presigner'
      }
    }

    return webpackConfig
  },
}

export default withPayload(nextConfig, { devBundleServerPackages: false })
