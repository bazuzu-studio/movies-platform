import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  schema: 'http://localhost:4000/api/graphql',
  documents: ['src/**/*.graphql'],
  generates: {
    './src/generated/graphql.ts': {
      plugins: [
        'typescript',
        'typescript-operations',
        'typed-document-node',
      ],
    },
  },
}

export default config