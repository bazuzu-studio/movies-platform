import { GraphQLClient, gql } from "graphql-request";
import { GetContentDocument } from "@/generated/graphql";
import { mapContentToItem, type RawContent } from "./content-mapper";
import type { ContentItem, Genre } from "./types";

const endpoint = process.env.NEXT_PUBLIC_GRAPHQL_API_URL ?? "http://localhost:4000/api/graphql";

/**
 * Отдельный клиент для server-side запросов публичного контента.
 * credentials здесь не нужны — все запросы ниже не требуют авторизации,
 * в отличие от избранного/профиля, которые идут через gqlClient
 * из lib/graphql-client.ts (с credentials: 'include' для браузера).
 */
const serverClient = new GraphQLClient(endpoint);

export async function getContentList(): Promise<ContentItem[]> {
  const data = await serverClient.request(GetContentDocument);
  return data.Contents.docs as ContentItem[];
}

const GET_CONTENT_BY_SLUG = gql`
  query GetContentBySlug($slug: String!) {
    Contents(where: { slug: { equals: $slug } }, limit: 1) {
      docs {
        id
        type
        titleEn
        titleRu
        originalTitle
        slug
        description
        releaseYear
        duration
        rating
        status
        poster {
          url
        }
        backdrop {
          url
        }
        genres {
          id
          title
          slug
        }
        seasons(sort: "seasonNumber") {
          docs {
            id
            seasonNumber
            title
            releaseYear
            episodes(sort: "episodeNumber") {
              docs {
                episodeNumber
                title
                description
                releaseDate
                duration
              }
            }
          }
        }
      }
    }
  }
`;

export async function getContentBySlug(slug: string): Promise<ContentItem | undefined> {
  const data = await serverClient.request<{ Contents: { docs: RawContent[] } }>(GET_CONTENT_BY_SLUG, { slug });
  const raw = data.Contents.docs[0];
  return raw ? mapContentToItem(raw) : undefined;
}

const GET_GENRES = gql`
  query GetGenres {
    Genres(limit: 100, sort: "title") {
      docs {
        title
        slug
      }
    }
  }
`;

export async function getGenres(): Promise<Genre[]> {
  const data = await serverClient.request<{ Genres: { docs: Genre[] } }>(GET_GENRES);
  return data.Genres.docs;
}

const GET_SIMILAR_CONTENT = gql`
  query GetSimilarContent($genreIds: [JSON!], $excludeId: Int!, $limit: Int!) {
    Contents(
      where: { genres: { in: $genreIds }, id: { not_equals: $excludeId }, status: { equals: published } }
      limit: $limit
      sort: "-rating"
    ) {
      docs {
        id
        type
        titleEn
        titleRu
        slug
        releaseYear
        rating
        poster {
          url
        }
        genres {
          id
          title
          slug
        }
      }
    }
  }
`;

export async function getSimilarContent(item: ContentItem, limit = 5): Promise<ContentItem[]> {
  if (!item.genreIds?.length) return [];

  const data = await serverClient.request<{ Contents: { docs: RawContent[] } }>(GET_SIMILAR_CONTENT, {
    genreIds: item.genreIds,
    excludeId: item.id,
    limit,
  });

  return data.Contents.docs.map(mapContentToItem);
}

export { endpoint };