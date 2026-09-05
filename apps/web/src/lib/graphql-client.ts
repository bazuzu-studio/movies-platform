// lib/graphql-client.ts
import { GraphQLClient } from 'graphql-request'

const endpoint = process.env.NEXT_PUBLIC_GRAPHQL_API_URL ?? 'http://localhost:4000/api/graphql'

/**
 * credentials: 'include' — обязательно для авторизации через Payload CMS:
 * httpOnly cookie с JWT ставится сервером в ответ на loginUser/createUser
 * и должна отправляться браузером на каждый следующий запрос (в том числе meUser).
 */
export const gqlClient = new GraphQLClient(endpoint, {
  credentials: 'include',
})