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
      config: {
        // Payload/graphql-compose иногда выпускают одно и то же имя типа
        // (например, Content__Status_Input) дважды в сгенерированной схеме.
        // enumsAsTypes переводит все enum'ы в union-типы (`type X = 'a' | 'b'`)
        // вместо TS `enum` — убирает коллизию enum/type. Но если оба объявления
        // одного вида (оба type), TypeScript всё равно выдаёт "Duplicate
        // identifier". Хук afterAllFileWrite запускает dedupe-скрипт, который
        // вычищает точные дубликаты `export type` после генерации.
        enumsAsTypes: true,
      },
    },
  },
  hooks: {
    afterAllFileWrite: ['node scripts/dedupe-generated-graphql.mjs'],
  },
}

export default config
