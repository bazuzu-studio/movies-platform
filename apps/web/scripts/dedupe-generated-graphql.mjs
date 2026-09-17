import { readFileSync, writeFileSync } from 'node:fs'

const FILE = './src/generated/graphql.ts'

const lines = readFileSync(FILE, 'utf8').split('\n')
const seen = new Set()
const result = []
let removed = 0
let i = 0

while (i < lines.length) {
  const line = lines[i]
  const match = line.match(/^export type (\w+) =/)

  if (!match) {
    result.push(line)
    i++
    continue
  }

  // Собираем объявление целиком, пока баланс скобок не вернётся в 0
  // и строка не закончится точкой с запятой.
  const name = match[1]
  let depth = 0
  const declLines = []

  while (i < lines.length) {
    const l = lines[i]
    declLines.push(l)
    for (const ch of l) {
      if (ch === '{' || ch === '[' || ch === '(') depth++
      if (ch === '}' || ch === ']' || ch === ')') depth--
    }
    i++
    if (depth <= 0 && /;\s*$/.test(l)) break
  }

  if (seen.has(name)) {
    removed++
  } else {
    seen.add(name)
    result.push(...declLines)
  }
}

writeFileSync(FILE, result.join('\n'))
console.log(`dedupe: removed ${removed} duplicate type declaration(s)`)
