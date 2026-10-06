import { withPayload } from '@payloadcms/next/withPayload'
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
output: 'standalone',

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
{
key: 'X-Content-Type-Options',
value: 'nosniff',
},
{
key: 'X-Frame-Options',
value: 'SAMEORIGIN',
},
{
key: 'Referrer-Policy',
value: 'strict-origin-when-cross-origin',
},
],
},
],

webpack: (webpackConfig, { isServer }) => {
webpackConfig.resolve.extensionAlias = {
'.cjs': ['.cts', '.cjs'],
'.js': ['.ts', '.tsx', '.js', '.jsx'],
'.mjs': ['.mts', '.mjs'],
}


// Keep AWS SDK packages external in the server bundle.
if (isServer) {
  if (!webpackConfig.externals) {
    webpackConfig.externals = []
  }

  if (Array.isArray(webpackConfig.externals)) {
    webpackConfig.externals.push(
      '@aws-sdk/client-s3',
      '@aws-sdk/s3-request-presigner',
    )
  } else if (typeof webpackConfig.externals === 'object') {
    webpackConfig.externals['@aws-sdk/client-s3'] =
      '@aws-sdk/client-s3'

    webpackConfig.externals['@aws-sdk/s3-request-presigner'] =
      '@aws-sdk/s3-request-presigner'
  }
}

return webpackConfig


},
}

export default withPayload(nextConfig, {
devBundleServerPackages: false,
})
