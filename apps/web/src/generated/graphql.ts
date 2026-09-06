/** Internal type. DO NOT USE DIRECTLY. */
type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** Internal type. DO NOT USE DIRECTLY. */
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: unknown; output: unknown; }
  EmailAddress: { input: unknown; output: unknown; }
  JSON: { input: unknown; output: unknown; }
  JSONObject: { input: unknown; output: unknown; }
};

export type Access = {
  __typename?: 'Access';
  canAccessAdmin: Scalars['Boolean']['output'];
  content?: Maybe<ContentAccess>;
  episodes?: Maybe<EpisodesAccess>;
  favorites?: Maybe<FavoritesAccess>;
  genres?: Maybe<GenresAccess>;
  media?: Maybe<MediaAccess>;
  payload_kv?: Maybe<Payload_KvAccess>;
  payload_locked_documents?: Maybe<Payload_Locked_DocumentsAccess>;
  payload_preferences?: Maybe<Payload_PreferencesAccess>;
  search_results?: Maybe<Search_ResultsAccess>;
  seasons?: Maybe<SeasonsAccess>;
  users?: Maybe<UsersAccess>;
};

export type Content = {
  __typename?: 'Content';
  _status?: Maybe<Content__Status>;
  backdrop?: Maybe<Media>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  description?: Maybe<Scalars['JSON']['output']>;
  duration?: Maybe<Scalars['Float']['output']>;
  genres?: Maybe<Array<Genre>>;
  id: Scalars['Int']['output'];
  kodikId?: Maybe<Scalars['String']['output']>;
  originalTitle?: Maybe<Scalars['String']['output']>;
  poster?: Maybe<Media>;
  rating?: Maybe<Scalars['Float']['output']>;
  releaseYear?: Maybe<Scalars['Float']['output']>;
  seasons?: Maybe<Content_Seasons>;
  shikimoriId?: Maybe<Scalars['String']['output']>;
  slug?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Content_Status>;
  titleEn?: Maybe<Scalars['String']['output']>;
  titleRu?: Maybe<Scalars['String']['output']>;
  type?: Maybe<Content_Type>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};


export type ContentDescriptionArgs = {
  depth?: InputMaybe<Scalars['Int']['input']>;
};


export type ContentSeasonsArgs = {
  count?: InputMaybe<Scalars['Boolean']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  where?: InputMaybe<Season_Where>;
};

export type ContentCreateAccess = {
  __typename?: 'ContentCreateAccess';
  permission: Scalars['Boolean']['output'];
  where?: Maybe<Scalars['JSONObject']['output']>;
};

export type ContentCreateDocAccess = {
  __typename?: 'ContentCreateDocAccess';
  permission: Scalars['Boolean']['output'];
  where?: Maybe<Scalars['JSONObject']['output']>;
};

export type ContentDeleteAccess = {
  __typename?: 'ContentDeleteAccess';
  permission: Scalars['Boolean']['output'];
  where?: Maybe<Scalars['JSONObject']['output']>;
};

export type ContentDeleteDocAccess = {
  __typename?: 'ContentDeleteDocAccess';
  permission: Scalars['Boolean']['output'];
  where?: Maybe<Scalars['JSONObject']['output']>;
};

export type ContentDocAccessFields = {
  __typename?: 'ContentDocAccessFields';
  _status?: Maybe<ContentDocAccessFields__Status>;
  backdrop?: Maybe<ContentDocAccessFields_Backdrop>;
  createdAt?: Maybe<ContentDocAccessFields_CreatedAt>;
  description?: Maybe<ContentDocAccessFields_Description>;
  duration?: Maybe<ContentDocAccessFields_Duration>;
  genres?: Maybe<ContentDocAccessFields_Genres>;
  kodikId?: Maybe<ContentDocAccessFields_KodikId>;
  originalTitle?: Maybe<ContentDocAccessFields_OriginalTitle>;
  poster?: Maybe<ContentDocAccessFields_Poster>;
  rating?: Maybe<ContentDocAccessFields_Rating>;
  releaseYear?: Maybe<ContentDocAccessFields_ReleaseYear>;
  seasons?: Maybe<ContentDocAccessFields_Seasons>;
  shikimoriId?: Maybe<ContentDocAccessFields_ShikimoriId>;
  slug?: Maybe<ContentDocAccessFields_Slug>;
  status?: Maybe<ContentDocAccessFields_Status>;
  titleEn?: Maybe<ContentDocAccessFields_TitleEn>;
  titleRu?: Maybe<ContentDocAccessFields_TitleRu>;
  type?: Maybe<ContentDocAccessFields_Type>;
  updatedAt?: Maybe<ContentDocAccessFields_UpdatedAt>;
};

export type ContentDocAccessFields__Status = {
  __typename?: 'ContentDocAccessFields__status';
  create?: Maybe<ContentDocAccessFields__Status_Create>;
  delete?: Maybe<ContentDocAccessFields__Status_Delete>;
  read?: Maybe<ContentDocAccessFields__Status_Read>;
  update?: Maybe<ContentDocAccessFields__Status_Update>;
};

export type ContentDocAccessFields__Status_Create = {
  __typename?: 'ContentDocAccessFields__status_Create';
  permission: Scalars['Boolean']['output'];
};

export type ContentDocAccessFields__Status_Delete = {
  __typename?: 'ContentDocAccessFields__status_Delete';
  permission: Scalars['Boolean']['output'];
};

export type ContentDocAccessFields__Status_Read = {
  __typename?: 'ContentDocAccessFields__status_Read';
  permission: Scalars['Boolean']['output'];
};

export type ContentDocAccessFields__Status_Update = {
  __typename?: 'ContentDocAccessFields__status_Update';
  permission: Scalars['Boolean']['output'];
};

export type ContentDocAccessFields_Backdrop = {
  __typename?: 'ContentDocAccessFields_backdrop';
  create?: Maybe<ContentDocAccessFields_Backdrop_Create>;
  delete?: Maybe<ContentDocAccessFields_Backdrop_Delete>;
  read?: Maybe<ContentDocAccessFields_Backdrop_Read>;
  update?: Maybe<ContentDocAccessFields_Backdrop_Update>;
};

export type ContentDocAccessFields_Backdrop_Create = {
  __typename?: 'ContentDocAccessFields_backdrop_Create';
  permission: Scalars['Boolean']['output'];
};

export type ContentDocAccessFields_Backdrop_Delete = {
  __typename?: 'ContentDocAccessFields_backdrop_Delete';
  permission: Scalars['Boolean']['output'];
};

export type ContentDocAccessFields_Backdrop_Read = {
  __typename?: 'ContentDocAccessFields_backdrop_Read';
  permission: Scalars['Boolean']['output'];
};

export type ContentDocAccessFields_Backdrop_Update = {
  __typename?: 'ContentDocAccessFields_backdrop_Update';
  permission: Scalars['Boolean']['output'];
};

export type ContentDocAccessFields_CreatedAt = {
  __typename?: 'ContentDocAccessFields_createdAt';
  create?: Maybe<ContentDocAccessFields_CreatedAt_Create>;
  delete?: Maybe<ContentDocAccessFields_CreatedAt_Delete>;
  read?: Maybe<ContentDocAccessFields_CreatedAt_Read>;
  update?: Maybe<ContentDocAccessFields_CreatedAt_Update>;
};

export type ContentDocAccessFields_CreatedAt_Create = {
  __typename?: 'ContentDocAccessFields_createdAt_Create';
  permission: Scalars['Boolean']['output'];
};

export type ContentDocAccessFields_CreatedAt_Delete = {
  __typename?: 'ContentDocAccessFields_createdAt_Delete';
  permission: Scalars['Boolean']['output'];
};

export type ContentDocAccessFields_CreatedAt_Read = {
  __typename?: 'ContentDocAccessFields_createdAt_Read';
  permission: Scalars['Boolean']['output'];
};

export type ContentDocAccessFields_CreatedAt_Update = {
  __typename?: 'ContentDocAccessFields_createdAt_Update';
  permission: Scalars['Boolean']['output'];
};

export type ContentDocAccessFields_Description = {
  __typename?: 'ContentDocAccessFields_description';
  create?: Maybe<ContentDocAccessFields_Description_Create>;
  delete?: Maybe<ContentDocAccessFields_Description_Delete>;
  read?: Maybe<ContentDocAccessFields_Description_Read>;
  update?: Maybe<ContentDocAccessFields_Description_Update>;
};

export type ContentDocAccessFields_Description_Create = {
  __typename?: 'ContentDocAccessFields_description_Create';
  permission: Scalars['Boolean']['output'];
};

export type ContentDocAccessFields_Description_Delete = {
  __typename?: 'ContentDocAccessFields_description_Delete';
  permission: Scalars['Boolean']['output'];
};

export type ContentDocAccessFields_Description_Read = {
  __typename?: 'ContentDocAccessFields_description_Read';
  permission: Scalars['Boolean']['output'];
};

export type ContentDocAccessFields_Description_Update = {
  __typename?: 'ContentDocAccessFields_description_Update';
  permission: Scalars['Boolean']['output'];
};

export type ContentDocAccessFields_Duration = {
  __typename?: 'ContentDocAccessFields_duration';
  create?: Maybe<ContentDocAccessFields_Duration_Create>;
  delete?: Maybe<ContentDocAccessFields_Duration_Delete>;
  read?: Maybe<ContentDocAccessFields_Duration_Read>;
  update?: Maybe<ContentDocAccessFields_Duration_Update>;
};

export type ContentDocAccessFields_Duration_Create = {
  __typename?: 'ContentDocAccessFields_duration_Create';
  permission: Scalars['Boolean']['output'];
};

export type ContentDocAccessFields_Duration_Delete = {
  __typename?: 'ContentDocAccessFields_duration_Delete';
  permission: Scalars['Boolean']['output'];
};

export type ContentDocAccessFields_Duration_Read = {
  __typename?: 'ContentDocAccessFields_duration_Read';
  permission: Scalars['Boolean']['output'];
};

export type ContentDocAccessFields_Duration_Update = {
  __typename?: 'ContentDocAccessFields_duration_Update';
  permission: Scalars['Boolean']['output'];
};

export type ContentDocAccessFields_Genres = {
  __typename?: 'ContentDocAccessFields_genres';
  create?: Maybe<ContentDocAccessFields_Genres_Create>;
  delete?: Maybe<ContentDocAccessFields_Genres_Delete>;
  read?: Maybe<ContentDocAccessFields_Genres_Read>;
  update?: Maybe<ContentDocAccessFields_Genres_Update>;
};

export type ContentDocAccessFields_Genres_Create = {
  __typename?: 'ContentDocAccessFields_genres_Create';
  permission: Scalars['Boolean']['output'];
};

export type ContentDocAccessFields_Genres_Delete = {
  __typename?: 'ContentDocAccessFields_genres_Delete';
  permission: Scalars['Boolean']['output'];
};

export type ContentDocAccessFields_Genres_Read = {
  __typename?: 'ContentDocAccessFields_genres_Read';
  permission: Scalars['Boolean']['output'];
};

export type ContentDocAccessFields_Genres_Update = {
  __typename?: 'ContentDocAccessFields_genres_Update';
  permission: Scalars['Boolean']['output'];
};

export type ContentDocAccessFields_KodikId = {
  __typename?: 'ContentDocAccessFields_kodikId';
  create?: Maybe<ContentDocAccessFields_KodikId_Create>;
  delete?: Maybe<ContentDocAccessFields_KodikId_Delete>;
  read?: Maybe<ContentDocAccessFields_KodikId_Read>;
  update?: Maybe<ContentDocAccessFields_KodikId_Update>;
};

export type ContentDocAccessFields_KodikId_Create = {
  __typename?: 'ContentDocAccessFields_kodikId_Create';
  permission: Scalars['Boolean']['output'];
};

export type ContentDocAccessFields_KodikId_Delete = {
  __typename?: 'ContentDocAccessFields_kodikId_Delete';
  permission: Scalars['Boolean']['output'];
};

export type ContentDocAccessFields_KodikId_Read = {
  __typename?: 'ContentDocAccessFields_kodikId_Read';
  permission: Scalars['Boolean']['output'];
};

export type ContentDocAccessFields_KodikId_Update = {
  __typename?: 'ContentDocAccessFields_kodikId_Update';
  permission: Scalars['Boolean']['output'];
};

export type ContentDocAccessFields_OriginalTitle = {
  __typename?: 'ContentDocAccessFields_originalTitle';
  create?: Maybe<ContentDocAccessFields_OriginalTitle_Create>;
  delete?: Maybe<ContentDocAccessFields_OriginalTitle_Delete>;
  read?: Maybe<ContentDocAccessFields_OriginalTitle_Read>;
  update?: Maybe<ContentDocAccessFields_OriginalTitle_Update>;
};

export type ContentDocAccessFields_OriginalTitle_Create = {
  __typename?: 'ContentDocAccessFields_originalTitle_Create';
  permission: Scalars['Boolean']['output'];
};

export type ContentDocAccessFields_OriginalTitle_Delete = {
  __typename?: 'ContentDocAccessFields_originalTitle_Delete';
  permission: Scalars['Boolean']['output'];
};

export type ContentDocAccessFields_OriginalTitle_Read = {
  __typename?: 'ContentDocAccessFields_originalTitle_Read';
  permission: Scalars['Boolean']['output'];
};

export type ContentDocAccessFields_OriginalTitle_Update = {
  __typename?: 'ContentDocAccessFields_originalTitle_Update';
  permission: Scalars['Boolean']['output'];
};

export type ContentDocAccessFields_Poster = {
  __typename?: 'ContentDocAccessFields_poster';
  create?: Maybe<ContentDocAccessFields_Poster_Create>;
  delete?: Maybe<ContentDocAccessFields_Poster_Delete>;
  read?: Maybe<ContentDocAccessFields_Poster_Read>;
  update?: Maybe<ContentDocAccessFields_Poster_Update>;
};

export type ContentDocAccessFields_Poster_Create = {
  __typename?: 'ContentDocAccessFields_poster_Create';
  permission: Scalars['Boolean']['output'];
};

export type ContentDocAccessFields_Poster_Delete = {
  __typename?: 'ContentDocAccessFields_poster_Delete';
  permission: Scalars['Boolean']['output'];
};

export type ContentDocAccessFields_Poster_Read = {
  __typename?: 'ContentDocAccessFields_poster_Read';
  permission: Scalars['Boolean']['output'];
};

export type ContentDocAccessFields_Poster_Update = {
  __typename?: 'ContentDocAccessFields_poster_Update';
  permission: Scalars['Boolean']['output'];
};

export type ContentDocAccessFields_Rating = {
  __typename?: 'ContentDocAccessFields_rating';
  create?: Maybe<ContentDocAccessFields_Rating_Create>;
  delete?: Maybe<ContentDocAccessFields_Rating_Delete>;
  read?: Maybe<ContentDocAccessFields_Rating_Read>;
  update?: Maybe<ContentDocAccessFields_Rating_Update>;
};

export type ContentDocAccessFields_Rating_Create = {
  __typename?: 'ContentDocAccessFields_rating_Create';
  permission: Scalars['Boolean']['output'];
};

export type ContentDocAccessFields_Rating_Delete = {
  __typename?: 'ContentDocAccessFields_rating_Delete';
  permission: Scalars['Boolean']['output'];
};

export type ContentDocAccessFields_Rating_Read = {
  __typename?: 'ContentDocAccessFields_rating_Read';
  permission: Scalars['Boolean']['output'];
};

export type ContentDocAccessFields_Rating_Update = {
  __typename?: 'ContentDocAccessFields_rating_Update';
  permission: Scalars['Boolean']['output'];
};

export type ContentDocAccessFields_ReleaseYear = {
  __typename?: 'ContentDocAccessFields_releaseYear';
  create?: Maybe<ContentDocAccessFields_ReleaseYear_Create>;
  delete?: Maybe<ContentDocAccessFields_ReleaseYear_Delete>;
  read?: Maybe<ContentDocAccessFields_ReleaseYear_Read>;
  update?: Maybe<ContentDocAccessFields_ReleaseYear_Update>;
};

export type ContentDocAccessFields_ReleaseYear_Create = {
  __typename?: 'ContentDocAccessFields_releaseYear_Create';
  permission: Scalars['Boolean']['output'];
};

export type ContentDocAccessFields_ReleaseYear_Delete = {
  __typename?: 'ContentDocAccessFields_releaseYear_Delete';
  permission: Scalars['Boolean']['output'];
};

export type ContentDocAccessFields_ReleaseYear_Read = {
  __typename?: 'ContentDocAccessFields_releaseYear_Read';
  permission: Scalars['Boolean']['output'];
};

export type ContentDocAccessFields_ReleaseYear_Update = {
  __typename?: 'ContentDocAccessFields_releaseYear_Update';
  permission: Scalars['Boolean']['output'];
};

export type ContentDocAccessFields_Seasons = {
  __typename?: 'ContentDocAccessFields_seasons';
  create?: Maybe<ContentDocAccessFields_Seasons_Create>;
  delete?: Maybe<ContentDocAccessFields_Seasons_Delete>;
  read?: Maybe<ContentDocAccessFields_Seasons_Read>;
  update?: Maybe<ContentDocAccessFields_Seasons_Update>;
};

export type ContentDocAccessFields_Seasons_Create = {
  __typename?: 'ContentDocAccessFields_seasons_Create';
  permission: Scalars['Boolean']['output'];
};

export type ContentDocAccessFields_Seasons_Delete = {
  __typename?: 'ContentDocAccessFields_seasons_Delete';
  permission: Scalars['Boolean']['output'];
};

export type ContentDocAccessFields_Seasons_Read = {
  __typename?: 'ContentDocAccessFields_seasons_Read';
  permission: Scalars['Boolean']['output'];
};

export type ContentDocAccessFields_Seasons_Update = {
  __typename?: 'ContentDocAccessFields_seasons_Update';
  permission: Scalars['Boolean']['output'];
};

export type ContentDocAccessFields_ShikimoriId = {
  __typename?: 'ContentDocAccessFields_shikimoriId';
  create?: Maybe<ContentDocAccessFields_ShikimoriId_Create>;
  delete?: Maybe<ContentDocAccessFields_ShikimoriId_Delete>;
  read?: Maybe<ContentDocAccessFields_ShikimoriId_Read>;
  update?: Maybe<ContentDocAccessFields_ShikimoriId_Update>;
};

export type ContentDocAccessFields_ShikimoriId_Create = {
  __typename?: 'ContentDocAccessFields_shikimoriId_Create';
  permission: Scalars['Boolean']['output'];
};

export type ContentDocAccessFields_ShikimoriId_Delete = {
  __typename?: 'ContentDocAccessFields_shikimoriId_Delete';
  permission: Scalars['Boolean']['output'];
};

export type ContentDocAccessFields_ShikimoriId_Read = {
  __typename?: 'ContentDocAccessFields_shikimoriId_Read';
  permission: Scalars['Boolean']['output'];
};

export type ContentDocAccessFields_ShikimoriId_Update = {
  __typename?: 'ContentDocAccessFields_shikimoriId_Update';
  permission: Scalars['Boolean']['output'];
};

export type ContentDocAccessFields_Slug = {
  __typename?: 'ContentDocAccessFields_slug';
  create?: Maybe<ContentDocAccessFields_Slug_Create>;
  delete?: Maybe<ContentDocAccessFields_Slug_Delete>;
  read?: Maybe<ContentDocAccessFields_Slug_Read>;
  update?: Maybe<ContentDocAccessFields_Slug_Update>;
};

export type ContentDocAccessFields_Slug_Create = {
  __typename?: 'ContentDocAccessFields_slug_Create';
  permission: Scalars['Boolean']['output'];
};

export type ContentDocAccessFields_Slug_Delete = {
  __typename?: 'ContentDocAccessFields_slug_Delete';
  permission: Scalars['Boolean']['output'];
};

export type ContentDocAccessFields_Slug_Read = {
  __typename?: 'ContentDocAccessFields_slug_Read';
  permission: Scalars['Boolean']['output'];
};

export type ContentDocAccessFields_Slug_Update = {
  __typename?: 'ContentDocAccessFields_slug_Update';
  permission: Scalars['Boolean']['output'];
};

export type ContentDocAccessFields_Status = {
  __typename?: 'ContentDocAccessFields_status';
  create?: Maybe<ContentDocAccessFields_Status_Create>;
  delete?: Maybe<ContentDocAccessFields_Status_Delete>;
  read?: Maybe<ContentDocAccessFields_Status_Read>;
  update?: Maybe<ContentDocAccessFields_Status_Update>;
};

export type ContentDocAccessFields_Status_Create = {
  __typename?: 'ContentDocAccessFields_status_Create';
  permission: Scalars['Boolean']['output'];
};

export type ContentDocAccessFields_Status_Delete = {
  __typename?: 'ContentDocAccessFields_status_Delete';
  permission: Scalars['Boolean']['output'];
};

export type ContentDocAccessFields_Status_Read = {
  __typename?: 'ContentDocAccessFields_status_Read';
  permission: Scalars['Boolean']['output'];
};

export type ContentDocAccessFields_Status_Update = {
  __typename?: 'ContentDocAccessFields_status_Update';
  permission: Scalars['Boolean']['output'];
};

export type ContentDocAccessFields_TitleEn = {
  __typename?: 'ContentDocAccessFields_titleEn';
  create?: Maybe<ContentDocAccessFields_TitleEn_Create>;
  delete?: Maybe<ContentDocAccessFields_TitleEn_Delete>;
  read?: Maybe<ContentDocAccessFields_TitleEn_Read>;
  update?: Maybe<ContentDocAccessFields_TitleEn_Update>;
};

export type ContentDocAccessFields_TitleEn_Create = {
  __typename?: 'ContentDocAccessFields_titleEn_Create';
  permission: Scalars['Boolean']['output'];
};

export type ContentDocAccessFields_TitleEn_Delete = {
  __typename?: 'ContentDocAccessFields_titleEn_Delete';
  permission: Scalars['Boolean']['output'];
};

export type ContentDocAccessFields_TitleEn_Read = {
  __typename?: 'ContentDocAccessFields_titleEn_Read';
  permission: Scalars['Boolean']['output'];
};

export type ContentDocAccessFields_TitleEn_Update = {
  __typename?: 'ContentDocAccessFields_titleEn_Update';
  permission: Scalars['Boolean']['output'];
};

export type ContentDocAccessFields_TitleRu = {
  __typename?: 'ContentDocAccessFields_titleRu';
  create?: Maybe<ContentDocAccessFields_TitleRu_Create>;
  delete?: Maybe<ContentDocAccessFields_TitleRu_Delete>;
  read?: Maybe<ContentDocAccessFields_TitleRu_Read>;
  update?: Maybe<ContentDocAccessFields_TitleRu_Update>;
};

export type ContentDocAccessFields_TitleRu_Create = {
  __typename?: 'ContentDocAccessFields_titleRu_Create';
  permission: Scalars['Boolean']['output'];
};

export type ContentDocAccessFields_TitleRu_Delete = {
  __typename?: 'ContentDocAccessFields_titleRu_Delete';
  permission: Scalars['Boolean']['output'];
};

export type ContentDocAccessFields_TitleRu_Read = {
  __typename?: 'ContentDocAccessFields_titleRu_Read';
  permission: Scalars['Boolean']['output'];
};

export type ContentDocAccessFields_TitleRu_Update = {
  __typename?: 'ContentDocAccessFields_titleRu_Update';
  permission: Scalars['Boolean']['output'];
};

export type ContentDocAccessFields_Type = {
  __typename?: 'ContentDocAccessFields_type';
  create?: Maybe<ContentDocAccessFields_Type_Create>;
  delete?: Maybe<ContentDocAccessFields_Type_Delete>;
  read?: Maybe<ContentDocAccessFields_Type_Read>;
  update?: Maybe<ContentDocAccessFields_Type_Update>;
};

export type ContentDocAccessFields_Type_Create = {
  __typename?: 'ContentDocAccessFields_type_Create';
  permission: Scalars['Boolean']['output'];
};

export type ContentDocAccessFields_Type_Delete = {
  __typename?: 'ContentDocAccessFields_type_Delete';
  permission: Scalars['Boolean']['output'];
};

export type ContentDocAccessFields_Type_Read = {
  __typename?: 'ContentDocAccessFields_type_Read';
  permission: Scalars['Boolean']['output'];
};

export type ContentDocAccessFields_Type_Update = {
  __typename?: 'ContentDocAccessFields_type_Update';
  permission: Scalars['Boolean']['output'];
};

export type ContentDocAccessFields_UpdatedAt = {
  __typename?: 'ContentDocAccessFields_updatedAt';
  create?: Maybe<ContentDocAccessFields_UpdatedAt_Create>;
  delete?: Maybe<ContentDocAccessFields_UpdatedAt_Delete>;
  read?: Maybe<ContentDocAccessFields_UpdatedAt_Read>;
  update?: Maybe<ContentDocAccessFields_UpdatedAt_Update>;
};

export type ContentDocAccessFields_UpdatedAt_Create = {
  __typename?: 'ContentDocAccessFields_updatedAt_Create';
  permission: Scalars['Boolean']['output'];
};

export type ContentDocAccessFields_UpdatedAt_Delete = {
  __typename?: 'ContentDocAccessFields_updatedAt_Delete';
  permission: Scalars['Boolean']['output'];
};

export type ContentDocAccessFields_UpdatedAt_Read = {
  __typename?: 'ContentDocAccessFields_updatedAt_Read';
  permission: Scalars['Boolean']['output'];
};

export type ContentDocAccessFields_UpdatedAt_Update = {
  __typename?: 'ContentDocAccessFields_updatedAt_Update';
  permission: Scalars['Boolean']['output'];
};

export type ContentFields = {
  __typename?: 'ContentFields';
  _status?: Maybe<ContentFields__Status>;
  backdrop?: Maybe<ContentFields_Backdrop>;
  createdAt?: Maybe<ContentFields_CreatedAt>;
  description?: Maybe<ContentFields_Description>;
  duration?: Maybe<ContentFields_Duration>;
  genres?: Maybe<ContentFields_Genres>;
  kodikId?: Maybe<ContentFields_KodikId>;
  originalTitle?: Maybe<ContentFields_OriginalTitle>;
  poster?: Maybe<ContentFields_Poster>;
  rating?: Maybe<ContentFields_Rating>;
  releaseYear?: Maybe<ContentFields_ReleaseYear>;
  seasons?: Maybe<ContentFields_Seasons>;
  shikimoriId?: Maybe<ContentFields_ShikimoriId>;
  slug?: Maybe<ContentFields_Slug>;
  status?: Maybe<ContentFields_Status>;
  titleEn?: Maybe<ContentFields_TitleEn>;
  titleRu?: Maybe<ContentFields_TitleRu>;
  type?: Maybe<ContentFields_Type>;
  updatedAt?: Maybe<ContentFields_UpdatedAt>;
};

export type ContentFields__Status = {
  __typename?: 'ContentFields__status';
  create?: Maybe<ContentFields__Status_Create>;
  delete?: Maybe<ContentFields__Status_Delete>;
  read?: Maybe<ContentFields__Status_Read>;
  update?: Maybe<ContentFields__Status_Update>;
};

export type ContentFields__Status_Create = {
  __typename?: 'ContentFields__status_Create';
  permission: Scalars['Boolean']['output'];
};

export type ContentFields__Status_Delete = {
  __typename?: 'ContentFields__status_Delete';
  permission: Scalars['Boolean']['output'];
};

export type ContentFields__Status_Read = {
  __typename?: 'ContentFields__status_Read';
  permission: Scalars['Boolean']['output'];
};

export type ContentFields__Status_Update = {
  __typename?: 'ContentFields__status_Update';
  permission: Scalars['Boolean']['output'];
};

export type ContentFields_Backdrop = {
  __typename?: 'ContentFields_backdrop';
  create?: Maybe<ContentFields_Backdrop_Create>;
  delete?: Maybe<ContentFields_Backdrop_Delete>;
  read?: Maybe<ContentFields_Backdrop_Read>;
  update?: Maybe<ContentFields_Backdrop_Update>;
};

export type ContentFields_Backdrop_Create = {
  __typename?: 'ContentFields_backdrop_Create';
  permission: Scalars['Boolean']['output'];
};

export type ContentFields_Backdrop_Delete = {
  __typename?: 'ContentFields_backdrop_Delete';
  permission: Scalars['Boolean']['output'];
};

export type ContentFields_Backdrop_Read = {
  __typename?: 'ContentFields_backdrop_Read';
  permission: Scalars['Boolean']['output'];
};

export type ContentFields_Backdrop_Update = {
  __typename?: 'ContentFields_backdrop_Update';
  permission: Scalars['Boolean']['output'];
};

export type ContentFields_CreatedAt = {
  __typename?: 'ContentFields_createdAt';
  create?: Maybe<ContentFields_CreatedAt_Create>;
  delete?: Maybe<ContentFields_CreatedAt_Delete>;
  read?: Maybe<ContentFields_CreatedAt_Read>;
  update?: Maybe<ContentFields_CreatedAt_Update>;
};

export type ContentFields_CreatedAt_Create = {
  __typename?: 'ContentFields_createdAt_Create';
  permission: Scalars['Boolean']['output'];
};

export type ContentFields_CreatedAt_Delete = {
  __typename?: 'ContentFields_createdAt_Delete';
  permission: Scalars['Boolean']['output'];
};

export type ContentFields_CreatedAt_Read = {
  __typename?: 'ContentFields_createdAt_Read';
  permission: Scalars['Boolean']['output'];
};

export type ContentFields_CreatedAt_Update = {
  __typename?: 'ContentFields_createdAt_Update';
  permission: Scalars['Boolean']['output'];
};

export type ContentFields_Description = {
  __typename?: 'ContentFields_description';
  create?: Maybe<ContentFields_Description_Create>;
  delete?: Maybe<ContentFields_Description_Delete>;
  read?: Maybe<ContentFields_Description_Read>;
  update?: Maybe<ContentFields_Description_Update>;
};

export type ContentFields_Description_Create = {
  __typename?: 'ContentFields_description_Create';
  permission: Scalars['Boolean']['output'];
};

export type ContentFields_Description_Delete = {
  __typename?: 'ContentFields_description_Delete';
  permission: Scalars['Boolean']['output'];
};

export type ContentFields_Description_Read = {
  __typename?: 'ContentFields_description_Read';
  permission: Scalars['Boolean']['output'];
};

export type ContentFields_Description_Update = {
  __typename?: 'ContentFields_description_Update';
  permission: Scalars['Boolean']['output'];
};

export type ContentFields_Duration = {
  __typename?: 'ContentFields_duration';
  create?: Maybe<ContentFields_Duration_Create>;
  delete?: Maybe<ContentFields_Duration_Delete>;
  read?: Maybe<ContentFields_Duration_Read>;
  update?: Maybe<ContentFields_Duration_Update>;
};

export type ContentFields_Duration_Create = {
  __typename?: 'ContentFields_duration_Create';
  permission: Scalars['Boolean']['output'];
};

export type ContentFields_Duration_Delete = {
  __typename?: 'ContentFields_duration_Delete';
  permission: Scalars['Boolean']['output'];
};

export type ContentFields_Duration_Read = {
  __typename?: 'ContentFields_duration_Read';
  permission: Scalars['Boolean']['output'];
};

export type ContentFields_Duration_Update = {
  __typename?: 'ContentFields_duration_Update';
  permission: Scalars['Boolean']['output'];
};

export type ContentFields_Genres = {
  __typename?: 'ContentFields_genres';
  create?: Maybe<ContentFields_Genres_Create>;
  delete?: Maybe<ContentFields_Genres_Delete>;
  read?: Maybe<ContentFields_Genres_Read>;
  update?: Maybe<ContentFields_Genres_Update>;
};

export type ContentFields_Genres_Create = {
  __typename?: 'ContentFields_genres_Create';
  permission: Scalars['Boolean']['output'];
};

export type ContentFields_Genres_Delete = {
  __typename?: 'ContentFields_genres_Delete';
  permission: Scalars['Boolean']['output'];
};

export type ContentFields_Genres_Read = {
  __typename?: 'ContentFields_genres_Read';
  permission: Scalars['Boolean']['output'];
};

export type ContentFields_Genres_Update = {
  __typename?: 'ContentFields_genres_Update';
  permission: Scalars['Boolean']['output'];
};

export type ContentFields_KodikId = {
  __typename?: 'ContentFields_kodikId';
  create?: Maybe<ContentFields_KodikId_Create>;
  delete?: Maybe<ContentFields_KodikId_Delete>;
  read?: Maybe<ContentFields_KodikId_Read>;
  update?: Maybe<ContentFields_KodikId_Update>;
};

export type ContentFields_KodikId_Create = {
  __typename?: 'ContentFields_kodikId_Create';
  permission: Scalars['Boolean']['output'];
};

export type ContentFields_KodikId_Delete = {
  __typename?: 'ContentFields_kodikId_Delete';
  permission: Scalars['Boolean']['output'];
};

export type ContentFields_KodikId_Read = {
  __typename?: 'ContentFields_kodikId_Read';
  permission: Scalars['Boolean']['output'];
};

export type ContentFields_KodikId_Update = {
  __typename?: 'ContentFields_kodikId_Update';
  permission: Scalars['Boolean']['output'];
};

export type ContentFields_OriginalTitle = {
  __typename?: 'ContentFields_originalTitle';
  create?: Maybe<ContentFields_OriginalTitle_Create>;
  delete?: Maybe<ContentFields_OriginalTitle_Delete>;
  read?: Maybe<ContentFields_OriginalTitle_Read>;
  update?: Maybe<ContentFields_OriginalTitle_Update>;
};

export type ContentFields_OriginalTitle_Create = {
  __typename?: 'ContentFields_originalTitle_Create';
  permission: Scalars['Boolean']['output'];
};

export type ContentFields_OriginalTitle_Delete = {
  __typename?: 'ContentFields_originalTitle_Delete';
  permission: Scalars['Boolean']['output'];
};

export type ContentFields_OriginalTitle_Read = {
  __typename?: 'ContentFields_originalTitle_Read';
  permission: Scalars['Boolean']['output'];
};

export type ContentFields_OriginalTitle_Update = {
  __typename?: 'ContentFields_originalTitle_Update';
  permission: Scalars['Boolean']['output'];
};

export type ContentFields_Poster = {
  __typename?: 'ContentFields_poster';
  create?: Maybe<ContentFields_Poster_Create>;
  delete?: Maybe<ContentFields_Poster_Delete>;
  read?: Maybe<ContentFields_Poster_Read>;
  update?: Maybe<ContentFields_Poster_Update>;
};

export type ContentFields_Poster_Create = {
  __typename?: 'ContentFields_poster_Create';
  permission: Scalars['Boolean']['output'];
};

export type ContentFields_Poster_Delete = {
  __typename?: 'ContentFields_poster_Delete';
  permission: Scalars['Boolean']['output'];
};

export type ContentFields_Poster_Read = {
  __typename?: 'ContentFields_poster_Read';
  permission: Scalars['Boolean']['output'];
};

export type ContentFields_Poster_Update = {
  __typename?: 'ContentFields_poster_Update';
  permission: Scalars['Boolean']['output'];
};

export type ContentFields_Rating = {
  __typename?: 'ContentFields_rating';
  create?: Maybe<ContentFields_Rating_Create>;
  delete?: Maybe<ContentFields_Rating_Delete>;
  read?: Maybe<ContentFields_Rating_Read>;
  update?: Maybe<ContentFields_Rating_Update>;
};

export type ContentFields_Rating_Create = {
  __typename?: 'ContentFields_rating_Create';
  permission: Scalars['Boolean']['output'];
};

export type ContentFields_Rating_Delete = {
  __typename?: 'ContentFields_rating_Delete';
  permission: Scalars['Boolean']['output'];
};

export type ContentFields_Rating_Read = {
  __typename?: 'ContentFields_rating_Read';
  permission: Scalars['Boolean']['output'];
};

export type ContentFields_Rating_Update = {
  __typename?: 'ContentFields_rating_Update';
  permission: Scalars['Boolean']['output'];
};

export type ContentFields_ReleaseYear = {
  __typename?: 'ContentFields_releaseYear';
  create?: Maybe<ContentFields_ReleaseYear_Create>;
  delete?: Maybe<ContentFields_ReleaseYear_Delete>;
  read?: Maybe<ContentFields_ReleaseYear_Read>;
  update?: Maybe<ContentFields_ReleaseYear_Update>;
};

export type ContentFields_ReleaseYear_Create = {
  __typename?: 'ContentFields_releaseYear_Create';
  permission: Scalars['Boolean']['output'];
};

export type ContentFields_ReleaseYear_Delete = {
  __typename?: 'ContentFields_releaseYear_Delete';
  permission: Scalars['Boolean']['output'];
};

export type ContentFields_ReleaseYear_Read = {
  __typename?: 'ContentFields_releaseYear_Read';
  permission: Scalars['Boolean']['output'];
};

export type ContentFields_ReleaseYear_Update = {
  __typename?: 'ContentFields_releaseYear_Update';
  permission: Scalars['Boolean']['output'];
};

export type ContentFields_Seasons = {
  __typename?: 'ContentFields_seasons';
  create?: Maybe<ContentFields_Seasons_Create>;
  delete?: Maybe<ContentFields_Seasons_Delete>;
  read?: Maybe<ContentFields_Seasons_Read>;
  update?: Maybe<ContentFields_Seasons_Update>;
};

export type ContentFields_Seasons_Create = {
  __typename?: 'ContentFields_seasons_Create';
  permission: Scalars['Boolean']['output'];
};

export type ContentFields_Seasons_Delete = {
  __typename?: 'ContentFields_seasons_Delete';
  permission: Scalars['Boolean']['output'];
};

export type ContentFields_Seasons_Read = {
  __typename?: 'ContentFields_seasons_Read';
  permission: Scalars['Boolean']['output'];
};

export type ContentFields_Seasons_Update = {
  __typename?: 'ContentFields_seasons_Update';
  permission: Scalars['Boolean']['output'];
};

export type ContentFields_ShikimoriId = {
  __typename?: 'ContentFields_shikimoriId';
  create?: Maybe<ContentFields_ShikimoriId_Create>;
  delete?: Maybe<ContentFields_ShikimoriId_Delete>;
  read?: Maybe<ContentFields_ShikimoriId_Read>;
  update?: Maybe<ContentFields_ShikimoriId_Update>;
};

export type ContentFields_ShikimoriId_Create = {
  __typename?: 'ContentFields_shikimoriId_Create';
  permission: Scalars['Boolean']['output'];
};

export type ContentFields_ShikimoriId_Delete = {
  __typename?: 'ContentFields_shikimoriId_Delete';
  permission: Scalars['Boolean']['output'];
};

export type ContentFields_ShikimoriId_Read = {
  __typename?: 'ContentFields_shikimoriId_Read';
  permission: Scalars['Boolean']['output'];
};

export type ContentFields_ShikimoriId_Update = {
  __typename?: 'ContentFields_shikimoriId_Update';
  permission: Scalars['Boolean']['output'];
};

export type ContentFields_Slug = {
  __typename?: 'ContentFields_slug';
  create?: Maybe<ContentFields_Slug_Create>;
  delete?: Maybe<ContentFields_Slug_Delete>;
  read?: Maybe<ContentFields_Slug_Read>;
  update?: Maybe<ContentFields_Slug_Update>;
};

export type ContentFields_Slug_Create = {
  __typename?: 'ContentFields_slug_Create';
  permission: Scalars['Boolean']['output'];
};

export type ContentFields_Slug_Delete = {
  __typename?: 'ContentFields_slug_Delete';
  permission: Scalars['Boolean']['output'];
};

export type ContentFields_Slug_Read = {
  __typename?: 'ContentFields_slug_Read';
  permission: Scalars['Boolean']['output'];
};

export type ContentFields_Slug_Update = {
  __typename?: 'ContentFields_slug_Update';
  permission: Scalars['Boolean']['output'];
};

export type ContentFields_Status = {
  __typename?: 'ContentFields_status';
  create?: Maybe<ContentFields_Status_Create>;
  delete?: Maybe<ContentFields_Status_Delete>;
  read?: Maybe<ContentFields_Status_Read>;
  update?: Maybe<ContentFields_Status_Update>;
};

export type ContentFields_Status_Create = {
  __typename?: 'ContentFields_status_Create';
  permission: Scalars['Boolean']['output'];
};

export type ContentFields_Status_Delete = {
  __typename?: 'ContentFields_status_Delete';
  permission: Scalars['Boolean']['output'];
};

export type ContentFields_Status_Read = {
  __typename?: 'ContentFields_status_Read';
  permission: Scalars['Boolean']['output'];
};

export type ContentFields_Status_Update = {
  __typename?: 'ContentFields_status_Update';
  permission: Scalars['Boolean']['output'];
};

export type ContentFields_TitleEn = {
  __typename?: 'ContentFields_titleEn';
  create?: Maybe<ContentFields_TitleEn_Create>;
  delete?: Maybe<ContentFields_TitleEn_Delete>;
  read?: Maybe<ContentFields_TitleEn_Read>;
  update?: Maybe<ContentFields_TitleEn_Update>;
};

export type ContentFields_TitleEn_Create = {
  __typename?: 'ContentFields_titleEn_Create';
  permission: Scalars['Boolean']['output'];
};

export type ContentFields_TitleEn_Delete = {
  __typename?: 'ContentFields_titleEn_Delete';
  permission: Scalars['Boolean']['output'];
};

export type ContentFields_TitleEn_Read = {
  __typename?: 'ContentFields_titleEn_Read';
  permission: Scalars['Boolean']['output'];
};

export type ContentFields_TitleEn_Update = {
  __typename?: 'ContentFields_titleEn_Update';
  permission: Scalars['Boolean']['output'];
};

export type ContentFields_TitleRu = {
  __typename?: 'ContentFields_titleRu';
  create?: Maybe<ContentFields_TitleRu_Create>;
  delete?: Maybe<ContentFields_TitleRu_Delete>;
  read?: Maybe<ContentFields_TitleRu_Read>;
  update?: Maybe<ContentFields_TitleRu_Update>;
};

export type ContentFields_TitleRu_Create = {
  __typename?: 'ContentFields_titleRu_Create';
  permission: Scalars['Boolean']['output'];
};

export type ContentFields_TitleRu_Delete = {
  __typename?: 'ContentFields_titleRu_Delete';
  permission: Scalars['Boolean']['output'];
};

export type ContentFields_TitleRu_Read = {
  __typename?: 'ContentFields_titleRu_Read';
  permission: Scalars['Boolean']['output'];
};

export type ContentFields_TitleRu_Update = {
  __typename?: 'ContentFields_titleRu_Update';
  permission: Scalars['Boolean']['output'];
};

export type ContentFields_Type = {
  __typename?: 'ContentFields_type';
  create?: Maybe<ContentFields_Type_Create>;
  delete?: Maybe<ContentFields_Type_Delete>;
  read?: Maybe<ContentFields_Type_Read>;
  update?: Maybe<ContentFields_Type_Update>;
};

export type ContentFields_Type_Create = {
  __typename?: 'ContentFields_type_Create';
  permission: Scalars['Boolean']['output'];
};

export type ContentFields_Type_Delete = {
  __typename?: 'ContentFields_type_Delete';
  permission: Scalars['Boolean']['output'];
};

export type ContentFields_Type_Read = {
  __typename?: 'ContentFields_type_Read';
  permission: Scalars['Boolean']['output'];
};

export type ContentFields_Type_Update = {
  __typename?: 'ContentFields_type_Update';
  permission: Scalars['Boolean']['output'];
};

export type ContentFields_UpdatedAt = {
  __typename?: 'ContentFields_updatedAt';
  create?: Maybe<ContentFields_UpdatedAt_Create>;
  delete?: Maybe<ContentFields_UpdatedAt_Delete>;
  read?: Maybe<ContentFields_UpdatedAt_Read>;
  update?: Maybe<ContentFields_UpdatedAt_Update>;
};

export type ContentFields_UpdatedAt_Create = {
  __typename?: 'ContentFields_updatedAt_Create';
  permission: Scalars['Boolean']['output'];
};

export type ContentFields_UpdatedAt_Delete = {
  __typename?: 'ContentFields_updatedAt_Delete';
  permission: Scalars['Boolean']['output'];
};

export type ContentFields_UpdatedAt_Read = {
  __typename?: 'ContentFields_updatedAt_Read';
  permission: Scalars['Boolean']['output'];
};

export type ContentFields_UpdatedAt_Update = {
  __typename?: 'ContentFields_updatedAt_Update';
  permission: Scalars['Boolean']['output'];
};

export type ContentReadAccess = {
  __typename?: 'ContentReadAccess';
  permission: Scalars['Boolean']['output'];
  where?: Maybe<Scalars['JSONObject']['output']>;
};

export type ContentReadDocAccess = {
  __typename?: 'ContentReadDocAccess';
  permission: Scalars['Boolean']['output'];
  where?: Maybe<Scalars['JSONObject']['output']>;
};

export type ContentReadVersionsAccess = {
  __typename?: 'ContentReadVersionsAccess';
  permission: Scalars['Boolean']['output'];
  where?: Maybe<Scalars['JSONObject']['output']>;
};

export type ContentReadVersionsDocAccess = {
  __typename?: 'ContentReadVersionsDocAccess';
  permission: Scalars['Boolean']['output'];
  where?: Maybe<Scalars['JSONObject']['output']>;
};

export type ContentUpdateAccess = {
  __typename?: 'ContentUpdateAccess';
  permission: Scalars['Boolean']['output'];
  where?: Maybe<Scalars['JSONObject']['output']>;
};

export type ContentUpdateDocAccess = {
  __typename?: 'ContentUpdateDocAccess';
  permission: Scalars['Boolean']['output'];
  where?: Maybe<Scalars['JSONObject']['output']>;
};

export enum ContentUpdate__Status_MutationInput {
  Draft = 'draft',
  Published = 'published'
}

export enum ContentUpdate_Status_MutationInput {
  Draft = 'draft',
  Published = 'published'
}

export enum ContentUpdate_Type_MutationInput {
  Movie = 'movie',
  Series = 'series'
}

export type ContentVersion = {
  __typename?: 'ContentVersion';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  latest?: Maybe<Scalars['Boolean']['output']>;
  parent?: Maybe<Content>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  version?: Maybe<ContentVersion_Version>;
};


export type ContentVersionParentArgs = {
  draft?: InputMaybe<Scalars['Boolean']['input']>;
};

export type ContentVersion_Version = {
  __typename?: 'ContentVersion_Version';
  _status?: Maybe<ContentVersion_Version__Status>;
  backdrop?: Maybe<Media>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  description?: Maybe<Scalars['JSON']['output']>;
  duration?: Maybe<Scalars['Float']['output']>;
  genres?: Maybe<Array<Genre>>;
  kodikId?: Maybe<Scalars['String']['output']>;
  originalTitle?: Maybe<Scalars['String']['output']>;
  poster?: Maybe<Media>;
  rating?: Maybe<Scalars['Float']['output']>;
  releaseYear?: Maybe<Scalars['Float']['output']>;
  seasons?: Maybe<ContentVersion_Version_Seasons>;
  shikimoriId?: Maybe<Scalars['String']['output']>;
  slug?: Maybe<Scalars['String']['output']>;
  status?: Maybe<ContentVersion_Version_Status>;
  titleEn?: Maybe<Scalars['String']['output']>;
  titleRu?: Maybe<Scalars['String']['output']>;
  type?: Maybe<ContentVersion_Version_Type>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};


export type ContentVersion_VersionDescriptionArgs = {
  depth?: InputMaybe<Scalars['Int']['input']>;
};


export type ContentVersion_VersionSeasonsArgs = {
  count?: InputMaybe<Scalars['Boolean']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  where?: InputMaybe<Season_Where>;
};

export type ContentVersion_Version_Seasons = {
  __typename?: 'ContentVersion_Version_Seasons';
  docs: Array<Season>;
  hasNextPage: Scalars['Boolean']['output'];
  totalDocs?: Maybe<Scalars['Int']['output']>;
};

export enum ContentVersion_Version__Status {
  Draft = 'draft',
  Published = 'published'
}

export enum ContentVersion_Version_Status {
  Draft = 'draft',
  Published = 'published'
}

export enum ContentVersion_Version_Type {
  Movie = 'movie',
  Series = 'series'
}

export type Content_Seasons = {
  __typename?: 'Content_Seasons';
  docs: Array<Season>;
  hasNextPage: Scalars['Boolean']['output'];
  totalDocs?: Maybe<Scalars['Int']['output']>;
};

export enum Content__Status {
  Draft = 'draft',
  Published = 'published'
}

export enum Content__Status_Input {
  Draft = 'draft',
  Published = 'published'
}

export enum Content__Status_MutationInput {
  Draft = 'draft',
  Published = 'published'
}

export type Content__Status_Operator = {
  all?: InputMaybe<Array<InputMaybe<Content__Status_Input>>>;
  equals?: InputMaybe<Content__Status_Input>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  in?: InputMaybe<Array<InputMaybe<Content__Status_Input>>>;
  not_equals?: InputMaybe<Content__Status_Input>;
  not_in?: InputMaybe<Array<InputMaybe<Content__Status_Input>>>;
};

export type Content_Backdrop_Operator = {
  all?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>;
  equals?: InputMaybe<Scalars['JSON']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>;
  not_equals?: InputMaybe<Scalars['JSON']['input']>;
  not_in?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>;
};

export type Content_CreatedAt_Operator = {
  equals?: InputMaybe<Scalars['DateTime']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  greater_than?: InputMaybe<Scalars['DateTime']['input']>;
  greater_than_equal?: InputMaybe<Scalars['DateTime']['input']>;
  less_than?: InputMaybe<Scalars['DateTime']['input']>;
  less_than_equal?: InputMaybe<Scalars['DateTime']['input']>;
  like?: InputMaybe<Scalars['DateTime']['input']>;
  not_equals?: InputMaybe<Scalars['DateTime']['input']>;
};

export type Content_Description_Operator = {
  contains?: InputMaybe<Scalars['JSON']['input']>;
  equals?: InputMaybe<Scalars['JSON']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  like?: InputMaybe<Scalars['JSON']['input']>;
  not_equals?: InputMaybe<Scalars['JSON']['input']>;
};

export type Content_Duration_Operator = {
  equals?: InputMaybe<Scalars['Float']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  greater_than?: InputMaybe<Scalars['Float']['input']>;
  greater_than_equal?: InputMaybe<Scalars['Float']['input']>;
  less_than?: InputMaybe<Scalars['Float']['input']>;
  less_than_equal?: InputMaybe<Scalars['Float']['input']>;
  not_equals?: InputMaybe<Scalars['Float']['input']>;
};

export type Content_Genres_Operator = {
  all?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>;
  equals?: InputMaybe<Scalars['JSON']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>;
  not_equals?: InputMaybe<Scalars['JSON']['input']>;
  not_in?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>;
};

export type Content_Id_Operator = {
  equals?: InputMaybe<Scalars['Int']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  greater_than?: InputMaybe<Scalars['Int']['input']>;
  greater_than_equal?: InputMaybe<Scalars['Int']['input']>;
  less_than?: InputMaybe<Scalars['Int']['input']>;
  less_than_equal?: InputMaybe<Scalars['Int']['input']>;
  not_equals?: InputMaybe<Scalars['Int']['input']>;
};

export type Content_KodikId_Operator = {
  all?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  contains?: InputMaybe<Scalars['String']['input']>;
  equals?: InputMaybe<Scalars['String']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  like?: InputMaybe<Scalars['String']['input']>;
  not_equals?: InputMaybe<Scalars['String']['input']>;
  not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type Content_OriginalTitle_Operator = {
  all?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  contains?: InputMaybe<Scalars['String']['input']>;
  equals?: InputMaybe<Scalars['String']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  like?: InputMaybe<Scalars['String']['input']>;
  not_equals?: InputMaybe<Scalars['String']['input']>;
  not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type Content_Poster_Operator = {
  all?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>;
  equals?: InputMaybe<Scalars['JSON']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>;
  not_equals?: InputMaybe<Scalars['JSON']['input']>;
  not_in?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>;
};

export type Content_Rating_Operator = {
  equals?: InputMaybe<Scalars['Float']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  greater_than?: InputMaybe<Scalars['Float']['input']>;
  greater_than_equal?: InputMaybe<Scalars['Float']['input']>;
  less_than?: InputMaybe<Scalars['Float']['input']>;
  less_than_equal?: InputMaybe<Scalars['Float']['input']>;
  not_equals?: InputMaybe<Scalars['Float']['input']>;
};

export type Content_ReleaseYear_Operator = {
  equals?: InputMaybe<Scalars['Float']['input']>;
  greater_than?: InputMaybe<Scalars['Float']['input']>;
  greater_than_equal?: InputMaybe<Scalars['Float']['input']>;
  less_than?: InputMaybe<Scalars['Float']['input']>;
  less_than_equal?: InputMaybe<Scalars['Float']['input']>;
  not_equals?: InputMaybe<Scalars['Float']['input']>;
};

export type Content_ShikimoriId_Operator = {
  all?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  contains?: InputMaybe<Scalars['String']['input']>;
  equals?: InputMaybe<Scalars['String']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  like?: InputMaybe<Scalars['String']['input']>;
  not_equals?: InputMaybe<Scalars['String']['input']>;
  not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type Content_Slug_Operator = {
  all?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  contains?: InputMaybe<Scalars['String']['input']>;
  equals?: InputMaybe<Scalars['String']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  like?: InputMaybe<Scalars['String']['input']>;
  not_equals?: InputMaybe<Scalars['String']['input']>;
  not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export enum Content_Status {
  Draft = 'draft',
  Published = 'published'
}

export enum Content_Status_Input {
  Draft = 'draft',
  Published = 'published'
}

export enum Content_Status_MutationInput {
  Draft = 'draft',
  Published = 'published'
}

export type Content_Status_Operator = {
  all?: InputMaybe<Array<InputMaybe<Content_Status_Input>>>;
  equals?: InputMaybe<Content_Status_Input>;
  in?: InputMaybe<Array<InputMaybe<Content_Status_Input>>>;
  not_equals?: InputMaybe<Content_Status_Input>;
  not_in?: InputMaybe<Array<InputMaybe<Content_Status_Input>>>;
};

export type Content_TitleEn_Operator = {
  all?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  contains?: InputMaybe<Scalars['String']['input']>;
  equals?: InputMaybe<Scalars['String']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  like?: InputMaybe<Scalars['String']['input']>;
  not_equals?: InputMaybe<Scalars['String']['input']>;
  not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type Content_TitleRu_Operator = {
  all?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  contains?: InputMaybe<Scalars['String']['input']>;
  equals?: InputMaybe<Scalars['String']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  like?: InputMaybe<Scalars['String']['input']>;
  not_equals?: InputMaybe<Scalars['String']['input']>;
  not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export enum Content_Type {
  Movie = 'movie',
  Series = 'series'
}

export enum Content_Type_Input {
  Movie = 'movie',
  Series = 'series'
}

export enum Content_Type_MutationInput {
  Movie = 'movie',
  Series = 'series'
}

export type Content_Type_Operator = {
  all?: InputMaybe<Array<InputMaybe<Content_Type_Input>>>;
  equals?: InputMaybe<Content_Type_Input>;
  in?: InputMaybe<Array<InputMaybe<Content_Type_Input>>>;
  not_equals?: InputMaybe<Content_Type_Input>;
  not_in?: InputMaybe<Array<InputMaybe<Content_Type_Input>>>;
};

export type Content_UpdatedAt_Operator = {
  equals?: InputMaybe<Scalars['DateTime']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  greater_than?: InputMaybe<Scalars['DateTime']['input']>;
  greater_than_equal?: InputMaybe<Scalars['DateTime']['input']>;
  less_than?: InputMaybe<Scalars['DateTime']['input']>;
  less_than_equal?: InputMaybe<Scalars['DateTime']['input']>;
  like?: InputMaybe<Scalars['DateTime']['input']>;
  not_equals?: InputMaybe<Scalars['DateTime']['input']>;
};

export type Content_Where = {
  AND?: InputMaybe<Array<InputMaybe<Content_Where_And>>>;
  OR?: InputMaybe<Array<InputMaybe<Content_Where_Or>>>;
  _status?: InputMaybe<Content__Status_Operator>;
  backdrop?: InputMaybe<Content_Backdrop_Operator>;
  createdAt?: InputMaybe<Content_CreatedAt_Operator>;
  description?: InputMaybe<Content_Description_Operator>;
  duration?: InputMaybe<Content_Duration_Operator>;
  genres?: InputMaybe<Content_Genres_Operator>;
  id?: InputMaybe<Content_Id_Operator>;
  kodikId?: InputMaybe<Content_KodikId_Operator>;
  originalTitle?: InputMaybe<Content_OriginalTitle_Operator>;
  poster?: InputMaybe<Content_Poster_Operator>;
  rating?: InputMaybe<Content_Rating_Operator>;
  releaseYear?: InputMaybe<Content_ReleaseYear_Operator>;
  shikimoriId?: InputMaybe<Content_ShikimoriId_Operator>;
  slug?: InputMaybe<Content_Slug_Operator>;
  status?: InputMaybe<Content_Status_Operator>;
  titleEn?: InputMaybe<Content_TitleEn_Operator>;
  titleRu?: InputMaybe<Content_TitleRu_Operator>;
  type?: InputMaybe<Content_Type_Operator>;
  updatedAt?: InputMaybe<Content_UpdatedAt_Operator>;
};

export type Content_Where_And = {
  AND?: InputMaybe<Array<InputMaybe<Content_Where_And>>>;
  OR?: InputMaybe<Array<InputMaybe<Content_Where_Or>>>;
  _status?: InputMaybe<Content__Status_Operator>;
  backdrop?: InputMaybe<Content_Backdrop_Operator>;
  createdAt?: InputMaybe<Content_CreatedAt_Operator>;
  description?: InputMaybe<Content_Description_Operator>;
  duration?: InputMaybe<Content_Duration_Operator>;
  genres?: InputMaybe<Content_Genres_Operator>;
  id?: InputMaybe<Content_Id_Operator>;
  kodikId?: InputMaybe<Content_KodikId_Operator>;
  originalTitle?: InputMaybe<Content_OriginalTitle_Operator>;
  poster?: InputMaybe<Content_Poster_Operator>;
  rating?: InputMaybe<Content_Rating_Operator>;
  releaseYear?: InputMaybe<Content_ReleaseYear_Operator>;
  shikimoriId?: InputMaybe<Content_ShikimoriId_Operator>;
  slug?: InputMaybe<Content_Slug_Operator>;
  status?: InputMaybe<Content_Status_Operator>;
  titleEn?: InputMaybe<Content_TitleEn_Operator>;
  titleRu?: InputMaybe<Content_TitleRu_Operator>;
  type?: InputMaybe<Content_Type_Operator>;
  updatedAt?: InputMaybe<Content_UpdatedAt_Operator>;
};

export type Content_Where_Or = {
  AND?: InputMaybe<Array<InputMaybe<Content_Where_And>>>;
  OR?: InputMaybe<Array<InputMaybe<Content_Where_Or>>>;
  _status?: InputMaybe<Content__Status_Operator>;
  backdrop?: InputMaybe<Content_Backdrop_Operator>;
  createdAt?: InputMaybe<Content_CreatedAt_Operator>;
  description?: InputMaybe<Content_Description_Operator>;
  duration?: InputMaybe<Content_Duration_Operator>;
  genres?: InputMaybe<Content_Genres_Operator>;
  id?: InputMaybe<Content_Id_Operator>;
  kodikId?: InputMaybe<Content_KodikId_Operator>;
  originalTitle?: InputMaybe<Content_OriginalTitle_Operator>;
  poster?: InputMaybe<Content_Poster_Operator>;
  rating?: InputMaybe<Content_Rating_Operator>;
  releaseYear?: InputMaybe<Content_ReleaseYear_Operator>;
  shikimoriId?: InputMaybe<Content_ShikimoriId_Operator>;
  slug?: InputMaybe<Content_Slug_Operator>;
  status?: InputMaybe<Content_Status_Operator>;
  titleEn?: InputMaybe<Content_TitleEn_Operator>;
  titleRu?: InputMaybe<Content_TitleRu_Operator>;
  type?: InputMaybe<Content_Type_Operator>;
  updatedAt?: InputMaybe<Content_UpdatedAt_Operator>;
};

export type Contents = {
  __typename?: 'Contents';
  docs: Array<Content>;
  hasNextPage: Scalars['Boolean']['output'];
  hasPrevPage: Scalars['Boolean']['output'];
  limit: Scalars['Int']['output'];
  nextPage?: Maybe<Scalars['Int']['output']>;
  offset?: Maybe<Scalars['Int']['output']>;
  page: Scalars['Int']['output'];
  pagingCounter: Scalars['Int']['output'];
  prevPage?: Maybe<Scalars['Int']['output']>;
  totalDocs: Scalars['Int']['output'];
  totalPages: Scalars['Int']['output'];
};

export type Episode = {
  __typename?: 'Episode';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  description?: Maybe<Scalars['JSON']['output']>;
  duration?: Maybe<Scalars['Float']['output']>;
  episodeNumber: Scalars['Float']['output'];
  id: Scalars['Int']['output'];
  releaseDate?: Maybe<Scalars['DateTime']['output']>;
  season?: Maybe<Season>;
  title: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};


export type EpisodeDescriptionArgs = {
  depth?: InputMaybe<Scalars['Int']['input']>;
};

export type Episode_CreatedAt_Operator = {
  equals?: InputMaybe<Scalars['DateTime']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  greater_than?: InputMaybe<Scalars['DateTime']['input']>;
  greater_than_equal?: InputMaybe<Scalars['DateTime']['input']>;
  less_than?: InputMaybe<Scalars['DateTime']['input']>;
  less_than_equal?: InputMaybe<Scalars['DateTime']['input']>;
  like?: InputMaybe<Scalars['DateTime']['input']>;
  not_equals?: InputMaybe<Scalars['DateTime']['input']>;
};

export type Episode_Description_Operator = {
  contains?: InputMaybe<Scalars['JSON']['input']>;
  equals?: InputMaybe<Scalars['JSON']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  like?: InputMaybe<Scalars['JSON']['input']>;
  not_equals?: InputMaybe<Scalars['JSON']['input']>;
};

export type Episode_Duration_Operator = {
  equals?: InputMaybe<Scalars['Float']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  greater_than?: InputMaybe<Scalars['Float']['input']>;
  greater_than_equal?: InputMaybe<Scalars['Float']['input']>;
  less_than?: InputMaybe<Scalars['Float']['input']>;
  less_than_equal?: InputMaybe<Scalars['Float']['input']>;
  not_equals?: InputMaybe<Scalars['Float']['input']>;
};

export type Episode_EpisodeNumber_Operator = {
  equals?: InputMaybe<Scalars['Float']['input']>;
  greater_than?: InputMaybe<Scalars['Float']['input']>;
  greater_than_equal?: InputMaybe<Scalars['Float']['input']>;
  less_than?: InputMaybe<Scalars['Float']['input']>;
  less_than_equal?: InputMaybe<Scalars['Float']['input']>;
  not_equals?: InputMaybe<Scalars['Float']['input']>;
};

export type Episode_Id_Operator = {
  equals?: InputMaybe<Scalars['Int']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  greater_than?: InputMaybe<Scalars['Int']['input']>;
  greater_than_equal?: InputMaybe<Scalars['Int']['input']>;
  less_than?: InputMaybe<Scalars['Int']['input']>;
  less_than_equal?: InputMaybe<Scalars['Int']['input']>;
  not_equals?: InputMaybe<Scalars['Int']['input']>;
};

export type Episode_ReleaseDate_Operator = {
  equals?: InputMaybe<Scalars['DateTime']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  greater_than?: InputMaybe<Scalars['DateTime']['input']>;
  greater_than_equal?: InputMaybe<Scalars['DateTime']['input']>;
  less_than?: InputMaybe<Scalars['DateTime']['input']>;
  less_than_equal?: InputMaybe<Scalars['DateTime']['input']>;
  like?: InputMaybe<Scalars['DateTime']['input']>;
  not_equals?: InputMaybe<Scalars['DateTime']['input']>;
};

export type Episode_Season_Operator = {
  all?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>;
  equals?: InputMaybe<Scalars['JSON']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>;
  not_equals?: InputMaybe<Scalars['JSON']['input']>;
  not_in?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>;
};

export type Episode_Title_Operator = {
  all?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  contains?: InputMaybe<Scalars['String']['input']>;
  equals?: InputMaybe<Scalars['String']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  like?: InputMaybe<Scalars['String']['input']>;
  not_equals?: InputMaybe<Scalars['String']['input']>;
  not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type Episode_UpdatedAt_Operator = {
  equals?: InputMaybe<Scalars['DateTime']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  greater_than?: InputMaybe<Scalars['DateTime']['input']>;
  greater_than_equal?: InputMaybe<Scalars['DateTime']['input']>;
  less_than?: InputMaybe<Scalars['DateTime']['input']>;
  less_than_equal?: InputMaybe<Scalars['DateTime']['input']>;
  like?: InputMaybe<Scalars['DateTime']['input']>;
  not_equals?: InputMaybe<Scalars['DateTime']['input']>;
};

export type Episode_Where = {
  AND?: InputMaybe<Array<InputMaybe<Episode_Where_And>>>;
  OR?: InputMaybe<Array<InputMaybe<Episode_Where_Or>>>;
  createdAt?: InputMaybe<Episode_CreatedAt_Operator>;
  description?: InputMaybe<Episode_Description_Operator>;
  duration?: InputMaybe<Episode_Duration_Operator>;
  episodeNumber?: InputMaybe<Episode_EpisodeNumber_Operator>;
  id?: InputMaybe<Episode_Id_Operator>;
  releaseDate?: InputMaybe<Episode_ReleaseDate_Operator>;
  season?: InputMaybe<Episode_Season_Operator>;
  title?: InputMaybe<Episode_Title_Operator>;
  updatedAt?: InputMaybe<Episode_UpdatedAt_Operator>;
};

export type Episode_Where_And = {
  AND?: InputMaybe<Array<InputMaybe<Episode_Where_And>>>;
  OR?: InputMaybe<Array<InputMaybe<Episode_Where_Or>>>;
  createdAt?: InputMaybe<Episode_CreatedAt_Operator>;
  description?: InputMaybe<Episode_Description_Operator>;
  duration?: InputMaybe<Episode_Duration_Operator>;
  episodeNumber?: InputMaybe<Episode_EpisodeNumber_Operator>;
  id?: InputMaybe<Episode_Id_Operator>;
  releaseDate?: InputMaybe<Episode_ReleaseDate_Operator>;
  season?: InputMaybe<Episode_Season_Operator>;
  title?: InputMaybe<Episode_Title_Operator>;
  updatedAt?: InputMaybe<Episode_UpdatedAt_Operator>;
};

export type Episode_Where_Or = {
  AND?: InputMaybe<Array<InputMaybe<Episode_Where_And>>>;
  OR?: InputMaybe<Array<InputMaybe<Episode_Where_Or>>>;
  createdAt?: InputMaybe<Episode_CreatedAt_Operator>;
  description?: InputMaybe<Episode_Description_Operator>;
  duration?: InputMaybe<Episode_Duration_Operator>;
  episodeNumber?: InputMaybe<Episode_EpisodeNumber_Operator>;
  id?: InputMaybe<Episode_Id_Operator>;
  releaseDate?: InputMaybe<Episode_ReleaseDate_Operator>;
  season?: InputMaybe<Episode_Season_Operator>;
  title?: InputMaybe<Episode_Title_Operator>;
  updatedAt?: InputMaybe<Episode_UpdatedAt_Operator>;
};

export type Episodes = {
  __typename?: 'Episodes';
  docs: Array<Episode>;
  hasNextPage: Scalars['Boolean']['output'];
  hasPrevPage: Scalars['Boolean']['output'];
  limit: Scalars['Int']['output'];
  nextPage?: Maybe<Scalars['Int']['output']>;
  offset?: Maybe<Scalars['Int']['output']>;
  page: Scalars['Int']['output'];
  pagingCounter: Scalars['Int']['output'];
  prevPage?: Maybe<Scalars['Int']['output']>;
  totalDocs: Scalars['Int']['output'];
  totalPages: Scalars['Int']['output'];
};

export type EpisodesCreateAccess = {
  __typename?: 'EpisodesCreateAccess';
  permission: Scalars['Boolean']['output'];
  where?: Maybe<Scalars['JSONObject']['output']>;
};

export type EpisodesCreateDocAccess = {
  __typename?: 'EpisodesCreateDocAccess';
  permission: Scalars['Boolean']['output'];
  where?: Maybe<Scalars['JSONObject']['output']>;
};

export type EpisodesDeleteAccess = {
  __typename?: 'EpisodesDeleteAccess';
  permission: Scalars['Boolean']['output'];
  where?: Maybe<Scalars['JSONObject']['output']>;
};

export type EpisodesDeleteDocAccess = {
  __typename?: 'EpisodesDeleteDocAccess';
  permission: Scalars['Boolean']['output'];
  where?: Maybe<Scalars['JSONObject']['output']>;
};

export type EpisodesDocAccessFields = {
  __typename?: 'EpisodesDocAccessFields';
  createdAt?: Maybe<EpisodesDocAccessFields_CreatedAt>;
  description?: Maybe<EpisodesDocAccessFields_Description>;
  duration?: Maybe<EpisodesDocAccessFields_Duration>;
  episodeNumber?: Maybe<EpisodesDocAccessFields_EpisodeNumber>;
  releaseDate?: Maybe<EpisodesDocAccessFields_ReleaseDate>;
  season?: Maybe<EpisodesDocAccessFields_Season>;
  title?: Maybe<EpisodesDocAccessFields_Title>;
  updatedAt?: Maybe<EpisodesDocAccessFields_UpdatedAt>;
};

export type EpisodesDocAccessFields_CreatedAt = {
  __typename?: 'EpisodesDocAccessFields_createdAt';
  create?: Maybe<EpisodesDocAccessFields_CreatedAt_Create>;
  delete?: Maybe<EpisodesDocAccessFields_CreatedAt_Delete>;
  read?: Maybe<EpisodesDocAccessFields_CreatedAt_Read>;
  update?: Maybe<EpisodesDocAccessFields_CreatedAt_Update>;
};

export type EpisodesDocAccessFields_CreatedAt_Create = {
  __typename?: 'EpisodesDocAccessFields_createdAt_Create';
  permission: Scalars['Boolean']['output'];
};

export type EpisodesDocAccessFields_CreatedAt_Delete = {
  __typename?: 'EpisodesDocAccessFields_createdAt_Delete';
  permission: Scalars['Boolean']['output'];
};

export type EpisodesDocAccessFields_CreatedAt_Read = {
  __typename?: 'EpisodesDocAccessFields_createdAt_Read';
  permission: Scalars['Boolean']['output'];
};

export type EpisodesDocAccessFields_CreatedAt_Update = {
  __typename?: 'EpisodesDocAccessFields_createdAt_Update';
  permission: Scalars['Boolean']['output'];
};

export type EpisodesDocAccessFields_Description = {
  __typename?: 'EpisodesDocAccessFields_description';
  create?: Maybe<EpisodesDocAccessFields_Description_Create>;
  delete?: Maybe<EpisodesDocAccessFields_Description_Delete>;
  read?: Maybe<EpisodesDocAccessFields_Description_Read>;
  update?: Maybe<EpisodesDocAccessFields_Description_Update>;
};

export type EpisodesDocAccessFields_Description_Create = {
  __typename?: 'EpisodesDocAccessFields_description_Create';
  permission: Scalars['Boolean']['output'];
};

export type EpisodesDocAccessFields_Description_Delete = {
  __typename?: 'EpisodesDocAccessFields_description_Delete';
  permission: Scalars['Boolean']['output'];
};

export type EpisodesDocAccessFields_Description_Read = {
  __typename?: 'EpisodesDocAccessFields_description_Read';
  permission: Scalars['Boolean']['output'];
};

export type EpisodesDocAccessFields_Description_Update = {
  __typename?: 'EpisodesDocAccessFields_description_Update';
  permission: Scalars['Boolean']['output'];
};

export type EpisodesDocAccessFields_Duration = {
  __typename?: 'EpisodesDocAccessFields_duration';
  create?: Maybe<EpisodesDocAccessFields_Duration_Create>;
  delete?: Maybe<EpisodesDocAccessFields_Duration_Delete>;
  read?: Maybe<EpisodesDocAccessFields_Duration_Read>;
  update?: Maybe<EpisodesDocAccessFields_Duration_Update>;
};

export type EpisodesDocAccessFields_Duration_Create = {
  __typename?: 'EpisodesDocAccessFields_duration_Create';
  permission: Scalars['Boolean']['output'];
};

export type EpisodesDocAccessFields_Duration_Delete = {
  __typename?: 'EpisodesDocAccessFields_duration_Delete';
  permission: Scalars['Boolean']['output'];
};

export type EpisodesDocAccessFields_Duration_Read = {
  __typename?: 'EpisodesDocAccessFields_duration_Read';
  permission: Scalars['Boolean']['output'];
};

export type EpisodesDocAccessFields_Duration_Update = {
  __typename?: 'EpisodesDocAccessFields_duration_Update';
  permission: Scalars['Boolean']['output'];
};

export type EpisodesDocAccessFields_EpisodeNumber = {
  __typename?: 'EpisodesDocAccessFields_episodeNumber';
  create?: Maybe<EpisodesDocAccessFields_EpisodeNumber_Create>;
  delete?: Maybe<EpisodesDocAccessFields_EpisodeNumber_Delete>;
  read?: Maybe<EpisodesDocAccessFields_EpisodeNumber_Read>;
  update?: Maybe<EpisodesDocAccessFields_EpisodeNumber_Update>;
};

export type EpisodesDocAccessFields_EpisodeNumber_Create = {
  __typename?: 'EpisodesDocAccessFields_episodeNumber_Create';
  permission: Scalars['Boolean']['output'];
};

export type EpisodesDocAccessFields_EpisodeNumber_Delete = {
  __typename?: 'EpisodesDocAccessFields_episodeNumber_Delete';
  permission: Scalars['Boolean']['output'];
};

export type EpisodesDocAccessFields_EpisodeNumber_Read = {
  __typename?: 'EpisodesDocAccessFields_episodeNumber_Read';
  permission: Scalars['Boolean']['output'];
};

export type EpisodesDocAccessFields_EpisodeNumber_Update = {
  __typename?: 'EpisodesDocAccessFields_episodeNumber_Update';
  permission: Scalars['Boolean']['output'];
};

export type EpisodesDocAccessFields_ReleaseDate = {
  __typename?: 'EpisodesDocAccessFields_releaseDate';
  create?: Maybe<EpisodesDocAccessFields_ReleaseDate_Create>;
  delete?: Maybe<EpisodesDocAccessFields_ReleaseDate_Delete>;
  read?: Maybe<EpisodesDocAccessFields_ReleaseDate_Read>;
  update?: Maybe<EpisodesDocAccessFields_ReleaseDate_Update>;
};

export type EpisodesDocAccessFields_ReleaseDate_Create = {
  __typename?: 'EpisodesDocAccessFields_releaseDate_Create';
  permission: Scalars['Boolean']['output'];
};

export type EpisodesDocAccessFields_ReleaseDate_Delete = {
  __typename?: 'EpisodesDocAccessFields_releaseDate_Delete';
  permission: Scalars['Boolean']['output'];
};

export type EpisodesDocAccessFields_ReleaseDate_Read = {
  __typename?: 'EpisodesDocAccessFields_releaseDate_Read';
  permission: Scalars['Boolean']['output'];
};

export type EpisodesDocAccessFields_ReleaseDate_Update = {
  __typename?: 'EpisodesDocAccessFields_releaseDate_Update';
  permission: Scalars['Boolean']['output'];
};

export type EpisodesDocAccessFields_Season = {
  __typename?: 'EpisodesDocAccessFields_season';
  create?: Maybe<EpisodesDocAccessFields_Season_Create>;
  delete?: Maybe<EpisodesDocAccessFields_Season_Delete>;
  read?: Maybe<EpisodesDocAccessFields_Season_Read>;
  update?: Maybe<EpisodesDocAccessFields_Season_Update>;
};

export type EpisodesDocAccessFields_Season_Create = {
  __typename?: 'EpisodesDocAccessFields_season_Create';
  permission: Scalars['Boolean']['output'];
};

export type EpisodesDocAccessFields_Season_Delete = {
  __typename?: 'EpisodesDocAccessFields_season_Delete';
  permission: Scalars['Boolean']['output'];
};

export type EpisodesDocAccessFields_Season_Read = {
  __typename?: 'EpisodesDocAccessFields_season_Read';
  permission: Scalars['Boolean']['output'];
};

export type EpisodesDocAccessFields_Season_Update = {
  __typename?: 'EpisodesDocAccessFields_season_Update';
  permission: Scalars['Boolean']['output'];
};

export type EpisodesDocAccessFields_Title = {
  __typename?: 'EpisodesDocAccessFields_title';
  create?: Maybe<EpisodesDocAccessFields_Title_Create>;
  delete?: Maybe<EpisodesDocAccessFields_Title_Delete>;
  read?: Maybe<EpisodesDocAccessFields_Title_Read>;
  update?: Maybe<EpisodesDocAccessFields_Title_Update>;
};

export type EpisodesDocAccessFields_Title_Create = {
  __typename?: 'EpisodesDocAccessFields_title_Create';
  permission: Scalars['Boolean']['output'];
};

export type EpisodesDocAccessFields_Title_Delete = {
  __typename?: 'EpisodesDocAccessFields_title_Delete';
  permission: Scalars['Boolean']['output'];
};

export type EpisodesDocAccessFields_Title_Read = {
  __typename?: 'EpisodesDocAccessFields_title_Read';
  permission: Scalars['Boolean']['output'];
};

export type EpisodesDocAccessFields_Title_Update = {
  __typename?: 'EpisodesDocAccessFields_title_Update';
  permission: Scalars['Boolean']['output'];
};

export type EpisodesDocAccessFields_UpdatedAt = {
  __typename?: 'EpisodesDocAccessFields_updatedAt';
  create?: Maybe<EpisodesDocAccessFields_UpdatedAt_Create>;
  delete?: Maybe<EpisodesDocAccessFields_UpdatedAt_Delete>;
  read?: Maybe<EpisodesDocAccessFields_UpdatedAt_Read>;
  update?: Maybe<EpisodesDocAccessFields_UpdatedAt_Update>;
};

export type EpisodesDocAccessFields_UpdatedAt_Create = {
  __typename?: 'EpisodesDocAccessFields_updatedAt_Create';
  permission: Scalars['Boolean']['output'];
};

export type EpisodesDocAccessFields_UpdatedAt_Delete = {
  __typename?: 'EpisodesDocAccessFields_updatedAt_Delete';
  permission: Scalars['Boolean']['output'];
};

export type EpisodesDocAccessFields_UpdatedAt_Read = {
  __typename?: 'EpisodesDocAccessFields_updatedAt_Read';
  permission: Scalars['Boolean']['output'];
};

export type EpisodesDocAccessFields_UpdatedAt_Update = {
  __typename?: 'EpisodesDocAccessFields_updatedAt_Update';
  permission: Scalars['Boolean']['output'];
};

export type EpisodesFields = {
  __typename?: 'EpisodesFields';
  createdAt?: Maybe<EpisodesFields_CreatedAt>;
  description?: Maybe<EpisodesFields_Description>;
  duration?: Maybe<EpisodesFields_Duration>;
  episodeNumber?: Maybe<EpisodesFields_EpisodeNumber>;
  releaseDate?: Maybe<EpisodesFields_ReleaseDate>;
  season?: Maybe<EpisodesFields_Season>;
  title?: Maybe<EpisodesFields_Title>;
  updatedAt?: Maybe<EpisodesFields_UpdatedAt>;
};

export type EpisodesFields_CreatedAt = {
  __typename?: 'EpisodesFields_createdAt';
  create?: Maybe<EpisodesFields_CreatedAt_Create>;
  delete?: Maybe<EpisodesFields_CreatedAt_Delete>;
  read?: Maybe<EpisodesFields_CreatedAt_Read>;
  update?: Maybe<EpisodesFields_CreatedAt_Update>;
};

export type EpisodesFields_CreatedAt_Create = {
  __typename?: 'EpisodesFields_createdAt_Create';
  permission: Scalars['Boolean']['output'];
};

export type EpisodesFields_CreatedAt_Delete = {
  __typename?: 'EpisodesFields_createdAt_Delete';
  permission: Scalars['Boolean']['output'];
};

export type EpisodesFields_CreatedAt_Read = {
  __typename?: 'EpisodesFields_createdAt_Read';
  permission: Scalars['Boolean']['output'];
};

export type EpisodesFields_CreatedAt_Update = {
  __typename?: 'EpisodesFields_createdAt_Update';
  permission: Scalars['Boolean']['output'];
};

export type EpisodesFields_Description = {
  __typename?: 'EpisodesFields_description';
  create?: Maybe<EpisodesFields_Description_Create>;
  delete?: Maybe<EpisodesFields_Description_Delete>;
  read?: Maybe<EpisodesFields_Description_Read>;
  update?: Maybe<EpisodesFields_Description_Update>;
};

export type EpisodesFields_Description_Create = {
  __typename?: 'EpisodesFields_description_Create';
  permission: Scalars['Boolean']['output'];
};

export type EpisodesFields_Description_Delete = {
  __typename?: 'EpisodesFields_description_Delete';
  permission: Scalars['Boolean']['output'];
};

export type EpisodesFields_Description_Read = {
  __typename?: 'EpisodesFields_description_Read';
  permission: Scalars['Boolean']['output'];
};

export type EpisodesFields_Description_Update = {
  __typename?: 'EpisodesFields_description_Update';
  permission: Scalars['Boolean']['output'];
};

export type EpisodesFields_Duration = {
  __typename?: 'EpisodesFields_duration';
  create?: Maybe<EpisodesFields_Duration_Create>;
  delete?: Maybe<EpisodesFields_Duration_Delete>;
  read?: Maybe<EpisodesFields_Duration_Read>;
  update?: Maybe<EpisodesFields_Duration_Update>;
};

export type EpisodesFields_Duration_Create = {
  __typename?: 'EpisodesFields_duration_Create';
  permission: Scalars['Boolean']['output'];
};

export type EpisodesFields_Duration_Delete = {
  __typename?: 'EpisodesFields_duration_Delete';
  permission: Scalars['Boolean']['output'];
};

export type EpisodesFields_Duration_Read = {
  __typename?: 'EpisodesFields_duration_Read';
  permission: Scalars['Boolean']['output'];
};

export type EpisodesFields_Duration_Update = {
  __typename?: 'EpisodesFields_duration_Update';
  permission: Scalars['Boolean']['output'];
};

export type EpisodesFields_EpisodeNumber = {
  __typename?: 'EpisodesFields_episodeNumber';
  create?: Maybe<EpisodesFields_EpisodeNumber_Create>;
  delete?: Maybe<EpisodesFields_EpisodeNumber_Delete>;
  read?: Maybe<EpisodesFields_EpisodeNumber_Read>;
  update?: Maybe<EpisodesFields_EpisodeNumber_Update>;
};

export type EpisodesFields_EpisodeNumber_Create = {
  __typename?: 'EpisodesFields_episodeNumber_Create';
  permission: Scalars['Boolean']['output'];
};

export type EpisodesFields_EpisodeNumber_Delete = {
  __typename?: 'EpisodesFields_episodeNumber_Delete';
  permission: Scalars['Boolean']['output'];
};

export type EpisodesFields_EpisodeNumber_Read = {
  __typename?: 'EpisodesFields_episodeNumber_Read';
  permission: Scalars['Boolean']['output'];
};

export type EpisodesFields_EpisodeNumber_Update = {
  __typename?: 'EpisodesFields_episodeNumber_Update';
  permission: Scalars['Boolean']['output'];
};

export type EpisodesFields_ReleaseDate = {
  __typename?: 'EpisodesFields_releaseDate';
  create?: Maybe<EpisodesFields_ReleaseDate_Create>;
  delete?: Maybe<EpisodesFields_ReleaseDate_Delete>;
  read?: Maybe<EpisodesFields_ReleaseDate_Read>;
  update?: Maybe<EpisodesFields_ReleaseDate_Update>;
};

export type EpisodesFields_ReleaseDate_Create = {
  __typename?: 'EpisodesFields_releaseDate_Create';
  permission: Scalars['Boolean']['output'];
};

export type EpisodesFields_ReleaseDate_Delete = {
  __typename?: 'EpisodesFields_releaseDate_Delete';
  permission: Scalars['Boolean']['output'];
};

export type EpisodesFields_ReleaseDate_Read = {
  __typename?: 'EpisodesFields_releaseDate_Read';
  permission: Scalars['Boolean']['output'];
};

export type EpisodesFields_ReleaseDate_Update = {
  __typename?: 'EpisodesFields_releaseDate_Update';
  permission: Scalars['Boolean']['output'];
};

export type EpisodesFields_Season = {
  __typename?: 'EpisodesFields_season';
  create?: Maybe<EpisodesFields_Season_Create>;
  delete?: Maybe<EpisodesFields_Season_Delete>;
  read?: Maybe<EpisodesFields_Season_Read>;
  update?: Maybe<EpisodesFields_Season_Update>;
};

export type EpisodesFields_Season_Create = {
  __typename?: 'EpisodesFields_season_Create';
  permission: Scalars['Boolean']['output'];
};

export type EpisodesFields_Season_Delete = {
  __typename?: 'EpisodesFields_season_Delete';
  permission: Scalars['Boolean']['output'];
};

export type EpisodesFields_Season_Read = {
  __typename?: 'EpisodesFields_season_Read';
  permission: Scalars['Boolean']['output'];
};

export type EpisodesFields_Season_Update = {
  __typename?: 'EpisodesFields_season_Update';
  permission: Scalars['Boolean']['output'];
};

export type EpisodesFields_Title = {
  __typename?: 'EpisodesFields_title';
  create?: Maybe<EpisodesFields_Title_Create>;
  delete?: Maybe<EpisodesFields_Title_Delete>;
  read?: Maybe<EpisodesFields_Title_Read>;
  update?: Maybe<EpisodesFields_Title_Update>;
};

export type EpisodesFields_Title_Create = {
  __typename?: 'EpisodesFields_title_Create';
  permission: Scalars['Boolean']['output'];
};

export type EpisodesFields_Title_Delete = {
  __typename?: 'EpisodesFields_title_Delete';
  permission: Scalars['Boolean']['output'];
};

export type EpisodesFields_Title_Read = {
  __typename?: 'EpisodesFields_title_Read';
  permission: Scalars['Boolean']['output'];
};

export type EpisodesFields_Title_Update = {
  __typename?: 'EpisodesFields_title_Update';
  permission: Scalars['Boolean']['output'];
};

export type EpisodesFields_UpdatedAt = {
  __typename?: 'EpisodesFields_updatedAt';
  create?: Maybe<EpisodesFields_UpdatedAt_Create>;
  delete?: Maybe<EpisodesFields_UpdatedAt_Delete>;
  read?: Maybe<EpisodesFields_UpdatedAt_Read>;
  update?: Maybe<EpisodesFields_UpdatedAt_Update>;
};

export type EpisodesFields_UpdatedAt_Create = {
  __typename?: 'EpisodesFields_updatedAt_Create';
  permission: Scalars['Boolean']['output'];
};

export type EpisodesFields_UpdatedAt_Delete = {
  __typename?: 'EpisodesFields_updatedAt_Delete';
  permission: Scalars['Boolean']['output'];
};

export type EpisodesFields_UpdatedAt_Read = {
  __typename?: 'EpisodesFields_updatedAt_Read';
  permission: Scalars['Boolean']['output'];
};

export type EpisodesFields_UpdatedAt_Update = {
  __typename?: 'EpisodesFields_updatedAt_Update';
  permission: Scalars['Boolean']['output'];
};

export type EpisodesReadAccess = {
  __typename?: 'EpisodesReadAccess';
  permission: Scalars['Boolean']['output'];
  where?: Maybe<Scalars['JSONObject']['output']>;
};

export type EpisodesReadDocAccess = {
  __typename?: 'EpisodesReadDocAccess';
  permission: Scalars['Boolean']['output'];
  where?: Maybe<Scalars['JSONObject']['output']>;
};

export type EpisodesUpdateAccess = {
  __typename?: 'EpisodesUpdateAccess';
  permission: Scalars['Boolean']['output'];
  where?: Maybe<Scalars['JSONObject']['output']>;
};

export type EpisodesUpdateDocAccess = {
  __typename?: 'EpisodesUpdateDocAccess';
  permission: Scalars['Boolean']['output'];
  where?: Maybe<Scalars['JSONObject']['output']>;
};

export type Favorite = {
  __typename?: 'Favorite';
  content?: Maybe<Content>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['Int']['output'];
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  user?: Maybe<User>;
};


export type FavoriteContentArgs = {
  draft?: InputMaybe<Scalars['Boolean']['input']>;
};

export type Favorite_Content_Operator = {
  all?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>;
  equals?: InputMaybe<Scalars['JSON']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>;
  not_equals?: InputMaybe<Scalars['JSON']['input']>;
  not_in?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>;
};

export type Favorite_CreatedAt_Operator = {
  equals?: InputMaybe<Scalars['DateTime']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  greater_than?: InputMaybe<Scalars['DateTime']['input']>;
  greater_than_equal?: InputMaybe<Scalars['DateTime']['input']>;
  less_than?: InputMaybe<Scalars['DateTime']['input']>;
  less_than_equal?: InputMaybe<Scalars['DateTime']['input']>;
  like?: InputMaybe<Scalars['DateTime']['input']>;
  not_equals?: InputMaybe<Scalars['DateTime']['input']>;
};

export type Favorite_Id_Operator = {
  equals?: InputMaybe<Scalars['Int']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  greater_than?: InputMaybe<Scalars['Int']['input']>;
  greater_than_equal?: InputMaybe<Scalars['Int']['input']>;
  less_than?: InputMaybe<Scalars['Int']['input']>;
  less_than_equal?: InputMaybe<Scalars['Int']['input']>;
  not_equals?: InputMaybe<Scalars['Int']['input']>;
};

export type Favorite_UpdatedAt_Operator = {
  equals?: InputMaybe<Scalars['DateTime']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  greater_than?: InputMaybe<Scalars['DateTime']['input']>;
  greater_than_equal?: InputMaybe<Scalars['DateTime']['input']>;
  less_than?: InputMaybe<Scalars['DateTime']['input']>;
  less_than_equal?: InputMaybe<Scalars['DateTime']['input']>;
  like?: InputMaybe<Scalars['DateTime']['input']>;
  not_equals?: InputMaybe<Scalars['DateTime']['input']>;
};

export type Favorite_User_Operator = {
  all?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>;
  equals?: InputMaybe<Scalars['JSON']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>;
  not_equals?: InputMaybe<Scalars['JSON']['input']>;
  not_in?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>;
};

export type Favorite_Where = {
  AND?: InputMaybe<Array<InputMaybe<Favorite_Where_And>>>;
  OR?: InputMaybe<Array<InputMaybe<Favorite_Where_Or>>>;
  content?: InputMaybe<Favorite_Content_Operator>;
  createdAt?: InputMaybe<Favorite_CreatedAt_Operator>;
  id?: InputMaybe<Favorite_Id_Operator>;
  updatedAt?: InputMaybe<Favorite_UpdatedAt_Operator>;
  user?: InputMaybe<Favorite_User_Operator>;
};

export type Favorite_Where_And = {
  AND?: InputMaybe<Array<InputMaybe<Favorite_Where_And>>>;
  OR?: InputMaybe<Array<InputMaybe<Favorite_Where_Or>>>;
  content?: InputMaybe<Favorite_Content_Operator>;
  createdAt?: InputMaybe<Favorite_CreatedAt_Operator>;
  id?: InputMaybe<Favorite_Id_Operator>;
  updatedAt?: InputMaybe<Favorite_UpdatedAt_Operator>;
  user?: InputMaybe<Favorite_User_Operator>;
};

export type Favorite_Where_Or = {
  AND?: InputMaybe<Array<InputMaybe<Favorite_Where_And>>>;
  OR?: InputMaybe<Array<InputMaybe<Favorite_Where_Or>>>;
  content?: InputMaybe<Favorite_Content_Operator>;
  createdAt?: InputMaybe<Favorite_CreatedAt_Operator>;
  id?: InputMaybe<Favorite_Id_Operator>;
  updatedAt?: InputMaybe<Favorite_UpdatedAt_Operator>;
  user?: InputMaybe<Favorite_User_Operator>;
};

export type Favorites = {
  __typename?: 'Favorites';
  docs: Array<Favorite>;
  hasNextPage: Scalars['Boolean']['output'];
  hasPrevPage: Scalars['Boolean']['output'];
  limit: Scalars['Int']['output'];
  nextPage?: Maybe<Scalars['Int']['output']>;
  offset?: Maybe<Scalars['Int']['output']>;
  page: Scalars['Int']['output'];
  pagingCounter: Scalars['Int']['output'];
  prevPage?: Maybe<Scalars['Int']['output']>;
  totalDocs: Scalars['Int']['output'];
  totalPages: Scalars['Int']['output'];
};

export type FavoritesCreateAccess = {
  __typename?: 'FavoritesCreateAccess';
  permission: Scalars['Boolean']['output'];
  where?: Maybe<Scalars['JSONObject']['output']>;
};

export type FavoritesCreateDocAccess = {
  __typename?: 'FavoritesCreateDocAccess';
  permission: Scalars['Boolean']['output'];
  where?: Maybe<Scalars['JSONObject']['output']>;
};

export type FavoritesDeleteAccess = {
  __typename?: 'FavoritesDeleteAccess';
  permission: Scalars['Boolean']['output'];
  where?: Maybe<Scalars['JSONObject']['output']>;
};

export type FavoritesDeleteDocAccess = {
  __typename?: 'FavoritesDeleteDocAccess';
  permission: Scalars['Boolean']['output'];
  where?: Maybe<Scalars['JSONObject']['output']>;
};

export type FavoritesDocAccessFields = {
  __typename?: 'FavoritesDocAccessFields';
  content?: Maybe<FavoritesDocAccessFields_Content>;
  createdAt?: Maybe<FavoritesDocAccessFields_CreatedAt>;
  updatedAt?: Maybe<FavoritesDocAccessFields_UpdatedAt>;
  user?: Maybe<FavoritesDocAccessFields_User>;
};

export type FavoritesDocAccessFields_Content = {
  __typename?: 'FavoritesDocAccessFields_content';
  create?: Maybe<FavoritesDocAccessFields_Content_Create>;
  delete?: Maybe<FavoritesDocAccessFields_Content_Delete>;
  read?: Maybe<FavoritesDocAccessFields_Content_Read>;
  update?: Maybe<FavoritesDocAccessFields_Content_Update>;
};

export type FavoritesDocAccessFields_Content_Create = {
  __typename?: 'FavoritesDocAccessFields_content_Create';
  permission: Scalars['Boolean']['output'];
};

export type FavoritesDocAccessFields_Content_Delete = {
  __typename?: 'FavoritesDocAccessFields_content_Delete';
  permission: Scalars['Boolean']['output'];
};

export type FavoritesDocAccessFields_Content_Read = {
  __typename?: 'FavoritesDocAccessFields_content_Read';
  permission: Scalars['Boolean']['output'];
};

export type FavoritesDocAccessFields_Content_Update = {
  __typename?: 'FavoritesDocAccessFields_content_Update';
  permission: Scalars['Boolean']['output'];
};

export type FavoritesDocAccessFields_CreatedAt = {
  __typename?: 'FavoritesDocAccessFields_createdAt';
  create?: Maybe<FavoritesDocAccessFields_CreatedAt_Create>;
  delete?: Maybe<FavoritesDocAccessFields_CreatedAt_Delete>;
  read?: Maybe<FavoritesDocAccessFields_CreatedAt_Read>;
  update?: Maybe<FavoritesDocAccessFields_CreatedAt_Update>;
};

export type FavoritesDocAccessFields_CreatedAt_Create = {
  __typename?: 'FavoritesDocAccessFields_createdAt_Create';
  permission: Scalars['Boolean']['output'];
};

export type FavoritesDocAccessFields_CreatedAt_Delete = {
  __typename?: 'FavoritesDocAccessFields_createdAt_Delete';
  permission: Scalars['Boolean']['output'];
};

export type FavoritesDocAccessFields_CreatedAt_Read = {
  __typename?: 'FavoritesDocAccessFields_createdAt_Read';
  permission: Scalars['Boolean']['output'];
};

export type FavoritesDocAccessFields_CreatedAt_Update = {
  __typename?: 'FavoritesDocAccessFields_createdAt_Update';
  permission: Scalars['Boolean']['output'];
};

export type FavoritesDocAccessFields_UpdatedAt = {
  __typename?: 'FavoritesDocAccessFields_updatedAt';
  create?: Maybe<FavoritesDocAccessFields_UpdatedAt_Create>;
  delete?: Maybe<FavoritesDocAccessFields_UpdatedAt_Delete>;
  read?: Maybe<FavoritesDocAccessFields_UpdatedAt_Read>;
  update?: Maybe<FavoritesDocAccessFields_UpdatedAt_Update>;
};

export type FavoritesDocAccessFields_UpdatedAt_Create = {
  __typename?: 'FavoritesDocAccessFields_updatedAt_Create';
  permission: Scalars['Boolean']['output'];
};

export type FavoritesDocAccessFields_UpdatedAt_Delete = {
  __typename?: 'FavoritesDocAccessFields_updatedAt_Delete';
  permission: Scalars['Boolean']['output'];
};

export type FavoritesDocAccessFields_UpdatedAt_Read = {
  __typename?: 'FavoritesDocAccessFields_updatedAt_Read';
  permission: Scalars['Boolean']['output'];
};

export type FavoritesDocAccessFields_UpdatedAt_Update = {
  __typename?: 'FavoritesDocAccessFields_updatedAt_Update';
  permission: Scalars['Boolean']['output'];
};

export type FavoritesDocAccessFields_User = {
  __typename?: 'FavoritesDocAccessFields_user';
  create?: Maybe<FavoritesDocAccessFields_User_Create>;
  delete?: Maybe<FavoritesDocAccessFields_User_Delete>;
  read?: Maybe<FavoritesDocAccessFields_User_Read>;
  update?: Maybe<FavoritesDocAccessFields_User_Update>;
};

export type FavoritesDocAccessFields_User_Create = {
  __typename?: 'FavoritesDocAccessFields_user_Create';
  permission: Scalars['Boolean']['output'];
};

export type FavoritesDocAccessFields_User_Delete = {
  __typename?: 'FavoritesDocAccessFields_user_Delete';
  permission: Scalars['Boolean']['output'];
};

export type FavoritesDocAccessFields_User_Read = {
  __typename?: 'FavoritesDocAccessFields_user_Read';
  permission: Scalars['Boolean']['output'];
};

export type FavoritesDocAccessFields_User_Update = {
  __typename?: 'FavoritesDocAccessFields_user_Update';
  permission: Scalars['Boolean']['output'];
};

export type FavoritesFields = {
  __typename?: 'FavoritesFields';
  content?: Maybe<FavoritesFields_Content>;
  createdAt?: Maybe<FavoritesFields_CreatedAt>;
  updatedAt?: Maybe<FavoritesFields_UpdatedAt>;
  user?: Maybe<FavoritesFields_User>;
};

export type FavoritesFields_Content = {
  __typename?: 'FavoritesFields_content';
  create?: Maybe<FavoritesFields_Content_Create>;
  delete?: Maybe<FavoritesFields_Content_Delete>;
  read?: Maybe<FavoritesFields_Content_Read>;
  update?: Maybe<FavoritesFields_Content_Update>;
};

export type FavoritesFields_Content_Create = {
  __typename?: 'FavoritesFields_content_Create';
  permission: Scalars['Boolean']['output'];
};

export type FavoritesFields_Content_Delete = {
  __typename?: 'FavoritesFields_content_Delete';
  permission: Scalars['Boolean']['output'];
};

export type FavoritesFields_Content_Read = {
  __typename?: 'FavoritesFields_content_Read';
  permission: Scalars['Boolean']['output'];
};

export type FavoritesFields_Content_Update = {
  __typename?: 'FavoritesFields_content_Update';
  permission: Scalars['Boolean']['output'];
};

export type FavoritesFields_CreatedAt = {
  __typename?: 'FavoritesFields_createdAt';
  create?: Maybe<FavoritesFields_CreatedAt_Create>;
  delete?: Maybe<FavoritesFields_CreatedAt_Delete>;
  read?: Maybe<FavoritesFields_CreatedAt_Read>;
  update?: Maybe<FavoritesFields_CreatedAt_Update>;
};

export type FavoritesFields_CreatedAt_Create = {
  __typename?: 'FavoritesFields_createdAt_Create';
  permission: Scalars['Boolean']['output'];
};

export type FavoritesFields_CreatedAt_Delete = {
  __typename?: 'FavoritesFields_createdAt_Delete';
  permission: Scalars['Boolean']['output'];
};

export type FavoritesFields_CreatedAt_Read = {
  __typename?: 'FavoritesFields_createdAt_Read';
  permission: Scalars['Boolean']['output'];
};

export type FavoritesFields_CreatedAt_Update = {
  __typename?: 'FavoritesFields_createdAt_Update';
  permission: Scalars['Boolean']['output'];
};

export type FavoritesFields_UpdatedAt = {
  __typename?: 'FavoritesFields_updatedAt';
  create?: Maybe<FavoritesFields_UpdatedAt_Create>;
  delete?: Maybe<FavoritesFields_UpdatedAt_Delete>;
  read?: Maybe<FavoritesFields_UpdatedAt_Read>;
  update?: Maybe<FavoritesFields_UpdatedAt_Update>;
};

export type FavoritesFields_UpdatedAt_Create = {
  __typename?: 'FavoritesFields_updatedAt_Create';
  permission: Scalars['Boolean']['output'];
};

export type FavoritesFields_UpdatedAt_Delete = {
  __typename?: 'FavoritesFields_updatedAt_Delete';
  permission: Scalars['Boolean']['output'];
};

export type FavoritesFields_UpdatedAt_Read = {
  __typename?: 'FavoritesFields_updatedAt_Read';
  permission: Scalars['Boolean']['output'];
};

export type FavoritesFields_UpdatedAt_Update = {
  __typename?: 'FavoritesFields_updatedAt_Update';
  permission: Scalars['Boolean']['output'];
};

export type FavoritesFields_User = {
  __typename?: 'FavoritesFields_user';
  create?: Maybe<FavoritesFields_User_Create>;
  delete?: Maybe<FavoritesFields_User_Delete>;
  read?: Maybe<FavoritesFields_User_Read>;
  update?: Maybe<FavoritesFields_User_Update>;
};

export type FavoritesFields_User_Create = {
  __typename?: 'FavoritesFields_user_Create';
  permission: Scalars['Boolean']['output'];
};

export type FavoritesFields_User_Delete = {
  __typename?: 'FavoritesFields_user_Delete';
  permission: Scalars['Boolean']['output'];
};

export type FavoritesFields_User_Read = {
  __typename?: 'FavoritesFields_user_Read';
  permission: Scalars['Boolean']['output'];
};

export type FavoritesFields_User_Update = {
  __typename?: 'FavoritesFields_user_Update';
  permission: Scalars['Boolean']['output'];
};

export type FavoritesReadAccess = {
  __typename?: 'FavoritesReadAccess';
  permission: Scalars['Boolean']['output'];
  where?: Maybe<Scalars['JSONObject']['output']>;
};

export type FavoritesReadDocAccess = {
  __typename?: 'FavoritesReadDocAccess';
  permission: Scalars['Boolean']['output'];
  where?: Maybe<Scalars['JSONObject']['output']>;
};

export type FavoritesUpdateAccess = {
  __typename?: 'FavoritesUpdateAccess';
  permission: Scalars['Boolean']['output'];
  where?: Maybe<Scalars['JSONObject']['output']>;
};

export type FavoritesUpdateDocAccess = {
  __typename?: 'FavoritesUpdateDocAccess';
  permission: Scalars['Boolean']['output'];
  where?: Maybe<Scalars['JSONObject']['output']>;
};

export type Genre = {
  __typename?: 'Genre';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['Int']['output'];
  slug: Scalars['String']['output'];
  title: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type Genre_CreatedAt_Operator = {
  equals?: InputMaybe<Scalars['DateTime']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  greater_than?: InputMaybe<Scalars['DateTime']['input']>;
  greater_than_equal?: InputMaybe<Scalars['DateTime']['input']>;
  less_than?: InputMaybe<Scalars['DateTime']['input']>;
  less_than_equal?: InputMaybe<Scalars['DateTime']['input']>;
  like?: InputMaybe<Scalars['DateTime']['input']>;
  not_equals?: InputMaybe<Scalars['DateTime']['input']>;
};

export type Genre_Id_Operator = {
  equals?: InputMaybe<Scalars['Int']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  greater_than?: InputMaybe<Scalars['Int']['input']>;
  greater_than_equal?: InputMaybe<Scalars['Int']['input']>;
  less_than?: InputMaybe<Scalars['Int']['input']>;
  less_than_equal?: InputMaybe<Scalars['Int']['input']>;
  not_equals?: InputMaybe<Scalars['Int']['input']>;
};

export type Genre_Slug_Operator = {
  all?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  contains?: InputMaybe<Scalars['String']['input']>;
  equals?: InputMaybe<Scalars['String']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  like?: InputMaybe<Scalars['String']['input']>;
  not_equals?: InputMaybe<Scalars['String']['input']>;
  not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type Genre_Title_Operator = {
  all?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  contains?: InputMaybe<Scalars['String']['input']>;
  equals?: InputMaybe<Scalars['String']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  like?: InputMaybe<Scalars['String']['input']>;
  not_equals?: InputMaybe<Scalars['String']['input']>;
  not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type Genre_UpdatedAt_Operator = {
  equals?: InputMaybe<Scalars['DateTime']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  greater_than?: InputMaybe<Scalars['DateTime']['input']>;
  greater_than_equal?: InputMaybe<Scalars['DateTime']['input']>;
  less_than?: InputMaybe<Scalars['DateTime']['input']>;
  less_than_equal?: InputMaybe<Scalars['DateTime']['input']>;
  like?: InputMaybe<Scalars['DateTime']['input']>;
  not_equals?: InputMaybe<Scalars['DateTime']['input']>;
};

export type Genre_Where = {
  AND?: InputMaybe<Array<InputMaybe<Genre_Where_And>>>;
  OR?: InputMaybe<Array<InputMaybe<Genre_Where_Or>>>;
  createdAt?: InputMaybe<Genre_CreatedAt_Operator>;
  id?: InputMaybe<Genre_Id_Operator>;
  slug?: InputMaybe<Genre_Slug_Operator>;
  title?: InputMaybe<Genre_Title_Operator>;
  updatedAt?: InputMaybe<Genre_UpdatedAt_Operator>;
};

export type Genre_Where_And = {
  AND?: InputMaybe<Array<InputMaybe<Genre_Where_And>>>;
  OR?: InputMaybe<Array<InputMaybe<Genre_Where_Or>>>;
  createdAt?: InputMaybe<Genre_CreatedAt_Operator>;
  id?: InputMaybe<Genre_Id_Operator>;
  slug?: InputMaybe<Genre_Slug_Operator>;
  title?: InputMaybe<Genre_Title_Operator>;
  updatedAt?: InputMaybe<Genre_UpdatedAt_Operator>;
};

export type Genre_Where_Or = {
  AND?: InputMaybe<Array<InputMaybe<Genre_Where_And>>>;
  OR?: InputMaybe<Array<InputMaybe<Genre_Where_Or>>>;
  createdAt?: InputMaybe<Genre_CreatedAt_Operator>;
  id?: InputMaybe<Genre_Id_Operator>;
  slug?: InputMaybe<Genre_Slug_Operator>;
  title?: InputMaybe<Genre_Title_Operator>;
  updatedAt?: InputMaybe<Genre_UpdatedAt_Operator>;
};

export type Genres = {
  __typename?: 'Genres';
  docs: Array<Genre>;
  hasNextPage: Scalars['Boolean']['output'];
  hasPrevPage: Scalars['Boolean']['output'];
  limit: Scalars['Int']['output'];
  nextPage?: Maybe<Scalars['Int']['output']>;
  offset?: Maybe<Scalars['Int']['output']>;
  page: Scalars['Int']['output'];
  pagingCounter: Scalars['Int']['output'];
  prevPage?: Maybe<Scalars['Int']['output']>;
  totalDocs: Scalars['Int']['output'];
  totalPages: Scalars['Int']['output'];
};

export type GenresCreateAccess = {
  __typename?: 'GenresCreateAccess';
  permission: Scalars['Boolean']['output'];
  where?: Maybe<Scalars['JSONObject']['output']>;
};

export type GenresCreateDocAccess = {
  __typename?: 'GenresCreateDocAccess';
  permission: Scalars['Boolean']['output'];
  where?: Maybe<Scalars['JSONObject']['output']>;
};

export type GenresDeleteAccess = {
  __typename?: 'GenresDeleteAccess';
  permission: Scalars['Boolean']['output'];
  where?: Maybe<Scalars['JSONObject']['output']>;
};

export type GenresDeleteDocAccess = {
  __typename?: 'GenresDeleteDocAccess';
  permission: Scalars['Boolean']['output'];
  where?: Maybe<Scalars['JSONObject']['output']>;
};

export type GenresDocAccessFields = {
  __typename?: 'GenresDocAccessFields';
  createdAt?: Maybe<GenresDocAccessFields_CreatedAt>;
  slug?: Maybe<GenresDocAccessFields_Slug>;
  title?: Maybe<GenresDocAccessFields_Title>;
  updatedAt?: Maybe<GenresDocAccessFields_UpdatedAt>;
};

export type GenresDocAccessFields_CreatedAt = {
  __typename?: 'GenresDocAccessFields_createdAt';
  create?: Maybe<GenresDocAccessFields_CreatedAt_Create>;
  delete?: Maybe<GenresDocAccessFields_CreatedAt_Delete>;
  read?: Maybe<GenresDocAccessFields_CreatedAt_Read>;
  update?: Maybe<GenresDocAccessFields_CreatedAt_Update>;
};

export type GenresDocAccessFields_CreatedAt_Create = {
  __typename?: 'GenresDocAccessFields_createdAt_Create';
  permission: Scalars['Boolean']['output'];
};

export type GenresDocAccessFields_CreatedAt_Delete = {
  __typename?: 'GenresDocAccessFields_createdAt_Delete';
  permission: Scalars['Boolean']['output'];
};

export type GenresDocAccessFields_CreatedAt_Read = {
  __typename?: 'GenresDocAccessFields_createdAt_Read';
  permission: Scalars['Boolean']['output'];
};

export type GenresDocAccessFields_CreatedAt_Update = {
  __typename?: 'GenresDocAccessFields_createdAt_Update';
  permission: Scalars['Boolean']['output'];
};

export type GenresDocAccessFields_Slug = {
  __typename?: 'GenresDocAccessFields_slug';
  create?: Maybe<GenresDocAccessFields_Slug_Create>;
  delete?: Maybe<GenresDocAccessFields_Slug_Delete>;
  read?: Maybe<GenresDocAccessFields_Slug_Read>;
  update?: Maybe<GenresDocAccessFields_Slug_Update>;
};

export type GenresDocAccessFields_Slug_Create = {
  __typename?: 'GenresDocAccessFields_slug_Create';
  permission: Scalars['Boolean']['output'];
};

export type GenresDocAccessFields_Slug_Delete = {
  __typename?: 'GenresDocAccessFields_slug_Delete';
  permission: Scalars['Boolean']['output'];
};

export type GenresDocAccessFields_Slug_Read = {
  __typename?: 'GenresDocAccessFields_slug_Read';
  permission: Scalars['Boolean']['output'];
};

export type GenresDocAccessFields_Slug_Update = {
  __typename?: 'GenresDocAccessFields_slug_Update';
  permission: Scalars['Boolean']['output'];
};

export type GenresDocAccessFields_Title = {
  __typename?: 'GenresDocAccessFields_title';
  create?: Maybe<GenresDocAccessFields_Title_Create>;
  delete?: Maybe<GenresDocAccessFields_Title_Delete>;
  read?: Maybe<GenresDocAccessFields_Title_Read>;
  update?: Maybe<GenresDocAccessFields_Title_Update>;
};

export type GenresDocAccessFields_Title_Create = {
  __typename?: 'GenresDocAccessFields_title_Create';
  permission: Scalars['Boolean']['output'];
};

export type GenresDocAccessFields_Title_Delete = {
  __typename?: 'GenresDocAccessFields_title_Delete';
  permission: Scalars['Boolean']['output'];
};

export type GenresDocAccessFields_Title_Read = {
  __typename?: 'GenresDocAccessFields_title_Read';
  permission: Scalars['Boolean']['output'];
};

export type GenresDocAccessFields_Title_Update = {
  __typename?: 'GenresDocAccessFields_title_Update';
  permission: Scalars['Boolean']['output'];
};

export type GenresDocAccessFields_UpdatedAt = {
  __typename?: 'GenresDocAccessFields_updatedAt';
  create?: Maybe<GenresDocAccessFields_UpdatedAt_Create>;
  delete?: Maybe<GenresDocAccessFields_UpdatedAt_Delete>;
  read?: Maybe<GenresDocAccessFields_UpdatedAt_Read>;
  update?: Maybe<GenresDocAccessFields_UpdatedAt_Update>;
};

export type GenresDocAccessFields_UpdatedAt_Create = {
  __typename?: 'GenresDocAccessFields_updatedAt_Create';
  permission: Scalars['Boolean']['output'];
};

export type GenresDocAccessFields_UpdatedAt_Delete = {
  __typename?: 'GenresDocAccessFields_updatedAt_Delete';
  permission: Scalars['Boolean']['output'];
};

export type GenresDocAccessFields_UpdatedAt_Read = {
  __typename?: 'GenresDocAccessFields_updatedAt_Read';
  permission: Scalars['Boolean']['output'];
};

export type GenresDocAccessFields_UpdatedAt_Update = {
  __typename?: 'GenresDocAccessFields_updatedAt_Update';
  permission: Scalars['Boolean']['output'];
};

export type GenresFields = {
  __typename?: 'GenresFields';
  createdAt?: Maybe<GenresFields_CreatedAt>;
  slug?: Maybe<GenresFields_Slug>;
  title?: Maybe<GenresFields_Title>;
  updatedAt?: Maybe<GenresFields_UpdatedAt>;
};

export type GenresFields_CreatedAt = {
  __typename?: 'GenresFields_createdAt';
  create?: Maybe<GenresFields_CreatedAt_Create>;
  delete?: Maybe<GenresFields_CreatedAt_Delete>;
  read?: Maybe<GenresFields_CreatedAt_Read>;
  update?: Maybe<GenresFields_CreatedAt_Update>;
};

export type GenresFields_CreatedAt_Create = {
  __typename?: 'GenresFields_createdAt_Create';
  permission: Scalars['Boolean']['output'];
};

export type GenresFields_CreatedAt_Delete = {
  __typename?: 'GenresFields_createdAt_Delete';
  permission: Scalars['Boolean']['output'];
};

export type GenresFields_CreatedAt_Read = {
  __typename?: 'GenresFields_createdAt_Read';
  permission: Scalars['Boolean']['output'];
};

export type GenresFields_CreatedAt_Update = {
  __typename?: 'GenresFields_createdAt_Update';
  permission: Scalars['Boolean']['output'];
};

export type GenresFields_Slug = {
  __typename?: 'GenresFields_slug';
  create?: Maybe<GenresFields_Slug_Create>;
  delete?: Maybe<GenresFields_Slug_Delete>;
  read?: Maybe<GenresFields_Slug_Read>;
  update?: Maybe<GenresFields_Slug_Update>;
};

export type GenresFields_Slug_Create = {
  __typename?: 'GenresFields_slug_Create';
  permission: Scalars['Boolean']['output'];
};

export type GenresFields_Slug_Delete = {
  __typename?: 'GenresFields_slug_Delete';
  permission: Scalars['Boolean']['output'];
};

export type GenresFields_Slug_Read = {
  __typename?: 'GenresFields_slug_Read';
  permission: Scalars['Boolean']['output'];
};

export type GenresFields_Slug_Update = {
  __typename?: 'GenresFields_slug_Update';
  permission: Scalars['Boolean']['output'];
};

export type GenresFields_Title = {
  __typename?: 'GenresFields_title';
  create?: Maybe<GenresFields_Title_Create>;
  delete?: Maybe<GenresFields_Title_Delete>;
  read?: Maybe<GenresFields_Title_Read>;
  update?: Maybe<GenresFields_Title_Update>;
};

export type GenresFields_Title_Create = {
  __typename?: 'GenresFields_title_Create';
  permission: Scalars['Boolean']['output'];
};

export type GenresFields_Title_Delete = {
  __typename?: 'GenresFields_title_Delete';
  permission: Scalars['Boolean']['output'];
};

export type GenresFields_Title_Read = {
  __typename?: 'GenresFields_title_Read';
  permission: Scalars['Boolean']['output'];
};

export type GenresFields_Title_Update = {
  __typename?: 'GenresFields_title_Update';
  permission: Scalars['Boolean']['output'];
};

export type GenresFields_UpdatedAt = {
  __typename?: 'GenresFields_updatedAt';
  create?: Maybe<GenresFields_UpdatedAt_Create>;
  delete?: Maybe<GenresFields_UpdatedAt_Delete>;
  read?: Maybe<GenresFields_UpdatedAt_Read>;
  update?: Maybe<GenresFields_UpdatedAt_Update>;
};

export type GenresFields_UpdatedAt_Create = {
  __typename?: 'GenresFields_updatedAt_Create';
  permission: Scalars['Boolean']['output'];
};

export type GenresFields_UpdatedAt_Delete = {
  __typename?: 'GenresFields_updatedAt_Delete';
  permission: Scalars['Boolean']['output'];
};

export type GenresFields_UpdatedAt_Read = {
  __typename?: 'GenresFields_updatedAt_Read';
  permission: Scalars['Boolean']['output'];
};

export type GenresFields_UpdatedAt_Update = {
  __typename?: 'GenresFields_updatedAt_Update';
  permission: Scalars['Boolean']['output'];
};

export type GenresReadAccess = {
  __typename?: 'GenresReadAccess';
  permission: Scalars['Boolean']['output'];
  where?: Maybe<Scalars['JSONObject']['output']>;
};

export type GenresReadDocAccess = {
  __typename?: 'GenresReadDocAccess';
  permission: Scalars['Boolean']['output'];
  where?: Maybe<Scalars['JSONObject']['output']>;
};

export type GenresUpdateAccess = {
  __typename?: 'GenresUpdateAccess';
  permission: Scalars['Boolean']['output'];
  where?: Maybe<Scalars['JSONObject']['output']>;
};

export type GenresUpdateDocAccess = {
  __typename?: 'GenresUpdateDocAccess';
  permission: Scalars['Boolean']['output'];
  where?: Maybe<Scalars['JSONObject']['output']>;
};

export type Media = {
  __typename?: 'Media';
  alt: Scalars['String']['output'];
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  filename?: Maybe<Scalars['String']['output']>;
  filesize?: Maybe<Scalars['Float']['output']>;
  focalX?: Maybe<Scalars['Float']['output']>;
  focalY?: Maybe<Scalars['Float']['output']>;
  height?: Maybe<Scalars['Float']['output']>;
  id: Scalars['Int']['output'];
  mimeType?: Maybe<Scalars['String']['output']>;
  thumbnailURL?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  url?: Maybe<Scalars['String']['output']>;
  width?: Maybe<Scalars['Float']['output']>;
};

export type MediaCreateAccess = {
  __typename?: 'MediaCreateAccess';
  permission: Scalars['Boolean']['output'];
  where?: Maybe<Scalars['JSONObject']['output']>;
};

export type MediaCreateDocAccess = {
  __typename?: 'MediaCreateDocAccess';
  permission: Scalars['Boolean']['output'];
  where?: Maybe<Scalars['JSONObject']['output']>;
};

export type MediaDeleteAccess = {
  __typename?: 'MediaDeleteAccess';
  permission: Scalars['Boolean']['output'];
  where?: Maybe<Scalars['JSONObject']['output']>;
};

export type MediaDeleteDocAccess = {
  __typename?: 'MediaDeleteDocAccess';
  permission: Scalars['Boolean']['output'];
  where?: Maybe<Scalars['JSONObject']['output']>;
};

export type MediaDocAccessFields = {
  __typename?: 'MediaDocAccessFields';
  alt?: Maybe<MediaDocAccessFields_Alt>;
  createdAt?: Maybe<MediaDocAccessFields_CreatedAt>;
  filename?: Maybe<MediaDocAccessFields_Filename>;
  filesize?: Maybe<MediaDocAccessFields_Filesize>;
  focalX?: Maybe<MediaDocAccessFields_FocalX>;
  focalY?: Maybe<MediaDocAccessFields_FocalY>;
  height?: Maybe<MediaDocAccessFields_Height>;
  mimeType?: Maybe<MediaDocAccessFields_MimeType>;
  thumbnailURL?: Maybe<MediaDocAccessFields_ThumbnailUrl>;
  updatedAt?: Maybe<MediaDocAccessFields_UpdatedAt>;
  url?: Maybe<MediaDocAccessFields_Url>;
  width?: Maybe<MediaDocAccessFields_Width>;
};

export type MediaDocAccessFields_Alt = {
  __typename?: 'MediaDocAccessFields_alt';
  create?: Maybe<MediaDocAccessFields_Alt_Create>;
  delete?: Maybe<MediaDocAccessFields_Alt_Delete>;
  read?: Maybe<MediaDocAccessFields_Alt_Read>;
  update?: Maybe<MediaDocAccessFields_Alt_Update>;
};

export type MediaDocAccessFields_Alt_Create = {
  __typename?: 'MediaDocAccessFields_alt_Create';
  permission: Scalars['Boolean']['output'];
};

export type MediaDocAccessFields_Alt_Delete = {
  __typename?: 'MediaDocAccessFields_alt_Delete';
  permission: Scalars['Boolean']['output'];
};

export type MediaDocAccessFields_Alt_Read = {
  __typename?: 'MediaDocAccessFields_alt_Read';
  permission: Scalars['Boolean']['output'];
};

export type MediaDocAccessFields_Alt_Update = {
  __typename?: 'MediaDocAccessFields_alt_Update';
  permission: Scalars['Boolean']['output'];
};

export type MediaDocAccessFields_CreatedAt = {
  __typename?: 'MediaDocAccessFields_createdAt';
  create?: Maybe<MediaDocAccessFields_CreatedAt_Create>;
  delete?: Maybe<MediaDocAccessFields_CreatedAt_Delete>;
  read?: Maybe<MediaDocAccessFields_CreatedAt_Read>;
  update?: Maybe<MediaDocAccessFields_CreatedAt_Update>;
};

export type MediaDocAccessFields_CreatedAt_Create = {
  __typename?: 'MediaDocAccessFields_createdAt_Create';
  permission: Scalars['Boolean']['output'];
};

export type MediaDocAccessFields_CreatedAt_Delete = {
  __typename?: 'MediaDocAccessFields_createdAt_Delete';
  permission: Scalars['Boolean']['output'];
};

export type MediaDocAccessFields_CreatedAt_Read = {
  __typename?: 'MediaDocAccessFields_createdAt_Read';
  permission: Scalars['Boolean']['output'];
};

export type MediaDocAccessFields_CreatedAt_Update = {
  __typename?: 'MediaDocAccessFields_createdAt_Update';
  permission: Scalars['Boolean']['output'];
};

export type MediaDocAccessFields_Filename = {
  __typename?: 'MediaDocAccessFields_filename';
  create?: Maybe<MediaDocAccessFields_Filename_Create>;
  delete?: Maybe<MediaDocAccessFields_Filename_Delete>;
  read?: Maybe<MediaDocAccessFields_Filename_Read>;
  update?: Maybe<MediaDocAccessFields_Filename_Update>;
};

export type MediaDocAccessFields_Filename_Create = {
  __typename?: 'MediaDocAccessFields_filename_Create';
  permission: Scalars['Boolean']['output'];
};

export type MediaDocAccessFields_Filename_Delete = {
  __typename?: 'MediaDocAccessFields_filename_Delete';
  permission: Scalars['Boolean']['output'];
};

export type MediaDocAccessFields_Filename_Read = {
  __typename?: 'MediaDocAccessFields_filename_Read';
  permission: Scalars['Boolean']['output'];
};

export type MediaDocAccessFields_Filename_Update = {
  __typename?: 'MediaDocAccessFields_filename_Update';
  permission: Scalars['Boolean']['output'];
};

export type MediaDocAccessFields_Filesize = {
  __typename?: 'MediaDocAccessFields_filesize';
  create?: Maybe<MediaDocAccessFields_Filesize_Create>;
  delete?: Maybe<MediaDocAccessFields_Filesize_Delete>;
  read?: Maybe<MediaDocAccessFields_Filesize_Read>;
  update?: Maybe<MediaDocAccessFields_Filesize_Update>;
};

export type MediaDocAccessFields_Filesize_Create = {
  __typename?: 'MediaDocAccessFields_filesize_Create';
  permission: Scalars['Boolean']['output'];
};

export type MediaDocAccessFields_Filesize_Delete = {
  __typename?: 'MediaDocAccessFields_filesize_Delete';
  permission: Scalars['Boolean']['output'];
};

export type MediaDocAccessFields_Filesize_Read = {
  __typename?: 'MediaDocAccessFields_filesize_Read';
  permission: Scalars['Boolean']['output'];
};

export type MediaDocAccessFields_Filesize_Update = {
  __typename?: 'MediaDocAccessFields_filesize_Update';
  permission: Scalars['Boolean']['output'];
};

export type MediaDocAccessFields_FocalX = {
  __typename?: 'MediaDocAccessFields_focalX';
  create?: Maybe<MediaDocAccessFields_FocalX_Create>;
  delete?: Maybe<MediaDocAccessFields_FocalX_Delete>;
  read?: Maybe<MediaDocAccessFields_FocalX_Read>;
  update?: Maybe<MediaDocAccessFields_FocalX_Update>;
};

export type MediaDocAccessFields_FocalX_Create = {
  __typename?: 'MediaDocAccessFields_focalX_Create';
  permission: Scalars['Boolean']['output'];
};

export type MediaDocAccessFields_FocalX_Delete = {
  __typename?: 'MediaDocAccessFields_focalX_Delete';
  permission: Scalars['Boolean']['output'];
};

export type MediaDocAccessFields_FocalX_Read = {
  __typename?: 'MediaDocAccessFields_focalX_Read';
  permission: Scalars['Boolean']['output'];
};

export type MediaDocAccessFields_FocalX_Update = {
  __typename?: 'MediaDocAccessFields_focalX_Update';
  permission: Scalars['Boolean']['output'];
};

export type MediaDocAccessFields_FocalY = {
  __typename?: 'MediaDocAccessFields_focalY';
  create?: Maybe<MediaDocAccessFields_FocalY_Create>;
  delete?: Maybe<MediaDocAccessFields_FocalY_Delete>;
  read?: Maybe<MediaDocAccessFields_FocalY_Read>;
  update?: Maybe<MediaDocAccessFields_FocalY_Update>;
};

export type MediaDocAccessFields_FocalY_Create = {
  __typename?: 'MediaDocAccessFields_focalY_Create';
  permission: Scalars['Boolean']['output'];
};

export type MediaDocAccessFields_FocalY_Delete = {
  __typename?: 'MediaDocAccessFields_focalY_Delete';
  permission: Scalars['Boolean']['output'];
};

export type MediaDocAccessFields_FocalY_Read = {
  __typename?: 'MediaDocAccessFields_focalY_Read';
  permission: Scalars['Boolean']['output'];
};

export type MediaDocAccessFields_FocalY_Update = {
  __typename?: 'MediaDocAccessFields_focalY_Update';
  permission: Scalars['Boolean']['output'];
};

export type MediaDocAccessFields_Height = {
  __typename?: 'MediaDocAccessFields_height';
  create?: Maybe<MediaDocAccessFields_Height_Create>;
  delete?: Maybe<MediaDocAccessFields_Height_Delete>;
  read?: Maybe<MediaDocAccessFields_Height_Read>;
  update?: Maybe<MediaDocAccessFields_Height_Update>;
};

export type MediaDocAccessFields_Height_Create = {
  __typename?: 'MediaDocAccessFields_height_Create';
  permission: Scalars['Boolean']['output'];
};

export type MediaDocAccessFields_Height_Delete = {
  __typename?: 'MediaDocAccessFields_height_Delete';
  permission: Scalars['Boolean']['output'];
};

export type MediaDocAccessFields_Height_Read = {
  __typename?: 'MediaDocAccessFields_height_Read';
  permission: Scalars['Boolean']['output'];
};

export type MediaDocAccessFields_Height_Update = {
  __typename?: 'MediaDocAccessFields_height_Update';
  permission: Scalars['Boolean']['output'];
};

export type MediaDocAccessFields_MimeType = {
  __typename?: 'MediaDocAccessFields_mimeType';
  create?: Maybe<MediaDocAccessFields_MimeType_Create>;
  delete?: Maybe<MediaDocAccessFields_MimeType_Delete>;
  read?: Maybe<MediaDocAccessFields_MimeType_Read>;
  update?: Maybe<MediaDocAccessFields_MimeType_Update>;
};

export type MediaDocAccessFields_MimeType_Create = {
  __typename?: 'MediaDocAccessFields_mimeType_Create';
  permission: Scalars['Boolean']['output'];
};

export type MediaDocAccessFields_MimeType_Delete = {
  __typename?: 'MediaDocAccessFields_mimeType_Delete';
  permission: Scalars['Boolean']['output'];
};

export type MediaDocAccessFields_MimeType_Read = {
  __typename?: 'MediaDocAccessFields_mimeType_Read';
  permission: Scalars['Boolean']['output'];
};

export type MediaDocAccessFields_MimeType_Update = {
  __typename?: 'MediaDocAccessFields_mimeType_Update';
  permission: Scalars['Boolean']['output'];
};

export type MediaDocAccessFields_ThumbnailUrl = {
  __typename?: 'MediaDocAccessFields_thumbnailURL';
  create?: Maybe<MediaDocAccessFields_ThumbnailUrl_Create>;
  delete?: Maybe<MediaDocAccessFields_ThumbnailUrl_Delete>;
  read?: Maybe<MediaDocAccessFields_ThumbnailUrl_Read>;
  update?: Maybe<MediaDocAccessFields_ThumbnailUrl_Update>;
};

export type MediaDocAccessFields_ThumbnailUrl_Create = {
  __typename?: 'MediaDocAccessFields_thumbnailURL_Create';
  permission: Scalars['Boolean']['output'];
};

export type MediaDocAccessFields_ThumbnailUrl_Delete = {
  __typename?: 'MediaDocAccessFields_thumbnailURL_Delete';
  permission: Scalars['Boolean']['output'];
};

export type MediaDocAccessFields_ThumbnailUrl_Read = {
  __typename?: 'MediaDocAccessFields_thumbnailURL_Read';
  permission: Scalars['Boolean']['output'];
};

export type MediaDocAccessFields_ThumbnailUrl_Update = {
  __typename?: 'MediaDocAccessFields_thumbnailURL_Update';
  permission: Scalars['Boolean']['output'];
};

export type MediaDocAccessFields_UpdatedAt = {
  __typename?: 'MediaDocAccessFields_updatedAt';
  create?: Maybe<MediaDocAccessFields_UpdatedAt_Create>;
  delete?: Maybe<MediaDocAccessFields_UpdatedAt_Delete>;
  read?: Maybe<MediaDocAccessFields_UpdatedAt_Read>;
  update?: Maybe<MediaDocAccessFields_UpdatedAt_Update>;
};

export type MediaDocAccessFields_UpdatedAt_Create = {
  __typename?: 'MediaDocAccessFields_updatedAt_Create';
  permission: Scalars['Boolean']['output'];
};

export type MediaDocAccessFields_UpdatedAt_Delete = {
  __typename?: 'MediaDocAccessFields_updatedAt_Delete';
  permission: Scalars['Boolean']['output'];
};

export type MediaDocAccessFields_UpdatedAt_Read = {
  __typename?: 'MediaDocAccessFields_updatedAt_Read';
  permission: Scalars['Boolean']['output'];
};

export type MediaDocAccessFields_UpdatedAt_Update = {
  __typename?: 'MediaDocAccessFields_updatedAt_Update';
  permission: Scalars['Boolean']['output'];
};

export type MediaDocAccessFields_Url = {
  __typename?: 'MediaDocAccessFields_url';
  create?: Maybe<MediaDocAccessFields_Url_Create>;
  delete?: Maybe<MediaDocAccessFields_Url_Delete>;
  read?: Maybe<MediaDocAccessFields_Url_Read>;
  update?: Maybe<MediaDocAccessFields_Url_Update>;
};

export type MediaDocAccessFields_Url_Create = {
  __typename?: 'MediaDocAccessFields_url_Create';
  permission: Scalars['Boolean']['output'];
};

export type MediaDocAccessFields_Url_Delete = {
  __typename?: 'MediaDocAccessFields_url_Delete';
  permission: Scalars['Boolean']['output'];
};

export type MediaDocAccessFields_Url_Read = {
  __typename?: 'MediaDocAccessFields_url_Read';
  permission: Scalars['Boolean']['output'];
};

export type MediaDocAccessFields_Url_Update = {
  __typename?: 'MediaDocAccessFields_url_Update';
  permission: Scalars['Boolean']['output'];
};

export type MediaDocAccessFields_Width = {
  __typename?: 'MediaDocAccessFields_width';
  create?: Maybe<MediaDocAccessFields_Width_Create>;
  delete?: Maybe<MediaDocAccessFields_Width_Delete>;
  read?: Maybe<MediaDocAccessFields_Width_Read>;
  update?: Maybe<MediaDocAccessFields_Width_Update>;
};

export type MediaDocAccessFields_Width_Create = {
  __typename?: 'MediaDocAccessFields_width_Create';
  permission: Scalars['Boolean']['output'];
};

export type MediaDocAccessFields_Width_Delete = {
  __typename?: 'MediaDocAccessFields_width_Delete';
  permission: Scalars['Boolean']['output'];
};

export type MediaDocAccessFields_Width_Read = {
  __typename?: 'MediaDocAccessFields_width_Read';
  permission: Scalars['Boolean']['output'];
};

export type MediaDocAccessFields_Width_Update = {
  __typename?: 'MediaDocAccessFields_width_Update';
  permission: Scalars['Boolean']['output'];
};

export type MediaFields = {
  __typename?: 'MediaFields';
  alt?: Maybe<MediaFields_Alt>;
  createdAt?: Maybe<MediaFields_CreatedAt>;
  filename?: Maybe<MediaFields_Filename>;
  filesize?: Maybe<MediaFields_Filesize>;
  focalX?: Maybe<MediaFields_FocalX>;
  focalY?: Maybe<MediaFields_FocalY>;
  height?: Maybe<MediaFields_Height>;
  mimeType?: Maybe<MediaFields_MimeType>;
  thumbnailURL?: Maybe<MediaFields_ThumbnailUrl>;
  updatedAt?: Maybe<MediaFields_UpdatedAt>;
  url?: Maybe<MediaFields_Url>;
  width?: Maybe<MediaFields_Width>;
};

export type MediaFields_Alt = {
  __typename?: 'MediaFields_alt';
  create?: Maybe<MediaFields_Alt_Create>;
  delete?: Maybe<MediaFields_Alt_Delete>;
  read?: Maybe<MediaFields_Alt_Read>;
  update?: Maybe<MediaFields_Alt_Update>;
};

export type MediaFields_Alt_Create = {
  __typename?: 'MediaFields_alt_Create';
  permission: Scalars['Boolean']['output'];
};

export type MediaFields_Alt_Delete = {
  __typename?: 'MediaFields_alt_Delete';
  permission: Scalars['Boolean']['output'];
};

export type MediaFields_Alt_Read = {
  __typename?: 'MediaFields_alt_Read';
  permission: Scalars['Boolean']['output'];
};

export type MediaFields_Alt_Update = {
  __typename?: 'MediaFields_alt_Update';
  permission: Scalars['Boolean']['output'];
};

export type MediaFields_CreatedAt = {
  __typename?: 'MediaFields_createdAt';
  create?: Maybe<MediaFields_CreatedAt_Create>;
  delete?: Maybe<MediaFields_CreatedAt_Delete>;
  read?: Maybe<MediaFields_CreatedAt_Read>;
  update?: Maybe<MediaFields_CreatedAt_Update>;
};

export type MediaFields_CreatedAt_Create = {
  __typename?: 'MediaFields_createdAt_Create';
  permission: Scalars['Boolean']['output'];
};

export type MediaFields_CreatedAt_Delete = {
  __typename?: 'MediaFields_createdAt_Delete';
  permission: Scalars['Boolean']['output'];
};

export type MediaFields_CreatedAt_Read = {
  __typename?: 'MediaFields_createdAt_Read';
  permission: Scalars['Boolean']['output'];
};

export type MediaFields_CreatedAt_Update = {
  __typename?: 'MediaFields_createdAt_Update';
  permission: Scalars['Boolean']['output'];
};

export type MediaFields_Filename = {
  __typename?: 'MediaFields_filename';
  create?: Maybe<MediaFields_Filename_Create>;
  delete?: Maybe<MediaFields_Filename_Delete>;
  read?: Maybe<MediaFields_Filename_Read>;
  update?: Maybe<MediaFields_Filename_Update>;
};

export type MediaFields_Filename_Create = {
  __typename?: 'MediaFields_filename_Create';
  permission: Scalars['Boolean']['output'];
};

export type MediaFields_Filename_Delete = {
  __typename?: 'MediaFields_filename_Delete';
  permission: Scalars['Boolean']['output'];
};

export type MediaFields_Filename_Read = {
  __typename?: 'MediaFields_filename_Read';
  permission: Scalars['Boolean']['output'];
};

export type MediaFields_Filename_Update = {
  __typename?: 'MediaFields_filename_Update';
  permission: Scalars['Boolean']['output'];
};

export type MediaFields_Filesize = {
  __typename?: 'MediaFields_filesize';
  create?: Maybe<MediaFields_Filesize_Create>;
  delete?: Maybe<MediaFields_Filesize_Delete>;
  read?: Maybe<MediaFields_Filesize_Read>;
  update?: Maybe<MediaFields_Filesize_Update>;
};

export type MediaFields_Filesize_Create = {
  __typename?: 'MediaFields_filesize_Create';
  permission: Scalars['Boolean']['output'];
};

export type MediaFields_Filesize_Delete = {
  __typename?: 'MediaFields_filesize_Delete';
  permission: Scalars['Boolean']['output'];
};

export type MediaFields_Filesize_Read = {
  __typename?: 'MediaFields_filesize_Read';
  permission: Scalars['Boolean']['output'];
};

export type MediaFields_Filesize_Update = {
  __typename?: 'MediaFields_filesize_Update';
  permission: Scalars['Boolean']['output'];
};

export type MediaFields_FocalX = {
  __typename?: 'MediaFields_focalX';
  create?: Maybe<MediaFields_FocalX_Create>;
  delete?: Maybe<MediaFields_FocalX_Delete>;
  read?: Maybe<MediaFields_FocalX_Read>;
  update?: Maybe<MediaFields_FocalX_Update>;
};

export type MediaFields_FocalX_Create = {
  __typename?: 'MediaFields_focalX_Create';
  permission: Scalars['Boolean']['output'];
};

export type MediaFields_FocalX_Delete = {
  __typename?: 'MediaFields_focalX_Delete';
  permission: Scalars['Boolean']['output'];
};

export type MediaFields_FocalX_Read = {
  __typename?: 'MediaFields_focalX_Read';
  permission: Scalars['Boolean']['output'];
};

export type MediaFields_FocalX_Update = {
  __typename?: 'MediaFields_focalX_Update';
  permission: Scalars['Boolean']['output'];
};

export type MediaFields_FocalY = {
  __typename?: 'MediaFields_focalY';
  create?: Maybe<MediaFields_FocalY_Create>;
  delete?: Maybe<MediaFields_FocalY_Delete>;
  read?: Maybe<MediaFields_FocalY_Read>;
  update?: Maybe<MediaFields_FocalY_Update>;
};

export type MediaFields_FocalY_Create = {
  __typename?: 'MediaFields_focalY_Create';
  permission: Scalars['Boolean']['output'];
};

export type MediaFields_FocalY_Delete = {
  __typename?: 'MediaFields_focalY_Delete';
  permission: Scalars['Boolean']['output'];
};

export type MediaFields_FocalY_Read = {
  __typename?: 'MediaFields_focalY_Read';
  permission: Scalars['Boolean']['output'];
};

export type MediaFields_FocalY_Update = {
  __typename?: 'MediaFields_focalY_Update';
  permission: Scalars['Boolean']['output'];
};

export type MediaFields_Height = {
  __typename?: 'MediaFields_height';
  create?: Maybe<MediaFields_Height_Create>;
  delete?: Maybe<MediaFields_Height_Delete>;
  read?: Maybe<MediaFields_Height_Read>;
  update?: Maybe<MediaFields_Height_Update>;
};

export type MediaFields_Height_Create = {
  __typename?: 'MediaFields_height_Create';
  permission: Scalars['Boolean']['output'];
};

export type MediaFields_Height_Delete = {
  __typename?: 'MediaFields_height_Delete';
  permission: Scalars['Boolean']['output'];
};

export type MediaFields_Height_Read = {
  __typename?: 'MediaFields_height_Read';
  permission: Scalars['Boolean']['output'];
};

export type MediaFields_Height_Update = {
  __typename?: 'MediaFields_height_Update';
  permission: Scalars['Boolean']['output'];
};

export type MediaFields_MimeType = {
  __typename?: 'MediaFields_mimeType';
  create?: Maybe<MediaFields_MimeType_Create>;
  delete?: Maybe<MediaFields_MimeType_Delete>;
  read?: Maybe<MediaFields_MimeType_Read>;
  update?: Maybe<MediaFields_MimeType_Update>;
};

export type MediaFields_MimeType_Create = {
  __typename?: 'MediaFields_mimeType_Create';
  permission: Scalars['Boolean']['output'];
};

export type MediaFields_MimeType_Delete = {
  __typename?: 'MediaFields_mimeType_Delete';
  permission: Scalars['Boolean']['output'];
};

export type MediaFields_MimeType_Read = {
  __typename?: 'MediaFields_mimeType_Read';
  permission: Scalars['Boolean']['output'];
};

export type MediaFields_MimeType_Update = {
  __typename?: 'MediaFields_mimeType_Update';
  permission: Scalars['Boolean']['output'];
};

export type MediaFields_ThumbnailUrl = {
  __typename?: 'MediaFields_thumbnailURL';
  create?: Maybe<MediaFields_ThumbnailUrl_Create>;
  delete?: Maybe<MediaFields_ThumbnailUrl_Delete>;
  read?: Maybe<MediaFields_ThumbnailUrl_Read>;
  update?: Maybe<MediaFields_ThumbnailUrl_Update>;
};

export type MediaFields_ThumbnailUrl_Create = {
  __typename?: 'MediaFields_thumbnailURL_Create';
  permission: Scalars['Boolean']['output'];
};

export type MediaFields_ThumbnailUrl_Delete = {
  __typename?: 'MediaFields_thumbnailURL_Delete';
  permission: Scalars['Boolean']['output'];
};

export type MediaFields_ThumbnailUrl_Read = {
  __typename?: 'MediaFields_thumbnailURL_Read';
  permission: Scalars['Boolean']['output'];
};

export type MediaFields_ThumbnailUrl_Update = {
  __typename?: 'MediaFields_thumbnailURL_Update';
  permission: Scalars['Boolean']['output'];
};

export type MediaFields_UpdatedAt = {
  __typename?: 'MediaFields_updatedAt';
  create?: Maybe<MediaFields_UpdatedAt_Create>;
  delete?: Maybe<MediaFields_UpdatedAt_Delete>;
  read?: Maybe<MediaFields_UpdatedAt_Read>;
  update?: Maybe<MediaFields_UpdatedAt_Update>;
};

export type MediaFields_UpdatedAt_Create = {
  __typename?: 'MediaFields_updatedAt_Create';
  permission: Scalars['Boolean']['output'];
};

export type MediaFields_UpdatedAt_Delete = {
  __typename?: 'MediaFields_updatedAt_Delete';
  permission: Scalars['Boolean']['output'];
};

export type MediaFields_UpdatedAt_Read = {
  __typename?: 'MediaFields_updatedAt_Read';
  permission: Scalars['Boolean']['output'];
};

export type MediaFields_UpdatedAt_Update = {
  __typename?: 'MediaFields_updatedAt_Update';
  permission: Scalars['Boolean']['output'];
};

export type MediaFields_Url = {
  __typename?: 'MediaFields_url';
  create?: Maybe<MediaFields_Url_Create>;
  delete?: Maybe<MediaFields_Url_Delete>;
  read?: Maybe<MediaFields_Url_Read>;
  update?: Maybe<MediaFields_Url_Update>;
};

export type MediaFields_Url_Create = {
  __typename?: 'MediaFields_url_Create';
  permission: Scalars['Boolean']['output'];
};

export type MediaFields_Url_Delete = {
  __typename?: 'MediaFields_url_Delete';
  permission: Scalars['Boolean']['output'];
};

export type MediaFields_Url_Read = {
  __typename?: 'MediaFields_url_Read';
  permission: Scalars['Boolean']['output'];
};

export type MediaFields_Url_Update = {
  __typename?: 'MediaFields_url_Update';
  permission: Scalars['Boolean']['output'];
};

export type MediaFields_Width = {
  __typename?: 'MediaFields_width';
  create?: Maybe<MediaFields_Width_Create>;
  delete?: Maybe<MediaFields_Width_Delete>;
  read?: Maybe<MediaFields_Width_Read>;
  update?: Maybe<MediaFields_Width_Update>;
};

export type MediaFields_Width_Create = {
  __typename?: 'MediaFields_width_Create';
  permission: Scalars['Boolean']['output'];
};

export type MediaFields_Width_Delete = {
  __typename?: 'MediaFields_width_Delete';
  permission: Scalars['Boolean']['output'];
};

export type MediaFields_Width_Read = {
  __typename?: 'MediaFields_width_Read';
  permission: Scalars['Boolean']['output'];
};

export type MediaFields_Width_Update = {
  __typename?: 'MediaFields_width_Update';
  permission: Scalars['Boolean']['output'];
};

export type MediaReadAccess = {
  __typename?: 'MediaReadAccess';
  permission: Scalars['Boolean']['output'];
  where?: Maybe<Scalars['JSONObject']['output']>;
};

export type MediaReadDocAccess = {
  __typename?: 'MediaReadDocAccess';
  permission: Scalars['Boolean']['output'];
  where?: Maybe<Scalars['JSONObject']['output']>;
};

export type MediaUpdateAccess = {
  __typename?: 'MediaUpdateAccess';
  permission: Scalars['Boolean']['output'];
  where?: Maybe<Scalars['JSONObject']['output']>;
};

export type MediaUpdateDocAccess = {
  __typename?: 'MediaUpdateDocAccess';
  permission: Scalars['Boolean']['output'];
  where?: Maybe<Scalars['JSONObject']['output']>;
};

export type Media_Alt_Operator = {
  all?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  contains?: InputMaybe<Scalars['String']['input']>;
  equals?: InputMaybe<Scalars['String']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  like?: InputMaybe<Scalars['String']['input']>;
  not_equals?: InputMaybe<Scalars['String']['input']>;
  not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type Media_CreatedAt_Operator = {
  equals?: InputMaybe<Scalars['DateTime']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  greater_than?: InputMaybe<Scalars['DateTime']['input']>;
  greater_than_equal?: InputMaybe<Scalars['DateTime']['input']>;
  less_than?: InputMaybe<Scalars['DateTime']['input']>;
  less_than_equal?: InputMaybe<Scalars['DateTime']['input']>;
  like?: InputMaybe<Scalars['DateTime']['input']>;
  not_equals?: InputMaybe<Scalars['DateTime']['input']>;
};

export type Media_Filename_Operator = {
  all?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  contains?: InputMaybe<Scalars['String']['input']>;
  equals?: InputMaybe<Scalars['String']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  like?: InputMaybe<Scalars['String']['input']>;
  not_equals?: InputMaybe<Scalars['String']['input']>;
  not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type Media_Filesize_Operator = {
  equals?: InputMaybe<Scalars['Float']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  greater_than?: InputMaybe<Scalars['Float']['input']>;
  greater_than_equal?: InputMaybe<Scalars['Float']['input']>;
  less_than?: InputMaybe<Scalars['Float']['input']>;
  less_than_equal?: InputMaybe<Scalars['Float']['input']>;
  not_equals?: InputMaybe<Scalars['Float']['input']>;
};

export type Media_FocalX_Operator = {
  equals?: InputMaybe<Scalars['Float']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  greater_than?: InputMaybe<Scalars['Float']['input']>;
  greater_than_equal?: InputMaybe<Scalars['Float']['input']>;
  less_than?: InputMaybe<Scalars['Float']['input']>;
  less_than_equal?: InputMaybe<Scalars['Float']['input']>;
  not_equals?: InputMaybe<Scalars['Float']['input']>;
};

export type Media_FocalY_Operator = {
  equals?: InputMaybe<Scalars['Float']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  greater_than?: InputMaybe<Scalars['Float']['input']>;
  greater_than_equal?: InputMaybe<Scalars['Float']['input']>;
  less_than?: InputMaybe<Scalars['Float']['input']>;
  less_than_equal?: InputMaybe<Scalars['Float']['input']>;
  not_equals?: InputMaybe<Scalars['Float']['input']>;
};

export type Media_Height_Operator = {
  equals?: InputMaybe<Scalars['Float']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  greater_than?: InputMaybe<Scalars['Float']['input']>;
  greater_than_equal?: InputMaybe<Scalars['Float']['input']>;
  less_than?: InputMaybe<Scalars['Float']['input']>;
  less_than_equal?: InputMaybe<Scalars['Float']['input']>;
  not_equals?: InputMaybe<Scalars['Float']['input']>;
};

export type Media_Id_Operator = {
  equals?: InputMaybe<Scalars['Int']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  greater_than?: InputMaybe<Scalars['Int']['input']>;
  greater_than_equal?: InputMaybe<Scalars['Int']['input']>;
  less_than?: InputMaybe<Scalars['Int']['input']>;
  less_than_equal?: InputMaybe<Scalars['Int']['input']>;
  not_equals?: InputMaybe<Scalars['Int']['input']>;
};

export type Media_MimeType_Operator = {
  all?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  contains?: InputMaybe<Scalars['String']['input']>;
  equals?: InputMaybe<Scalars['String']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  like?: InputMaybe<Scalars['String']['input']>;
  not_equals?: InputMaybe<Scalars['String']['input']>;
  not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type Media_ThumbnailUrl_Operator = {
  all?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  contains?: InputMaybe<Scalars['String']['input']>;
  equals?: InputMaybe<Scalars['String']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  like?: InputMaybe<Scalars['String']['input']>;
  not_equals?: InputMaybe<Scalars['String']['input']>;
  not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type Media_UpdatedAt_Operator = {
  equals?: InputMaybe<Scalars['DateTime']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  greater_than?: InputMaybe<Scalars['DateTime']['input']>;
  greater_than_equal?: InputMaybe<Scalars['DateTime']['input']>;
  less_than?: InputMaybe<Scalars['DateTime']['input']>;
  less_than_equal?: InputMaybe<Scalars['DateTime']['input']>;
  like?: InputMaybe<Scalars['DateTime']['input']>;
  not_equals?: InputMaybe<Scalars['DateTime']['input']>;
};

export type Media_Url_Operator = {
  all?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  contains?: InputMaybe<Scalars['String']['input']>;
  equals?: InputMaybe<Scalars['String']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  like?: InputMaybe<Scalars['String']['input']>;
  not_equals?: InputMaybe<Scalars['String']['input']>;
  not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type Media_Where = {
  AND?: InputMaybe<Array<InputMaybe<Media_Where_And>>>;
  OR?: InputMaybe<Array<InputMaybe<Media_Where_Or>>>;
  alt?: InputMaybe<Media_Alt_Operator>;
  createdAt?: InputMaybe<Media_CreatedAt_Operator>;
  filename?: InputMaybe<Media_Filename_Operator>;
  filesize?: InputMaybe<Media_Filesize_Operator>;
  focalX?: InputMaybe<Media_FocalX_Operator>;
  focalY?: InputMaybe<Media_FocalY_Operator>;
  height?: InputMaybe<Media_Height_Operator>;
  id?: InputMaybe<Media_Id_Operator>;
  mimeType?: InputMaybe<Media_MimeType_Operator>;
  thumbnailURL?: InputMaybe<Media_ThumbnailUrl_Operator>;
  updatedAt?: InputMaybe<Media_UpdatedAt_Operator>;
  url?: InputMaybe<Media_Url_Operator>;
  width?: InputMaybe<Media_Width_Operator>;
};

export type Media_Where_And = {
  AND?: InputMaybe<Array<InputMaybe<Media_Where_And>>>;
  OR?: InputMaybe<Array<InputMaybe<Media_Where_Or>>>;
  alt?: InputMaybe<Media_Alt_Operator>;
  createdAt?: InputMaybe<Media_CreatedAt_Operator>;
  filename?: InputMaybe<Media_Filename_Operator>;
  filesize?: InputMaybe<Media_Filesize_Operator>;
  focalX?: InputMaybe<Media_FocalX_Operator>;
  focalY?: InputMaybe<Media_FocalY_Operator>;
  height?: InputMaybe<Media_Height_Operator>;
  id?: InputMaybe<Media_Id_Operator>;
  mimeType?: InputMaybe<Media_MimeType_Operator>;
  thumbnailURL?: InputMaybe<Media_ThumbnailUrl_Operator>;
  updatedAt?: InputMaybe<Media_UpdatedAt_Operator>;
  url?: InputMaybe<Media_Url_Operator>;
  width?: InputMaybe<Media_Width_Operator>;
};

export type Media_Where_Or = {
  AND?: InputMaybe<Array<InputMaybe<Media_Where_And>>>;
  OR?: InputMaybe<Array<InputMaybe<Media_Where_Or>>>;
  alt?: InputMaybe<Media_Alt_Operator>;
  createdAt?: InputMaybe<Media_CreatedAt_Operator>;
  filename?: InputMaybe<Media_Filename_Operator>;
  filesize?: InputMaybe<Media_Filesize_Operator>;
  focalX?: InputMaybe<Media_FocalX_Operator>;
  focalY?: InputMaybe<Media_FocalY_Operator>;
  height?: InputMaybe<Media_Height_Operator>;
  id?: InputMaybe<Media_Id_Operator>;
  mimeType?: InputMaybe<Media_MimeType_Operator>;
  thumbnailURL?: InputMaybe<Media_ThumbnailUrl_Operator>;
  updatedAt?: InputMaybe<Media_UpdatedAt_Operator>;
  url?: InputMaybe<Media_Url_Operator>;
  width?: InputMaybe<Media_Width_Operator>;
};

export type Media_Width_Operator = {
  equals?: InputMaybe<Scalars['Float']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  greater_than?: InputMaybe<Scalars['Float']['input']>;
  greater_than_equal?: InputMaybe<Scalars['Float']['input']>;
  less_than?: InputMaybe<Scalars['Float']['input']>;
  less_than_equal?: InputMaybe<Scalars['Float']['input']>;
  not_equals?: InputMaybe<Scalars['Float']['input']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createContent?: Maybe<Content>;
  createEpisode?: Maybe<Episode>;
  createFavorite?: Maybe<Favorite>;
  createGenre?: Maybe<Genre>;
  createMedia?: Maybe<Media>;
  createPayloadKv?: Maybe<PayloadKv>;
  createPayloadLockedDocument?: Maybe<PayloadLockedDocument>;
  createPayloadPreference?: Maybe<PayloadPreference>;
  createSearchResult?: Maybe<SearchResult>;
  createSeason?: Maybe<Season>;
  createUser?: Maybe<User>;
  deleteContent?: Maybe<Content>;
  deleteEpisode?: Maybe<Episode>;
  deleteFavorite?: Maybe<Favorite>;
  deleteGenre?: Maybe<Genre>;
  deleteMedia?: Maybe<Media>;
  deletePayloadKv?: Maybe<PayloadKv>;
  deletePayloadLockedDocument?: Maybe<PayloadLockedDocument>;
  deletePayloadPreference?: Maybe<PayloadPreference>;
  deleteSearchResult?: Maybe<SearchResult>;
  deleteSeason?: Maybe<Season>;
  deleteUser?: Maybe<User>;
  duplicateContent?: Maybe<Content>;
  duplicateEpisode?: Maybe<Episode>;
  duplicateFavorite?: Maybe<Favorite>;
  duplicateGenre?: Maybe<Genre>;
  duplicateMedia?: Maybe<Media>;
  duplicatePayloadKv?: Maybe<PayloadKv>;
  duplicatePayloadLockedDocument?: Maybe<PayloadLockedDocument>;
  duplicatePayloadPreference?: Maybe<PayloadPreference>;
  duplicateSearchResult?: Maybe<SearchResult>;
  duplicateSeason?: Maybe<Season>;
  forgotPasswordUser: Scalars['Boolean']['output'];
  loginUser?: Maybe<UsersLoginResult>;
  logoutUser?: Maybe<Scalars['String']['output']>;
  refreshTokenUser?: Maybe<UsersRefreshedUser>;
  resetPasswordUser?: Maybe<UsersResetPassword>;
  restoreVersionContent?: Maybe<Content>;
  unlockUser: Scalars['Boolean']['output'];
  updateContent?: Maybe<Content>;
  updateEpisode?: Maybe<Episode>;
  updateFavorite?: Maybe<Favorite>;
  updateGenre?: Maybe<Genre>;
  updateMedia?: Maybe<Media>;
  updatePayloadKv?: Maybe<PayloadKv>;
  updatePayloadLockedDocument?: Maybe<PayloadLockedDocument>;
  updatePayloadPreference?: Maybe<PayloadPreference>;
  updateSearchResult?: Maybe<SearchResult>;
  updateSeason?: Maybe<Season>;
  updateUser?: Maybe<User>;
  verifyEmailUser?: Maybe<Scalars['Boolean']['output']>;
};


export type MutationCreateContentArgs = {
  data: MutationContentInput;
  draft?: InputMaybe<Scalars['Boolean']['input']>;
};


export type MutationCreateEpisodeArgs = {
  data: MutationEpisodeInput;
  draft?: InputMaybe<Scalars['Boolean']['input']>;
};


export type MutationCreateFavoriteArgs = {
  data: MutationFavoriteInput;
  draft?: InputMaybe<Scalars['Boolean']['input']>;
};


export type MutationCreateGenreArgs = {
  data: MutationGenreInput;
  draft?: InputMaybe<Scalars['Boolean']['input']>;
};


export type MutationCreateMediaArgs = {
  data: MutationMediaInput;
  draft?: InputMaybe<Scalars['Boolean']['input']>;
};


export type MutationCreatePayloadKvArgs = {
  data: MutationPayloadKvInput;
  draft?: InputMaybe<Scalars['Boolean']['input']>;
};


export type MutationCreatePayloadLockedDocumentArgs = {
  data: MutationPayloadLockedDocumentInput;
  draft?: InputMaybe<Scalars['Boolean']['input']>;
};


export type MutationCreatePayloadPreferenceArgs = {
  data: MutationPayloadPreferenceInput;
  draft?: InputMaybe<Scalars['Boolean']['input']>;
};


export type MutationCreateSearchResultArgs = {
  data: MutationSearchResultInput;
  draft?: InputMaybe<Scalars['Boolean']['input']>;
};


export type MutationCreateSeasonArgs = {
  data: MutationSeasonInput;
  draft?: InputMaybe<Scalars['Boolean']['input']>;
};


export type MutationCreateUserArgs = {
  data: MutationUserInput;
  draft?: InputMaybe<Scalars['Boolean']['input']>;
};


export type MutationDeleteContentArgs = {
  id: Scalars['Int']['input'];
  trash?: InputMaybe<Scalars['Boolean']['input']>;
};


export type MutationDeleteEpisodeArgs = {
  id: Scalars['Int']['input'];
  trash?: InputMaybe<Scalars['Boolean']['input']>;
};


export type MutationDeleteFavoriteArgs = {
  id: Scalars['Int']['input'];
  trash?: InputMaybe<Scalars['Boolean']['input']>;
};


export type MutationDeleteGenreArgs = {
  id: Scalars['Int']['input'];
  trash?: InputMaybe<Scalars['Boolean']['input']>;
};


export type MutationDeleteMediaArgs = {
  id: Scalars['Int']['input'];
  trash?: InputMaybe<Scalars['Boolean']['input']>;
};


export type MutationDeletePayloadKvArgs = {
  id: Scalars['Int']['input'];
  trash?: InputMaybe<Scalars['Boolean']['input']>;
};


export type MutationDeletePayloadLockedDocumentArgs = {
  id: Scalars['Int']['input'];
  trash?: InputMaybe<Scalars['Boolean']['input']>;
};


export type MutationDeletePayloadPreferenceArgs = {
  id: Scalars['Int']['input'];
  trash?: InputMaybe<Scalars['Boolean']['input']>;
};


export type MutationDeleteSearchResultArgs = {
  id: Scalars['Int']['input'];
  trash?: InputMaybe<Scalars['Boolean']['input']>;
};


export type MutationDeleteSeasonArgs = {
  id: Scalars['Int']['input'];
  trash?: InputMaybe<Scalars['Boolean']['input']>;
};


export type MutationDeleteUserArgs = {
  id: Scalars['Int']['input'];
  trash?: InputMaybe<Scalars['Boolean']['input']>;
};


export type MutationDuplicateContentArgs = {
  data: MutationContentInput;
  id: Scalars['Int']['input'];
};


export type MutationDuplicateEpisodeArgs = {
  data: MutationEpisodeInput;
  id: Scalars['Int']['input'];
};


export type MutationDuplicateFavoriteArgs = {
  data: MutationFavoriteInput;
  id: Scalars['Int']['input'];
};


export type MutationDuplicateGenreArgs = {
  data: MutationGenreInput;
  id: Scalars['Int']['input'];
};


export type MutationDuplicateMediaArgs = {
  data: MutationMediaInput;
  id: Scalars['Int']['input'];
};


export type MutationDuplicatePayloadKvArgs = {
  data: MutationPayloadKvInput;
  id: Scalars['Int']['input'];
};


export type MutationDuplicatePayloadLockedDocumentArgs = {
  data: MutationPayloadLockedDocumentInput;
  id: Scalars['Int']['input'];
};


export type MutationDuplicatePayloadPreferenceArgs = {
  data: MutationPayloadPreferenceInput;
  id: Scalars['Int']['input'];
};


export type MutationDuplicateSearchResultArgs = {
  data: MutationSearchResultInput;
  id: Scalars['Int']['input'];
};


export type MutationDuplicateSeasonArgs = {
  data: MutationSeasonInput;
  id: Scalars['Int']['input'];
};


export type MutationForgotPasswordUserArgs = {
  email: Scalars['String']['input'];
};


export type MutationLoginUserArgs = {
  email: Scalars['String']['input'];
  password?: InputMaybe<Scalars['String']['input']>;
};


export type MutationLogoutUserArgs = {
  allSessions?: InputMaybe<Scalars['Boolean']['input']>;
};


export type MutationResetPasswordUserArgs = {
  password?: InputMaybe<Scalars['String']['input']>;
  token?: InputMaybe<Scalars['String']['input']>;
};


export type MutationRestoreVersionContentArgs = {
  draft?: InputMaybe<Scalars['Boolean']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
};


export type MutationUnlockUserArgs = {
  email: Scalars['String']['input'];
};


export type MutationUpdateContentArgs = {
  autosave?: InputMaybe<Scalars['Boolean']['input']>;
  data: MutationContentUpdateInput;
  draft?: InputMaybe<Scalars['Boolean']['input']>;
  id: Scalars['Int']['input'];
  trash?: InputMaybe<Scalars['Boolean']['input']>;
};


export type MutationUpdateEpisodeArgs = {
  autosave?: InputMaybe<Scalars['Boolean']['input']>;
  data: MutationEpisodeUpdateInput;
  draft?: InputMaybe<Scalars['Boolean']['input']>;
  id: Scalars['Int']['input'];
  trash?: InputMaybe<Scalars['Boolean']['input']>;
};


export type MutationUpdateFavoriteArgs = {
  autosave?: InputMaybe<Scalars['Boolean']['input']>;
  data: MutationFavoriteUpdateInput;
  draft?: InputMaybe<Scalars['Boolean']['input']>;
  id: Scalars['Int']['input'];
  trash?: InputMaybe<Scalars['Boolean']['input']>;
};


export type MutationUpdateGenreArgs = {
  autosave?: InputMaybe<Scalars['Boolean']['input']>;
  data: MutationGenreUpdateInput;
  draft?: InputMaybe<Scalars['Boolean']['input']>;
  id: Scalars['Int']['input'];
  trash?: InputMaybe<Scalars['Boolean']['input']>;
};


export type MutationUpdateMediaArgs = {
  autosave?: InputMaybe<Scalars['Boolean']['input']>;
  data: MutationMediaUpdateInput;
  draft?: InputMaybe<Scalars['Boolean']['input']>;
  id: Scalars['Int']['input'];
  trash?: InputMaybe<Scalars['Boolean']['input']>;
};


export type MutationUpdatePayloadKvArgs = {
  autosave?: InputMaybe<Scalars['Boolean']['input']>;
  data: MutationPayloadKvUpdateInput;
  draft?: InputMaybe<Scalars['Boolean']['input']>;
  id: Scalars['Int']['input'];
  trash?: InputMaybe<Scalars['Boolean']['input']>;
};


export type MutationUpdatePayloadLockedDocumentArgs = {
  autosave?: InputMaybe<Scalars['Boolean']['input']>;
  data: MutationPayloadLockedDocumentUpdateInput;
  draft?: InputMaybe<Scalars['Boolean']['input']>;
  id: Scalars['Int']['input'];
  trash?: InputMaybe<Scalars['Boolean']['input']>;
};


export type MutationUpdatePayloadPreferenceArgs = {
  autosave?: InputMaybe<Scalars['Boolean']['input']>;
  data: MutationPayloadPreferenceUpdateInput;
  draft?: InputMaybe<Scalars['Boolean']['input']>;
  id: Scalars['Int']['input'];
  trash?: InputMaybe<Scalars['Boolean']['input']>;
};


export type MutationUpdateSearchResultArgs = {
  autosave?: InputMaybe<Scalars['Boolean']['input']>;
  data: MutationSearchResultUpdateInput;
  draft?: InputMaybe<Scalars['Boolean']['input']>;
  id: Scalars['Int']['input'];
  trash?: InputMaybe<Scalars['Boolean']['input']>;
};


export type MutationUpdateSeasonArgs = {
  autosave?: InputMaybe<Scalars['Boolean']['input']>;
  data: MutationSeasonUpdateInput;
  draft?: InputMaybe<Scalars['Boolean']['input']>;
  id: Scalars['Int']['input'];
  trash?: InputMaybe<Scalars['Boolean']['input']>;
};


export type MutationUpdateUserArgs = {
  autosave?: InputMaybe<Scalars['Boolean']['input']>;
  data: MutationUserUpdateInput;
  draft?: InputMaybe<Scalars['Boolean']['input']>;
  id: Scalars['Int']['input'];
  trash?: InputMaybe<Scalars['Boolean']['input']>;
};


export type MutationVerifyEmailUserArgs = {
  token?: InputMaybe<Scalars['String']['input']>;
};

export type PayloadKv = {
  __typename?: 'PayloadKv';
  data: Scalars['JSON']['output'];
  id: Scalars['Int']['output'];
  key: Scalars['String']['output'];
};

export type PayloadKvCreateAccess = {
  __typename?: 'PayloadKvCreateAccess';
  permission: Scalars['Boolean']['output'];
  where?: Maybe<Scalars['JSONObject']['output']>;
};

export type PayloadKvCreateDocAccess = {
  __typename?: 'PayloadKvCreateDocAccess';
  permission: Scalars['Boolean']['output'];
  where?: Maybe<Scalars['JSONObject']['output']>;
};

export type PayloadKvDeleteAccess = {
  __typename?: 'PayloadKvDeleteAccess';
  permission: Scalars['Boolean']['output'];
  where?: Maybe<Scalars['JSONObject']['output']>;
};

export type PayloadKvDeleteDocAccess = {
  __typename?: 'PayloadKvDeleteDocAccess';
  permission: Scalars['Boolean']['output'];
  where?: Maybe<Scalars['JSONObject']['output']>;
};

export type PayloadKvDocAccessFields = {
  __typename?: 'PayloadKvDocAccessFields';
  data?: Maybe<PayloadKvDocAccessFields_Data>;
  key?: Maybe<PayloadKvDocAccessFields_Key>;
};

export type PayloadKvDocAccessFields_Data = {
  __typename?: 'PayloadKvDocAccessFields_data';
  create?: Maybe<PayloadKvDocAccessFields_Data_Create>;
  delete?: Maybe<PayloadKvDocAccessFields_Data_Delete>;
  read?: Maybe<PayloadKvDocAccessFields_Data_Read>;
  update?: Maybe<PayloadKvDocAccessFields_Data_Update>;
};

export type PayloadKvDocAccessFields_Data_Create = {
  __typename?: 'PayloadKvDocAccessFields_data_Create';
  permission: Scalars['Boolean']['output'];
};

export type PayloadKvDocAccessFields_Data_Delete = {
  __typename?: 'PayloadKvDocAccessFields_data_Delete';
  permission: Scalars['Boolean']['output'];
};

export type PayloadKvDocAccessFields_Data_Read = {
  __typename?: 'PayloadKvDocAccessFields_data_Read';
  permission: Scalars['Boolean']['output'];
};

export type PayloadKvDocAccessFields_Data_Update = {
  __typename?: 'PayloadKvDocAccessFields_data_Update';
  permission: Scalars['Boolean']['output'];
};

export type PayloadKvDocAccessFields_Key = {
  __typename?: 'PayloadKvDocAccessFields_key';
  create?: Maybe<PayloadKvDocAccessFields_Key_Create>;
  delete?: Maybe<PayloadKvDocAccessFields_Key_Delete>;
  read?: Maybe<PayloadKvDocAccessFields_Key_Read>;
  update?: Maybe<PayloadKvDocAccessFields_Key_Update>;
};

export type PayloadKvDocAccessFields_Key_Create = {
  __typename?: 'PayloadKvDocAccessFields_key_Create';
  permission: Scalars['Boolean']['output'];
};

export type PayloadKvDocAccessFields_Key_Delete = {
  __typename?: 'PayloadKvDocAccessFields_key_Delete';
  permission: Scalars['Boolean']['output'];
};

export type PayloadKvDocAccessFields_Key_Read = {
  __typename?: 'PayloadKvDocAccessFields_key_Read';
  permission: Scalars['Boolean']['output'];
};

export type PayloadKvDocAccessFields_Key_Update = {
  __typename?: 'PayloadKvDocAccessFields_key_Update';
  permission: Scalars['Boolean']['output'];
};

export type PayloadKvFields = {
  __typename?: 'PayloadKvFields';
  data?: Maybe<PayloadKvFields_Data>;
  key?: Maybe<PayloadKvFields_Key>;
};

export type PayloadKvFields_Data = {
  __typename?: 'PayloadKvFields_data';
  create?: Maybe<PayloadKvFields_Data_Create>;
  delete?: Maybe<PayloadKvFields_Data_Delete>;
  read?: Maybe<PayloadKvFields_Data_Read>;
  update?: Maybe<PayloadKvFields_Data_Update>;
};

export type PayloadKvFields_Data_Create = {
  __typename?: 'PayloadKvFields_data_Create';
  permission: Scalars['Boolean']['output'];
};

export type PayloadKvFields_Data_Delete = {
  __typename?: 'PayloadKvFields_data_Delete';
  permission: Scalars['Boolean']['output'];
};

export type PayloadKvFields_Data_Read = {
  __typename?: 'PayloadKvFields_data_Read';
  permission: Scalars['Boolean']['output'];
};

export type PayloadKvFields_Data_Update = {
  __typename?: 'PayloadKvFields_data_Update';
  permission: Scalars['Boolean']['output'];
};

export type PayloadKvFields_Key = {
  __typename?: 'PayloadKvFields_key';
  create?: Maybe<PayloadKvFields_Key_Create>;
  delete?: Maybe<PayloadKvFields_Key_Delete>;
  read?: Maybe<PayloadKvFields_Key_Read>;
  update?: Maybe<PayloadKvFields_Key_Update>;
};

export type PayloadKvFields_Key_Create = {
  __typename?: 'PayloadKvFields_key_Create';
  permission: Scalars['Boolean']['output'];
};

export type PayloadKvFields_Key_Delete = {
  __typename?: 'PayloadKvFields_key_Delete';
  permission: Scalars['Boolean']['output'];
};

export type PayloadKvFields_Key_Read = {
  __typename?: 'PayloadKvFields_key_Read';
  permission: Scalars['Boolean']['output'];
};

export type PayloadKvFields_Key_Update = {
  __typename?: 'PayloadKvFields_key_Update';
  permission: Scalars['Boolean']['output'];
};

export type PayloadKvReadAccess = {
  __typename?: 'PayloadKvReadAccess';
  permission: Scalars['Boolean']['output'];
  where?: Maybe<Scalars['JSONObject']['output']>;
};

export type PayloadKvReadDocAccess = {
  __typename?: 'PayloadKvReadDocAccess';
  permission: Scalars['Boolean']['output'];
  where?: Maybe<Scalars['JSONObject']['output']>;
};

export type PayloadKvUpdateAccess = {
  __typename?: 'PayloadKvUpdateAccess';
  permission: Scalars['Boolean']['output'];
  where?: Maybe<Scalars['JSONObject']['output']>;
};

export type PayloadKvUpdateDocAccess = {
  __typename?: 'PayloadKvUpdateDocAccess';
  permission: Scalars['Boolean']['output'];
  where?: Maybe<Scalars['JSONObject']['output']>;
};

export type PayloadKv_Data_Operator = {
  contains?: InputMaybe<Scalars['JSON']['input']>;
  equals?: InputMaybe<Scalars['JSON']['input']>;
  intersects?: InputMaybe<Scalars['JSON']['input']>;
  like?: InputMaybe<Scalars['JSON']['input']>;
  not_equals?: InputMaybe<Scalars['JSON']['input']>;
  within?: InputMaybe<Scalars['JSON']['input']>;
};

export type PayloadKv_Id_Operator = {
  equals?: InputMaybe<Scalars['Int']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  greater_than?: InputMaybe<Scalars['Int']['input']>;
  greater_than_equal?: InputMaybe<Scalars['Int']['input']>;
  less_than?: InputMaybe<Scalars['Int']['input']>;
  less_than_equal?: InputMaybe<Scalars['Int']['input']>;
  not_equals?: InputMaybe<Scalars['Int']['input']>;
};

export type PayloadKv_Key_Operator = {
  all?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  contains?: InputMaybe<Scalars['String']['input']>;
  equals?: InputMaybe<Scalars['String']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  like?: InputMaybe<Scalars['String']['input']>;
  not_equals?: InputMaybe<Scalars['String']['input']>;
  not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type PayloadKv_Where = {
  AND?: InputMaybe<Array<InputMaybe<PayloadKv_Where_And>>>;
  OR?: InputMaybe<Array<InputMaybe<PayloadKv_Where_Or>>>;
  data?: InputMaybe<PayloadKv_Data_Operator>;
  id?: InputMaybe<PayloadKv_Id_Operator>;
  key?: InputMaybe<PayloadKv_Key_Operator>;
};

export type PayloadKv_Where_And = {
  AND?: InputMaybe<Array<InputMaybe<PayloadKv_Where_And>>>;
  OR?: InputMaybe<Array<InputMaybe<PayloadKv_Where_Or>>>;
  data?: InputMaybe<PayloadKv_Data_Operator>;
  id?: InputMaybe<PayloadKv_Id_Operator>;
  key?: InputMaybe<PayloadKv_Key_Operator>;
};

export type PayloadKv_Where_Or = {
  AND?: InputMaybe<Array<InputMaybe<PayloadKv_Where_And>>>;
  OR?: InputMaybe<Array<InputMaybe<PayloadKv_Where_Or>>>;
  data?: InputMaybe<PayloadKv_Data_Operator>;
  id?: InputMaybe<PayloadKv_Id_Operator>;
  key?: InputMaybe<PayloadKv_Key_Operator>;
};

export type PayloadKvs = {
  __typename?: 'PayloadKvs';
  docs: Array<PayloadKv>;
  hasNextPage: Scalars['Boolean']['output'];
  hasPrevPage: Scalars['Boolean']['output'];
  limit: Scalars['Int']['output'];
  nextPage?: Maybe<Scalars['Int']['output']>;
  offset?: Maybe<Scalars['Int']['output']>;
  page: Scalars['Int']['output'];
  pagingCounter: Scalars['Int']['output'];
  prevPage?: Maybe<Scalars['Int']['output']>;
  totalDocs: Scalars['Int']['output'];
  totalPages: Scalars['Int']['output'];
};

export type PayloadLockedDocument = {
  __typename?: 'PayloadLockedDocument';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  document?: Maybe<PayloadLockedDocument_Document_Relationship>;
  globalSlug?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  user?: Maybe<PayloadLockedDocument_User_Relationship>;
};


export type PayloadLockedDocumentDocumentArgs = {
  draft?: InputMaybe<Scalars['Boolean']['input']>;
};

export type PayloadLockedDocumentUpdate_DocumentRelationshipInput = {
  relationTo?: InputMaybe<PayloadLockedDocumentUpdate_DocumentRelationshipInputRelationTo>;
  value?: InputMaybe<Scalars['JSON']['input']>;
};

export enum PayloadLockedDocumentUpdate_DocumentRelationshipInputRelationTo {
  Content = 'content',
  Episodes = 'episodes',
  Favorites = 'favorites',
  Genres = 'genres',
  Media = 'media',
  SearchResults = 'search_results',
  Seasons = 'seasons',
  Users = 'users'
}

export type PayloadLockedDocumentUpdate_UserRelationshipInput = {
  relationTo?: InputMaybe<PayloadLockedDocumentUpdate_UserRelationshipInputRelationTo>;
  value?: InputMaybe<Scalars['JSON']['input']>;
};

export enum PayloadLockedDocumentUpdate_UserRelationshipInputRelationTo {
  Users = 'users'
}

export type PayloadLockedDocument_Document = Content | Episode | Favorite | Genre | Media | SearchResult | Season | User;

export type PayloadLockedDocument_DocumentRelationshipInput = {
  relationTo?: InputMaybe<PayloadLockedDocument_DocumentRelationshipInputRelationTo>;
  value?: InputMaybe<Scalars['JSON']['input']>;
};

export enum PayloadLockedDocument_DocumentRelationshipInputRelationTo {
  Content = 'content',
  Episodes = 'episodes',
  Favorites = 'favorites',
  Genres = 'genres',
  Media = 'media',
  SearchResults = 'search_results',
  Seasons = 'seasons',
  Users = 'users'
}

export enum PayloadLockedDocument_Document_RelationTo {
  Content = 'content',
  Episodes = 'episodes',
  Favorites = 'favorites',
  Genres = 'genres',
  Media = 'media',
  SearchResults = 'search_results',
  Seasons = 'seasons',
  Users = 'users'
}

export type PayloadLockedDocument_Document_Relationship = {
  __typename?: 'PayloadLockedDocument_Document_Relationship';
  relationTo?: Maybe<PayloadLockedDocument_Document_RelationTo>;
  value?: Maybe<PayloadLockedDocument_Document>;
};

export type PayloadLockedDocument_User = User;

export type PayloadLockedDocument_UserRelationshipInput = {
  relationTo?: InputMaybe<PayloadLockedDocument_UserRelationshipInputRelationTo>;
  value?: InputMaybe<Scalars['JSON']['input']>;
};

export enum PayloadLockedDocument_UserRelationshipInputRelationTo {
  Users = 'users'
}

export enum PayloadLockedDocument_User_RelationTo {
  Users = 'users'
}

export type PayloadLockedDocument_User_Relationship = {
  __typename?: 'PayloadLockedDocument_User_Relationship';
  relationTo?: Maybe<PayloadLockedDocument_User_RelationTo>;
  value?: Maybe<PayloadLockedDocument_User>;
};

export type PayloadLockedDocument_CreatedAt_Operator = {
  equals?: InputMaybe<Scalars['DateTime']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  greater_than?: InputMaybe<Scalars['DateTime']['input']>;
  greater_than_equal?: InputMaybe<Scalars['DateTime']['input']>;
  less_than?: InputMaybe<Scalars['DateTime']['input']>;
  less_than_equal?: InputMaybe<Scalars['DateTime']['input']>;
  like?: InputMaybe<Scalars['DateTime']['input']>;
  not_equals?: InputMaybe<Scalars['DateTime']['input']>;
};

export type PayloadLockedDocument_Document_Relation = {
  relationTo?: InputMaybe<PayloadLockedDocument_Document_Relation_RelationTo>;
  value?: InputMaybe<Scalars['JSON']['input']>;
};

export enum PayloadLockedDocument_Document_Relation_RelationTo {
  Content = 'content',
  Episodes = 'episodes',
  Favorites = 'favorites',
  Genres = 'genres',
  Media = 'media',
  SearchResults = 'search_results',
  Seasons = 'seasons',
  Users = 'users'
}

export type PayloadLockedDocument_GlobalSlug_Operator = {
  all?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  contains?: InputMaybe<Scalars['String']['input']>;
  equals?: InputMaybe<Scalars['String']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  like?: InputMaybe<Scalars['String']['input']>;
  not_equals?: InputMaybe<Scalars['String']['input']>;
  not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type PayloadLockedDocument_Id_Operator = {
  equals?: InputMaybe<Scalars['Int']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  greater_than?: InputMaybe<Scalars['Int']['input']>;
  greater_than_equal?: InputMaybe<Scalars['Int']['input']>;
  less_than?: InputMaybe<Scalars['Int']['input']>;
  less_than_equal?: InputMaybe<Scalars['Int']['input']>;
  not_equals?: InputMaybe<Scalars['Int']['input']>;
};

export type PayloadLockedDocument_UpdatedAt_Operator = {
  equals?: InputMaybe<Scalars['DateTime']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  greater_than?: InputMaybe<Scalars['DateTime']['input']>;
  greater_than_equal?: InputMaybe<Scalars['DateTime']['input']>;
  less_than?: InputMaybe<Scalars['DateTime']['input']>;
  less_than_equal?: InputMaybe<Scalars['DateTime']['input']>;
  like?: InputMaybe<Scalars['DateTime']['input']>;
  not_equals?: InputMaybe<Scalars['DateTime']['input']>;
};

export type PayloadLockedDocument_User_Relation = {
  relationTo?: InputMaybe<PayloadLockedDocument_User_Relation_RelationTo>;
  value?: InputMaybe<Scalars['JSON']['input']>;
};

export enum PayloadLockedDocument_User_Relation_RelationTo {
  Users = 'users'
}

export type PayloadLockedDocument_Where = {
  AND?: InputMaybe<Array<InputMaybe<PayloadLockedDocument_Where_And>>>;
  OR?: InputMaybe<Array<InputMaybe<PayloadLockedDocument_Where_Or>>>;
  createdAt?: InputMaybe<PayloadLockedDocument_CreatedAt_Operator>;
  document?: InputMaybe<PayloadLockedDocument_Document_Relation>;
  globalSlug?: InputMaybe<PayloadLockedDocument_GlobalSlug_Operator>;
  id?: InputMaybe<PayloadLockedDocument_Id_Operator>;
  updatedAt?: InputMaybe<PayloadLockedDocument_UpdatedAt_Operator>;
  user?: InputMaybe<PayloadLockedDocument_User_Relation>;
};

export type PayloadLockedDocument_Where_And = {
  AND?: InputMaybe<Array<InputMaybe<PayloadLockedDocument_Where_And>>>;
  OR?: InputMaybe<Array<InputMaybe<PayloadLockedDocument_Where_Or>>>;
  createdAt?: InputMaybe<PayloadLockedDocument_CreatedAt_Operator>;
  document?: InputMaybe<PayloadLockedDocument_Document_Relation>;
  globalSlug?: InputMaybe<PayloadLockedDocument_GlobalSlug_Operator>;
  id?: InputMaybe<PayloadLockedDocument_Id_Operator>;
  updatedAt?: InputMaybe<PayloadLockedDocument_UpdatedAt_Operator>;
  user?: InputMaybe<PayloadLockedDocument_User_Relation>;
};

export type PayloadLockedDocument_Where_Or = {
  AND?: InputMaybe<Array<InputMaybe<PayloadLockedDocument_Where_And>>>;
  OR?: InputMaybe<Array<InputMaybe<PayloadLockedDocument_Where_Or>>>;
  createdAt?: InputMaybe<PayloadLockedDocument_CreatedAt_Operator>;
  document?: InputMaybe<PayloadLockedDocument_Document_Relation>;
  globalSlug?: InputMaybe<PayloadLockedDocument_GlobalSlug_Operator>;
  id?: InputMaybe<PayloadLockedDocument_Id_Operator>;
  updatedAt?: InputMaybe<PayloadLockedDocument_UpdatedAt_Operator>;
  user?: InputMaybe<PayloadLockedDocument_User_Relation>;
};

export type PayloadLockedDocuments = {
  __typename?: 'PayloadLockedDocuments';
  docs: Array<PayloadLockedDocument>;
  hasNextPage: Scalars['Boolean']['output'];
  hasPrevPage: Scalars['Boolean']['output'];
  limit: Scalars['Int']['output'];
  nextPage?: Maybe<Scalars['Int']['output']>;
  offset?: Maybe<Scalars['Int']['output']>;
  page: Scalars['Int']['output'];
  pagingCounter: Scalars['Int']['output'];
  prevPage?: Maybe<Scalars['Int']['output']>;
  totalDocs: Scalars['Int']['output'];
  totalPages: Scalars['Int']['output'];
};

export type PayloadLockedDocumentsCreateAccess = {
  __typename?: 'PayloadLockedDocumentsCreateAccess';
  permission: Scalars['Boolean']['output'];
  where?: Maybe<Scalars['JSONObject']['output']>;
};

export type PayloadLockedDocumentsCreateDocAccess = {
  __typename?: 'PayloadLockedDocumentsCreateDocAccess';
  permission: Scalars['Boolean']['output'];
  where?: Maybe<Scalars['JSONObject']['output']>;
};

export type PayloadLockedDocumentsDeleteAccess = {
  __typename?: 'PayloadLockedDocumentsDeleteAccess';
  permission: Scalars['Boolean']['output'];
  where?: Maybe<Scalars['JSONObject']['output']>;
};

export type PayloadLockedDocumentsDeleteDocAccess = {
  __typename?: 'PayloadLockedDocumentsDeleteDocAccess';
  permission: Scalars['Boolean']['output'];
  where?: Maybe<Scalars['JSONObject']['output']>;
};

export type PayloadLockedDocumentsDocAccessFields = {
  __typename?: 'PayloadLockedDocumentsDocAccessFields';
  createdAt?: Maybe<PayloadLockedDocumentsDocAccessFields_CreatedAt>;
  document?: Maybe<PayloadLockedDocumentsDocAccessFields_Document>;
  globalSlug?: Maybe<PayloadLockedDocumentsDocAccessFields_GlobalSlug>;
  updatedAt?: Maybe<PayloadLockedDocumentsDocAccessFields_UpdatedAt>;
  user?: Maybe<PayloadLockedDocumentsDocAccessFields_User>;
};

export type PayloadLockedDocumentsDocAccessFields_CreatedAt = {
  __typename?: 'PayloadLockedDocumentsDocAccessFields_createdAt';
  create?: Maybe<PayloadLockedDocumentsDocAccessFields_CreatedAt_Create>;
  delete?: Maybe<PayloadLockedDocumentsDocAccessFields_CreatedAt_Delete>;
  read?: Maybe<PayloadLockedDocumentsDocAccessFields_CreatedAt_Read>;
  update?: Maybe<PayloadLockedDocumentsDocAccessFields_CreatedAt_Update>;
};

export type PayloadLockedDocumentsDocAccessFields_CreatedAt_Create = {
  __typename?: 'PayloadLockedDocumentsDocAccessFields_createdAt_Create';
  permission: Scalars['Boolean']['output'];
};

export type PayloadLockedDocumentsDocAccessFields_CreatedAt_Delete = {
  __typename?: 'PayloadLockedDocumentsDocAccessFields_createdAt_Delete';
  permission: Scalars['Boolean']['output'];
};

export type PayloadLockedDocumentsDocAccessFields_CreatedAt_Read = {
  __typename?: 'PayloadLockedDocumentsDocAccessFields_createdAt_Read';
  permission: Scalars['Boolean']['output'];
};

export type PayloadLockedDocumentsDocAccessFields_CreatedAt_Update = {
  __typename?: 'PayloadLockedDocumentsDocAccessFields_createdAt_Update';
  permission: Scalars['Boolean']['output'];
};

export type PayloadLockedDocumentsDocAccessFields_Document = {
  __typename?: 'PayloadLockedDocumentsDocAccessFields_document';
  create?: Maybe<PayloadLockedDocumentsDocAccessFields_Document_Create>;
  delete?: Maybe<PayloadLockedDocumentsDocAccessFields_Document_Delete>;
  read?: Maybe<PayloadLockedDocumentsDocAccessFields_Document_Read>;
  update?: Maybe<PayloadLockedDocumentsDocAccessFields_Document_Update>;
};

export type PayloadLockedDocumentsDocAccessFields_Document_Create = {
  __typename?: 'PayloadLockedDocumentsDocAccessFields_document_Create';
  permission: Scalars['Boolean']['output'];
};

export type PayloadLockedDocumentsDocAccessFields_Document_Delete = {
  __typename?: 'PayloadLockedDocumentsDocAccessFields_document_Delete';
  permission: Scalars['Boolean']['output'];
};

export type PayloadLockedDocumentsDocAccessFields_Document_Read = {
  __typename?: 'PayloadLockedDocumentsDocAccessFields_document_Read';
  permission: Scalars['Boolean']['output'];
};

export type PayloadLockedDocumentsDocAccessFields_Document_Update = {
  __typename?: 'PayloadLockedDocumentsDocAccessFields_document_Update';
  permission: Scalars['Boolean']['output'];
};

export type PayloadLockedDocumentsDocAccessFields_GlobalSlug = {
  __typename?: 'PayloadLockedDocumentsDocAccessFields_globalSlug';
  create?: Maybe<PayloadLockedDocumentsDocAccessFields_GlobalSlug_Create>;
  delete?: Maybe<PayloadLockedDocumentsDocAccessFields_GlobalSlug_Delete>;
  read?: Maybe<PayloadLockedDocumentsDocAccessFields_GlobalSlug_Read>;
  update?: Maybe<PayloadLockedDocumentsDocAccessFields_GlobalSlug_Update>;
};

export type PayloadLockedDocumentsDocAccessFields_GlobalSlug_Create = {
  __typename?: 'PayloadLockedDocumentsDocAccessFields_globalSlug_Create';
  permission: Scalars['Boolean']['output'];
};

export type PayloadLockedDocumentsDocAccessFields_GlobalSlug_Delete = {
  __typename?: 'PayloadLockedDocumentsDocAccessFields_globalSlug_Delete';
  permission: Scalars['Boolean']['output'];
};

export type PayloadLockedDocumentsDocAccessFields_GlobalSlug_Read = {
  __typename?: 'PayloadLockedDocumentsDocAccessFields_globalSlug_Read';
  permission: Scalars['Boolean']['output'];
};

export type PayloadLockedDocumentsDocAccessFields_GlobalSlug_Update = {
  __typename?: 'PayloadLockedDocumentsDocAccessFields_globalSlug_Update';
  permission: Scalars['Boolean']['output'];
};

export type PayloadLockedDocumentsDocAccessFields_UpdatedAt = {
  __typename?: 'PayloadLockedDocumentsDocAccessFields_updatedAt';
  create?: Maybe<PayloadLockedDocumentsDocAccessFields_UpdatedAt_Create>;
  delete?: Maybe<PayloadLockedDocumentsDocAccessFields_UpdatedAt_Delete>;
  read?: Maybe<PayloadLockedDocumentsDocAccessFields_UpdatedAt_Read>;
  update?: Maybe<PayloadLockedDocumentsDocAccessFields_UpdatedAt_Update>;
};

export type PayloadLockedDocumentsDocAccessFields_UpdatedAt_Create = {
  __typename?: 'PayloadLockedDocumentsDocAccessFields_updatedAt_Create';
  permission: Scalars['Boolean']['output'];
};

export type PayloadLockedDocumentsDocAccessFields_UpdatedAt_Delete = {
  __typename?: 'PayloadLockedDocumentsDocAccessFields_updatedAt_Delete';
  permission: Scalars['Boolean']['output'];
};

export type PayloadLockedDocumentsDocAccessFields_UpdatedAt_Read = {
  __typename?: 'PayloadLockedDocumentsDocAccessFields_updatedAt_Read';
  permission: Scalars['Boolean']['output'];
};

export type PayloadLockedDocumentsDocAccessFields_UpdatedAt_Update = {
  __typename?: 'PayloadLockedDocumentsDocAccessFields_updatedAt_Update';
  permission: Scalars['Boolean']['output'];
};

export type PayloadLockedDocumentsDocAccessFields_User = {
  __typename?: 'PayloadLockedDocumentsDocAccessFields_user';
  create?: Maybe<PayloadLockedDocumentsDocAccessFields_User_Create>;
  delete?: Maybe<PayloadLockedDocumentsDocAccessFields_User_Delete>;
  read?: Maybe<PayloadLockedDocumentsDocAccessFields_User_Read>;
  update?: Maybe<PayloadLockedDocumentsDocAccessFields_User_Update>;
};

export type PayloadLockedDocumentsDocAccessFields_User_Create = {
  __typename?: 'PayloadLockedDocumentsDocAccessFields_user_Create';
  permission: Scalars['Boolean']['output'];
};

export type PayloadLockedDocumentsDocAccessFields_User_Delete = {
  __typename?: 'PayloadLockedDocumentsDocAccessFields_user_Delete';
  permission: Scalars['Boolean']['output'];
};

export type PayloadLockedDocumentsDocAccessFields_User_Read = {
  __typename?: 'PayloadLockedDocumentsDocAccessFields_user_Read';
  permission: Scalars['Boolean']['output'];
};

export type PayloadLockedDocumentsDocAccessFields_User_Update = {
  __typename?: 'PayloadLockedDocumentsDocAccessFields_user_Update';
  permission: Scalars['Boolean']['output'];
};

export type PayloadLockedDocumentsFields = {
  __typename?: 'PayloadLockedDocumentsFields';
  createdAt?: Maybe<PayloadLockedDocumentsFields_CreatedAt>;
  document?: Maybe<PayloadLockedDocumentsFields_Document>;
  globalSlug?: Maybe<PayloadLockedDocumentsFields_GlobalSlug>;
  updatedAt?: Maybe<PayloadLockedDocumentsFields_UpdatedAt>;
  user?: Maybe<PayloadLockedDocumentsFields_User>;
};

export type PayloadLockedDocumentsFields_CreatedAt = {
  __typename?: 'PayloadLockedDocumentsFields_createdAt';
  create?: Maybe<PayloadLockedDocumentsFields_CreatedAt_Create>;
  delete?: Maybe<PayloadLockedDocumentsFields_CreatedAt_Delete>;
  read?: Maybe<PayloadLockedDocumentsFields_CreatedAt_Read>;
  update?: Maybe<PayloadLockedDocumentsFields_CreatedAt_Update>;
};

export type PayloadLockedDocumentsFields_CreatedAt_Create = {
  __typename?: 'PayloadLockedDocumentsFields_createdAt_Create';
  permission: Scalars['Boolean']['output'];
};

export type PayloadLockedDocumentsFields_CreatedAt_Delete = {
  __typename?: 'PayloadLockedDocumentsFields_createdAt_Delete';
  permission: Scalars['Boolean']['output'];
};

export type PayloadLockedDocumentsFields_CreatedAt_Read = {
  __typename?: 'PayloadLockedDocumentsFields_createdAt_Read';
  permission: Scalars['Boolean']['output'];
};

export type PayloadLockedDocumentsFields_CreatedAt_Update = {
  __typename?: 'PayloadLockedDocumentsFields_createdAt_Update';
  permission: Scalars['Boolean']['output'];
};

export type PayloadLockedDocumentsFields_Document = {
  __typename?: 'PayloadLockedDocumentsFields_document';
  create?: Maybe<PayloadLockedDocumentsFields_Document_Create>;
  delete?: Maybe<PayloadLockedDocumentsFields_Document_Delete>;
  read?: Maybe<PayloadLockedDocumentsFields_Document_Read>;
  update?: Maybe<PayloadLockedDocumentsFields_Document_Update>;
};

export type PayloadLockedDocumentsFields_Document_Create = {
  __typename?: 'PayloadLockedDocumentsFields_document_Create';
  permission: Scalars['Boolean']['output'];
};

export type PayloadLockedDocumentsFields_Document_Delete = {
  __typename?: 'PayloadLockedDocumentsFields_document_Delete';
  permission: Scalars['Boolean']['output'];
};

export type PayloadLockedDocumentsFields_Document_Read = {
  __typename?: 'PayloadLockedDocumentsFields_document_Read';
  permission: Scalars['Boolean']['output'];
};

export type PayloadLockedDocumentsFields_Document_Update = {
  __typename?: 'PayloadLockedDocumentsFields_document_Update';
  permission: Scalars['Boolean']['output'];
};

export type PayloadLockedDocumentsFields_GlobalSlug = {
  __typename?: 'PayloadLockedDocumentsFields_globalSlug';
  create?: Maybe<PayloadLockedDocumentsFields_GlobalSlug_Create>;
  delete?: Maybe<PayloadLockedDocumentsFields_GlobalSlug_Delete>;
  read?: Maybe<PayloadLockedDocumentsFields_GlobalSlug_Read>;
  update?: Maybe<PayloadLockedDocumentsFields_GlobalSlug_Update>;
};

export type PayloadLockedDocumentsFields_GlobalSlug_Create = {
  __typename?: 'PayloadLockedDocumentsFields_globalSlug_Create';
  permission: Scalars['Boolean']['output'];
};

export type PayloadLockedDocumentsFields_GlobalSlug_Delete = {
  __typename?: 'PayloadLockedDocumentsFields_globalSlug_Delete';
  permission: Scalars['Boolean']['output'];
};

export type PayloadLockedDocumentsFields_GlobalSlug_Read = {
  __typename?: 'PayloadLockedDocumentsFields_globalSlug_Read';
  permission: Scalars['Boolean']['output'];
};

export type PayloadLockedDocumentsFields_GlobalSlug_Update = {
  __typename?: 'PayloadLockedDocumentsFields_globalSlug_Update';
  permission: Scalars['Boolean']['output'];
};

export type PayloadLockedDocumentsFields_UpdatedAt = {
  __typename?: 'PayloadLockedDocumentsFields_updatedAt';
  create?: Maybe<PayloadLockedDocumentsFields_UpdatedAt_Create>;
  delete?: Maybe<PayloadLockedDocumentsFields_UpdatedAt_Delete>;
  read?: Maybe<PayloadLockedDocumentsFields_UpdatedAt_Read>;
  update?: Maybe<PayloadLockedDocumentsFields_UpdatedAt_Update>;
};

export type PayloadLockedDocumentsFields_UpdatedAt_Create = {
  __typename?: 'PayloadLockedDocumentsFields_updatedAt_Create';
  permission: Scalars['Boolean']['output'];
};

export type PayloadLockedDocumentsFields_UpdatedAt_Delete = {
  __typename?: 'PayloadLockedDocumentsFields_updatedAt_Delete';
  permission: Scalars['Boolean']['output'];
};

export type PayloadLockedDocumentsFields_UpdatedAt_Read = {
  __typename?: 'PayloadLockedDocumentsFields_updatedAt_Read';
  permission: Scalars['Boolean']['output'];
};

export type PayloadLockedDocumentsFields_UpdatedAt_Update = {
  __typename?: 'PayloadLockedDocumentsFields_updatedAt_Update';
  permission: Scalars['Boolean']['output'];
};

export type PayloadLockedDocumentsFields_User = {
  __typename?: 'PayloadLockedDocumentsFields_user';
  create?: Maybe<PayloadLockedDocumentsFields_User_Create>;
  delete?: Maybe<PayloadLockedDocumentsFields_User_Delete>;
  read?: Maybe<PayloadLockedDocumentsFields_User_Read>;
  update?: Maybe<PayloadLockedDocumentsFields_User_Update>;
};

export type PayloadLockedDocumentsFields_User_Create = {
  __typename?: 'PayloadLockedDocumentsFields_user_Create';
  permission: Scalars['Boolean']['output'];
};

export type PayloadLockedDocumentsFields_User_Delete = {
  __typename?: 'PayloadLockedDocumentsFields_user_Delete';
  permission: Scalars['Boolean']['output'];
};

export type PayloadLockedDocumentsFields_User_Read = {
  __typename?: 'PayloadLockedDocumentsFields_user_Read';
  permission: Scalars['Boolean']['output'];
};

export type PayloadLockedDocumentsFields_User_Update = {
  __typename?: 'PayloadLockedDocumentsFields_user_Update';
  permission: Scalars['Boolean']['output'];
};

export type PayloadLockedDocumentsReadAccess = {
  __typename?: 'PayloadLockedDocumentsReadAccess';
  permission: Scalars['Boolean']['output'];
  where?: Maybe<Scalars['JSONObject']['output']>;
};

export type PayloadLockedDocumentsReadDocAccess = {
  __typename?: 'PayloadLockedDocumentsReadDocAccess';
  permission: Scalars['Boolean']['output'];
  where?: Maybe<Scalars['JSONObject']['output']>;
};

export type PayloadLockedDocumentsUpdateAccess = {
  __typename?: 'PayloadLockedDocumentsUpdateAccess';
  permission: Scalars['Boolean']['output'];
  where?: Maybe<Scalars['JSONObject']['output']>;
};

export type PayloadLockedDocumentsUpdateDocAccess = {
  __typename?: 'PayloadLockedDocumentsUpdateDocAccess';
  permission: Scalars['Boolean']['output'];
  where?: Maybe<Scalars['JSONObject']['output']>;
};

export type PayloadPreference = {
  __typename?: 'PayloadPreference';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['Int']['output'];
  key?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  user?: Maybe<PayloadPreference_User_Relationship>;
  value?: Maybe<Scalars['JSON']['output']>;
};

export type PayloadPreferenceUpdate_UserRelationshipInput = {
  relationTo?: InputMaybe<PayloadPreferenceUpdate_UserRelationshipInputRelationTo>;
  value?: InputMaybe<Scalars['JSON']['input']>;
};

export enum PayloadPreferenceUpdate_UserRelationshipInputRelationTo {
  Users = 'users'
}

export type PayloadPreference_User = User;

export type PayloadPreference_UserRelationshipInput = {
  relationTo?: InputMaybe<PayloadPreference_UserRelationshipInputRelationTo>;
  value?: InputMaybe<Scalars['JSON']['input']>;
};

export enum PayloadPreference_UserRelationshipInputRelationTo {
  Users = 'users'
}

export enum PayloadPreference_User_RelationTo {
  Users = 'users'
}

export type PayloadPreference_User_Relationship = {
  __typename?: 'PayloadPreference_User_Relationship';
  relationTo?: Maybe<PayloadPreference_User_RelationTo>;
  value?: Maybe<PayloadPreference_User>;
};

export type PayloadPreference_CreatedAt_Operator = {
  equals?: InputMaybe<Scalars['DateTime']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  greater_than?: InputMaybe<Scalars['DateTime']['input']>;
  greater_than_equal?: InputMaybe<Scalars['DateTime']['input']>;
  less_than?: InputMaybe<Scalars['DateTime']['input']>;
  less_than_equal?: InputMaybe<Scalars['DateTime']['input']>;
  like?: InputMaybe<Scalars['DateTime']['input']>;
  not_equals?: InputMaybe<Scalars['DateTime']['input']>;
};

export type PayloadPreference_Id_Operator = {
  equals?: InputMaybe<Scalars['Int']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  greater_than?: InputMaybe<Scalars['Int']['input']>;
  greater_than_equal?: InputMaybe<Scalars['Int']['input']>;
  less_than?: InputMaybe<Scalars['Int']['input']>;
  less_than_equal?: InputMaybe<Scalars['Int']['input']>;
  not_equals?: InputMaybe<Scalars['Int']['input']>;
};

export type PayloadPreference_Key_Operator = {
  all?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  contains?: InputMaybe<Scalars['String']['input']>;
  equals?: InputMaybe<Scalars['String']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  like?: InputMaybe<Scalars['String']['input']>;
  not_equals?: InputMaybe<Scalars['String']['input']>;
  not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type PayloadPreference_UpdatedAt_Operator = {
  equals?: InputMaybe<Scalars['DateTime']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  greater_than?: InputMaybe<Scalars['DateTime']['input']>;
  greater_than_equal?: InputMaybe<Scalars['DateTime']['input']>;
  less_than?: InputMaybe<Scalars['DateTime']['input']>;
  less_than_equal?: InputMaybe<Scalars['DateTime']['input']>;
  like?: InputMaybe<Scalars['DateTime']['input']>;
  not_equals?: InputMaybe<Scalars['DateTime']['input']>;
};

export type PayloadPreference_User_Relation = {
  relationTo?: InputMaybe<PayloadPreference_User_Relation_RelationTo>;
  value?: InputMaybe<Scalars['JSON']['input']>;
};

export enum PayloadPreference_User_Relation_RelationTo {
  Users = 'users'
}

export type PayloadPreference_Value_Operator = {
  contains?: InputMaybe<Scalars['JSON']['input']>;
  equals?: InputMaybe<Scalars['JSON']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  intersects?: InputMaybe<Scalars['JSON']['input']>;
  like?: InputMaybe<Scalars['JSON']['input']>;
  not_equals?: InputMaybe<Scalars['JSON']['input']>;
  within?: InputMaybe<Scalars['JSON']['input']>;
};

export type PayloadPreference_Where = {
  AND?: InputMaybe<Array<InputMaybe<PayloadPreference_Where_And>>>;
  OR?: InputMaybe<Array<InputMaybe<PayloadPreference_Where_Or>>>;
  createdAt?: InputMaybe<PayloadPreference_CreatedAt_Operator>;
  id?: InputMaybe<PayloadPreference_Id_Operator>;
  key?: InputMaybe<PayloadPreference_Key_Operator>;
  updatedAt?: InputMaybe<PayloadPreference_UpdatedAt_Operator>;
  user?: InputMaybe<PayloadPreference_User_Relation>;
  value?: InputMaybe<PayloadPreference_Value_Operator>;
};

export type PayloadPreference_Where_And = {
  AND?: InputMaybe<Array<InputMaybe<PayloadPreference_Where_And>>>;
  OR?: InputMaybe<Array<InputMaybe<PayloadPreference_Where_Or>>>;
  createdAt?: InputMaybe<PayloadPreference_CreatedAt_Operator>;
  id?: InputMaybe<PayloadPreference_Id_Operator>;
  key?: InputMaybe<PayloadPreference_Key_Operator>;
  updatedAt?: InputMaybe<PayloadPreference_UpdatedAt_Operator>;
  user?: InputMaybe<PayloadPreference_User_Relation>;
  value?: InputMaybe<PayloadPreference_Value_Operator>;
};

export type PayloadPreference_Where_Or = {
  AND?: InputMaybe<Array<InputMaybe<PayloadPreference_Where_And>>>;
  OR?: InputMaybe<Array<InputMaybe<PayloadPreference_Where_Or>>>;
  createdAt?: InputMaybe<PayloadPreference_CreatedAt_Operator>;
  id?: InputMaybe<PayloadPreference_Id_Operator>;
  key?: InputMaybe<PayloadPreference_Key_Operator>;
  updatedAt?: InputMaybe<PayloadPreference_UpdatedAt_Operator>;
  user?: InputMaybe<PayloadPreference_User_Relation>;
  value?: InputMaybe<PayloadPreference_Value_Operator>;
};

export type PayloadPreferences = {
  __typename?: 'PayloadPreferences';
  docs: Array<PayloadPreference>;
  hasNextPage: Scalars['Boolean']['output'];
  hasPrevPage: Scalars['Boolean']['output'];
  limit: Scalars['Int']['output'];
  nextPage?: Maybe<Scalars['Int']['output']>;
  offset?: Maybe<Scalars['Int']['output']>;
  page: Scalars['Int']['output'];
  pagingCounter: Scalars['Int']['output'];
  prevPage?: Maybe<Scalars['Int']['output']>;
  totalDocs: Scalars['Int']['output'];
  totalPages: Scalars['Int']['output'];
};

export type PayloadPreferencesCreateAccess = {
  __typename?: 'PayloadPreferencesCreateAccess';
  permission: Scalars['Boolean']['output'];
  where?: Maybe<Scalars['JSONObject']['output']>;
};

export type PayloadPreferencesCreateDocAccess = {
  __typename?: 'PayloadPreferencesCreateDocAccess';
  permission: Scalars['Boolean']['output'];
  where?: Maybe<Scalars['JSONObject']['output']>;
};

export type PayloadPreferencesDeleteAccess = {
  __typename?: 'PayloadPreferencesDeleteAccess';
  permission: Scalars['Boolean']['output'];
  where?: Maybe<Scalars['JSONObject']['output']>;
};

export type PayloadPreferencesDeleteDocAccess = {
  __typename?: 'PayloadPreferencesDeleteDocAccess';
  permission: Scalars['Boolean']['output'];
  where?: Maybe<Scalars['JSONObject']['output']>;
};

export type PayloadPreferencesDocAccessFields = {
  __typename?: 'PayloadPreferencesDocAccessFields';
  createdAt?: Maybe<PayloadPreferencesDocAccessFields_CreatedAt>;
  key?: Maybe<PayloadPreferencesDocAccessFields_Key>;
  updatedAt?: Maybe<PayloadPreferencesDocAccessFields_UpdatedAt>;
  user?: Maybe<PayloadPreferencesDocAccessFields_User>;
  value?: Maybe<PayloadPreferencesDocAccessFields_Value>;
};

export type PayloadPreferencesDocAccessFields_CreatedAt = {
  __typename?: 'PayloadPreferencesDocAccessFields_createdAt';
  create?: Maybe<PayloadPreferencesDocAccessFields_CreatedAt_Create>;
  delete?: Maybe<PayloadPreferencesDocAccessFields_CreatedAt_Delete>;
  read?: Maybe<PayloadPreferencesDocAccessFields_CreatedAt_Read>;
  update?: Maybe<PayloadPreferencesDocAccessFields_CreatedAt_Update>;
};

export type PayloadPreferencesDocAccessFields_CreatedAt_Create = {
  __typename?: 'PayloadPreferencesDocAccessFields_createdAt_Create';
  permission: Scalars['Boolean']['output'];
};

export type PayloadPreferencesDocAccessFields_CreatedAt_Delete = {
  __typename?: 'PayloadPreferencesDocAccessFields_createdAt_Delete';
  permission: Scalars['Boolean']['output'];
};

export type PayloadPreferencesDocAccessFields_CreatedAt_Read = {
  __typename?: 'PayloadPreferencesDocAccessFields_createdAt_Read';
  permission: Scalars['Boolean']['output'];
};

export type PayloadPreferencesDocAccessFields_CreatedAt_Update = {
  __typename?: 'PayloadPreferencesDocAccessFields_createdAt_Update';
  permission: Scalars['Boolean']['output'];
};

export type PayloadPreferencesDocAccessFields_Key = {
  __typename?: 'PayloadPreferencesDocAccessFields_key';
  create?: Maybe<PayloadPreferencesDocAccessFields_Key_Create>;
  delete?: Maybe<PayloadPreferencesDocAccessFields_Key_Delete>;
  read?: Maybe<PayloadPreferencesDocAccessFields_Key_Read>;
  update?: Maybe<PayloadPreferencesDocAccessFields_Key_Update>;
};

export type PayloadPreferencesDocAccessFields_Key_Create = {
  __typename?: 'PayloadPreferencesDocAccessFields_key_Create';
  permission: Scalars['Boolean']['output'];
};

export type PayloadPreferencesDocAccessFields_Key_Delete = {
  __typename?: 'PayloadPreferencesDocAccessFields_key_Delete';
  permission: Scalars['Boolean']['output'];
};

export type PayloadPreferencesDocAccessFields_Key_Read = {
  __typename?: 'PayloadPreferencesDocAccessFields_key_Read';
  permission: Scalars['Boolean']['output'];
};

export type PayloadPreferencesDocAccessFields_Key_Update = {
  __typename?: 'PayloadPreferencesDocAccessFields_key_Update';
  permission: Scalars['Boolean']['output'];
};

export type PayloadPreferencesDocAccessFields_UpdatedAt = {
  __typename?: 'PayloadPreferencesDocAccessFields_updatedAt';
  create?: Maybe<PayloadPreferencesDocAccessFields_UpdatedAt_Create>;
  delete?: Maybe<PayloadPreferencesDocAccessFields_UpdatedAt_Delete>;
  read?: Maybe<PayloadPreferencesDocAccessFields_UpdatedAt_Read>;
  update?: Maybe<PayloadPreferencesDocAccessFields_UpdatedAt_Update>;
};

export type PayloadPreferencesDocAccessFields_UpdatedAt_Create = {
  __typename?: 'PayloadPreferencesDocAccessFields_updatedAt_Create';
  permission: Scalars['Boolean']['output'];
};

export type PayloadPreferencesDocAccessFields_UpdatedAt_Delete = {
  __typename?: 'PayloadPreferencesDocAccessFields_updatedAt_Delete';
  permission: Scalars['Boolean']['output'];
};

export type PayloadPreferencesDocAccessFields_UpdatedAt_Read = {
  __typename?: 'PayloadPreferencesDocAccessFields_updatedAt_Read';
  permission: Scalars['Boolean']['output'];
};

export type PayloadPreferencesDocAccessFields_UpdatedAt_Update = {
  __typename?: 'PayloadPreferencesDocAccessFields_updatedAt_Update';
  permission: Scalars['Boolean']['output'];
};

export type PayloadPreferencesDocAccessFields_User = {
  __typename?: 'PayloadPreferencesDocAccessFields_user';
  create?: Maybe<PayloadPreferencesDocAccessFields_User_Create>;
  delete?: Maybe<PayloadPreferencesDocAccessFields_User_Delete>;
  read?: Maybe<PayloadPreferencesDocAccessFields_User_Read>;
  update?: Maybe<PayloadPreferencesDocAccessFields_User_Update>;
};

export type PayloadPreferencesDocAccessFields_User_Create = {
  __typename?: 'PayloadPreferencesDocAccessFields_user_Create';
  permission: Scalars['Boolean']['output'];
};

export type PayloadPreferencesDocAccessFields_User_Delete = {
  __typename?: 'PayloadPreferencesDocAccessFields_user_Delete';
  permission: Scalars['Boolean']['output'];
};

export type PayloadPreferencesDocAccessFields_User_Read = {
  __typename?: 'PayloadPreferencesDocAccessFields_user_Read';
  permission: Scalars['Boolean']['output'];
};

export type PayloadPreferencesDocAccessFields_User_Update = {
  __typename?: 'PayloadPreferencesDocAccessFields_user_Update';
  permission: Scalars['Boolean']['output'];
};

export type PayloadPreferencesDocAccessFields_Value = {
  __typename?: 'PayloadPreferencesDocAccessFields_value';
  create?: Maybe<PayloadPreferencesDocAccessFields_Value_Create>;
  delete?: Maybe<PayloadPreferencesDocAccessFields_Value_Delete>;
  read?: Maybe<PayloadPreferencesDocAccessFields_Value_Read>;
  update?: Maybe<PayloadPreferencesDocAccessFields_Value_Update>;
};

export type PayloadPreferencesDocAccessFields_Value_Create = {
  __typename?: 'PayloadPreferencesDocAccessFields_value_Create';
  permission: Scalars['Boolean']['output'];
};

export type PayloadPreferencesDocAccessFields_Value_Delete = {
  __typename?: 'PayloadPreferencesDocAccessFields_value_Delete';
  permission: Scalars['Boolean']['output'];
};

export type PayloadPreferencesDocAccessFields_Value_Read = {
  __typename?: 'PayloadPreferencesDocAccessFields_value_Read';
  permission: Scalars['Boolean']['output'];
};

export type PayloadPreferencesDocAccessFields_Value_Update = {
  __typename?: 'PayloadPreferencesDocAccessFields_value_Update';
  permission: Scalars['Boolean']['output'];
};

export type PayloadPreferencesFields = {
  __typename?: 'PayloadPreferencesFields';
  createdAt?: Maybe<PayloadPreferencesFields_CreatedAt>;
  key?: Maybe<PayloadPreferencesFields_Key>;
  updatedAt?: Maybe<PayloadPreferencesFields_UpdatedAt>;
  user?: Maybe<PayloadPreferencesFields_User>;
  value?: Maybe<PayloadPreferencesFields_Value>;
};

export type PayloadPreferencesFields_CreatedAt = {
  __typename?: 'PayloadPreferencesFields_createdAt';
  create?: Maybe<PayloadPreferencesFields_CreatedAt_Create>;
  delete?: Maybe<PayloadPreferencesFields_CreatedAt_Delete>;
  read?: Maybe<PayloadPreferencesFields_CreatedAt_Read>;
  update?: Maybe<PayloadPreferencesFields_CreatedAt_Update>;
};

export type PayloadPreferencesFields_CreatedAt_Create = {
  __typename?: 'PayloadPreferencesFields_createdAt_Create';
  permission: Scalars['Boolean']['output'];
};

export type PayloadPreferencesFields_CreatedAt_Delete = {
  __typename?: 'PayloadPreferencesFields_createdAt_Delete';
  permission: Scalars['Boolean']['output'];
};

export type PayloadPreferencesFields_CreatedAt_Read = {
  __typename?: 'PayloadPreferencesFields_createdAt_Read';
  permission: Scalars['Boolean']['output'];
};

export type PayloadPreferencesFields_CreatedAt_Update = {
  __typename?: 'PayloadPreferencesFields_createdAt_Update';
  permission: Scalars['Boolean']['output'];
};

export type PayloadPreferencesFields_Key = {
  __typename?: 'PayloadPreferencesFields_key';
  create?: Maybe<PayloadPreferencesFields_Key_Create>;
  delete?: Maybe<PayloadPreferencesFields_Key_Delete>;
  read?: Maybe<PayloadPreferencesFields_Key_Read>;
  update?: Maybe<PayloadPreferencesFields_Key_Update>;
};

export type PayloadPreferencesFields_Key_Create = {
  __typename?: 'PayloadPreferencesFields_key_Create';
  permission: Scalars['Boolean']['output'];
};

export type PayloadPreferencesFields_Key_Delete = {
  __typename?: 'PayloadPreferencesFields_key_Delete';
  permission: Scalars['Boolean']['output'];
};

export type PayloadPreferencesFields_Key_Read = {
  __typename?: 'PayloadPreferencesFields_key_Read';
  permission: Scalars['Boolean']['output'];
};

export type PayloadPreferencesFields_Key_Update = {
  __typename?: 'PayloadPreferencesFields_key_Update';
  permission: Scalars['Boolean']['output'];
};

export type PayloadPreferencesFields_UpdatedAt = {
  __typename?: 'PayloadPreferencesFields_updatedAt';
  create?: Maybe<PayloadPreferencesFields_UpdatedAt_Create>;
  delete?: Maybe<PayloadPreferencesFields_UpdatedAt_Delete>;
  read?: Maybe<PayloadPreferencesFields_UpdatedAt_Read>;
  update?: Maybe<PayloadPreferencesFields_UpdatedAt_Update>;
};

export type PayloadPreferencesFields_UpdatedAt_Create = {
  __typename?: 'PayloadPreferencesFields_updatedAt_Create';
  permission: Scalars['Boolean']['output'];
};

export type PayloadPreferencesFields_UpdatedAt_Delete = {
  __typename?: 'PayloadPreferencesFields_updatedAt_Delete';
  permission: Scalars['Boolean']['output'];
};

export type PayloadPreferencesFields_UpdatedAt_Read = {
  __typename?: 'PayloadPreferencesFields_updatedAt_Read';
  permission: Scalars['Boolean']['output'];
};

export type PayloadPreferencesFields_UpdatedAt_Update = {
  __typename?: 'PayloadPreferencesFields_updatedAt_Update';
  permission: Scalars['Boolean']['output'];
};

export type PayloadPreferencesFields_User = {
  __typename?: 'PayloadPreferencesFields_user';
  create?: Maybe<PayloadPreferencesFields_User_Create>;
  delete?: Maybe<PayloadPreferencesFields_User_Delete>;
  read?: Maybe<PayloadPreferencesFields_User_Read>;
  update?: Maybe<PayloadPreferencesFields_User_Update>;
};

export type PayloadPreferencesFields_User_Create = {
  __typename?: 'PayloadPreferencesFields_user_Create';
  permission: Scalars['Boolean']['output'];
};

export type PayloadPreferencesFields_User_Delete = {
  __typename?: 'PayloadPreferencesFields_user_Delete';
  permission: Scalars['Boolean']['output'];
};

export type PayloadPreferencesFields_User_Read = {
  __typename?: 'PayloadPreferencesFields_user_Read';
  permission: Scalars['Boolean']['output'];
};

export type PayloadPreferencesFields_User_Update = {
  __typename?: 'PayloadPreferencesFields_user_Update';
  permission: Scalars['Boolean']['output'];
};

export type PayloadPreferencesFields_Value = {
  __typename?: 'PayloadPreferencesFields_value';
  create?: Maybe<PayloadPreferencesFields_Value_Create>;
  delete?: Maybe<PayloadPreferencesFields_Value_Delete>;
  read?: Maybe<PayloadPreferencesFields_Value_Read>;
  update?: Maybe<PayloadPreferencesFields_Value_Update>;
};

export type PayloadPreferencesFields_Value_Create = {
  __typename?: 'PayloadPreferencesFields_value_Create';
  permission: Scalars['Boolean']['output'];
};

export type PayloadPreferencesFields_Value_Delete = {
  __typename?: 'PayloadPreferencesFields_value_Delete';
  permission: Scalars['Boolean']['output'];
};

export type PayloadPreferencesFields_Value_Read = {
  __typename?: 'PayloadPreferencesFields_value_Read';
  permission: Scalars['Boolean']['output'];
};

export type PayloadPreferencesFields_Value_Update = {
  __typename?: 'PayloadPreferencesFields_value_Update';
  permission: Scalars['Boolean']['output'];
};

export type PayloadPreferencesReadAccess = {
  __typename?: 'PayloadPreferencesReadAccess';
  permission: Scalars['Boolean']['output'];
  where?: Maybe<Scalars['JSONObject']['output']>;
};

export type PayloadPreferencesReadDocAccess = {
  __typename?: 'PayloadPreferencesReadDocAccess';
  permission: Scalars['Boolean']['output'];
  where?: Maybe<Scalars['JSONObject']['output']>;
};

export type PayloadPreferencesUpdateAccess = {
  __typename?: 'PayloadPreferencesUpdateAccess';
  permission: Scalars['Boolean']['output'];
  where?: Maybe<Scalars['JSONObject']['output']>;
};

export type PayloadPreferencesUpdateDocAccess = {
  __typename?: 'PayloadPreferencesUpdateDocAccess';
  permission: Scalars['Boolean']['output'];
  where?: Maybe<Scalars['JSONObject']['output']>;
};

export type Query = {
  __typename?: 'Query';
  Access?: Maybe<Access>;
  Content?: Maybe<Content>;
  Contents?: Maybe<Contents>;
  Episode?: Maybe<Episode>;
  Episodes?: Maybe<Episodes>;
  Favorite?: Maybe<Favorite>;
  Favorites?: Maybe<Favorites>;
  Genre?: Maybe<Genre>;
  Genres?: Maybe<Genres>;
  Media?: Maybe<Media>;
  PayloadKv?: Maybe<PayloadKv>;
  PayloadKvs?: Maybe<PayloadKvs>;
  PayloadLockedDocument?: Maybe<PayloadLockedDocument>;
  PayloadLockedDocuments?: Maybe<PayloadLockedDocuments>;
  PayloadPreference?: Maybe<PayloadPreference>;
  PayloadPreferences?: Maybe<PayloadPreferences>;
  SearchResult?: Maybe<SearchResult>;
  SearchResults?: Maybe<SearchResults>;
  Season?: Maybe<Season>;
  Seasons?: Maybe<Seasons>;
  User?: Maybe<User>;
  Users?: Maybe<Users>;
  allMedia?: Maybe<AllMedia>;
  countContents?: Maybe<CountContents>;
  countEpisodes?: Maybe<CountEpisodes>;
  countFavorites?: Maybe<CountFavorites>;
  countGenres?: Maybe<CountGenres>;
  countPayloadKvs?: Maybe<CountPayloadKvs>;
  countPayloadLockedDocuments?: Maybe<CountPayloadLockedDocuments>;
  countPayloadPreferences?: Maybe<CountPayloadPreferences>;
  countSearchResults?: Maybe<CountSearchResults>;
  countSeasons?: Maybe<CountSeasons>;
  countUsers?: Maybe<CountUsers>;
  countallMedia?: Maybe<CountallMedia>;
  docAccessContent?: Maybe<ContentDocAccess>;
  docAccessEpisode?: Maybe<EpisodesDocAccess>;
  docAccessFavorite?: Maybe<FavoritesDocAccess>;
  docAccessGenre?: Maybe<GenresDocAccess>;
  docAccessMedia?: Maybe<MediaDocAccess>;
  docAccessPayloadKv?: Maybe<Payload_KvDocAccess>;
  docAccessPayloadLockedDocument?: Maybe<Payload_Locked_DocumentsDocAccess>;
  docAccessPayloadPreference?: Maybe<Payload_PreferencesDocAccess>;
  docAccessSearchResult?: Maybe<Search_ResultsDocAccess>;
  docAccessSeason?: Maybe<SeasonsDocAccess>;
  docAccessUser?: Maybe<UsersDocAccess>;
  initializedUser?: Maybe<Scalars['Boolean']['output']>;
  meUser?: Maybe<UsersMe>;
  versionContent?: Maybe<ContentVersion>;
  versionsContents?: Maybe<VersionsContents>;
};


export type QueryContentArgs = {
  draft?: InputMaybe<Scalars['Boolean']['input']>;
  id: Scalars['Int']['input'];
  select?: InputMaybe<Scalars['Boolean']['input']>;
  trash?: InputMaybe<Scalars['Boolean']['input']>;
};


export type QueryContentsArgs = {
  draft?: InputMaybe<Scalars['Boolean']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  pagination?: InputMaybe<Scalars['Boolean']['input']>;
  select?: InputMaybe<Scalars['Boolean']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  trash?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<Content_Where>;
};


export type QueryEpisodeArgs = {
  draft?: InputMaybe<Scalars['Boolean']['input']>;
  id: Scalars['Int']['input'];
  select?: InputMaybe<Scalars['Boolean']['input']>;
  trash?: InputMaybe<Scalars['Boolean']['input']>;
};


export type QueryEpisodesArgs = {
  draft?: InputMaybe<Scalars['Boolean']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  pagination?: InputMaybe<Scalars['Boolean']['input']>;
  select?: InputMaybe<Scalars['Boolean']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  trash?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<Episode_Where>;
};


export type QueryFavoriteArgs = {
  draft?: InputMaybe<Scalars['Boolean']['input']>;
  id: Scalars['Int']['input'];
  select?: InputMaybe<Scalars['Boolean']['input']>;
  trash?: InputMaybe<Scalars['Boolean']['input']>;
};


export type QueryFavoritesArgs = {
  draft?: InputMaybe<Scalars['Boolean']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  pagination?: InputMaybe<Scalars['Boolean']['input']>;
  select?: InputMaybe<Scalars['Boolean']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  trash?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<Favorite_Where>;
};


export type QueryGenreArgs = {
  draft?: InputMaybe<Scalars['Boolean']['input']>;
  id: Scalars['Int']['input'];
  select?: InputMaybe<Scalars['Boolean']['input']>;
  trash?: InputMaybe<Scalars['Boolean']['input']>;
};


export type QueryGenresArgs = {
  draft?: InputMaybe<Scalars['Boolean']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  pagination?: InputMaybe<Scalars['Boolean']['input']>;
  select?: InputMaybe<Scalars['Boolean']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  trash?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<Genre_Where>;
};


export type QueryMediaArgs = {
  draft?: InputMaybe<Scalars['Boolean']['input']>;
  id: Scalars['Int']['input'];
  select?: InputMaybe<Scalars['Boolean']['input']>;
  trash?: InputMaybe<Scalars['Boolean']['input']>;
};


export type QueryPayloadKvArgs = {
  draft?: InputMaybe<Scalars['Boolean']['input']>;
  id: Scalars['Int']['input'];
  select?: InputMaybe<Scalars['Boolean']['input']>;
  trash?: InputMaybe<Scalars['Boolean']['input']>;
};


export type QueryPayloadKvsArgs = {
  draft?: InputMaybe<Scalars['Boolean']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  pagination?: InputMaybe<Scalars['Boolean']['input']>;
  select?: InputMaybe<Scalars['Boolean']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  trash?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<PayloadKv_Where>;
};


export type QueryPayloadLockedDocumentArgs = {
  draft?: InputMaybe<Scalars['Boolean']['input']>;
  id: Scalars['Int']['input'];
  select?: InputMaybe<Scalars['Boolean']['input']>;
  trash?: InputMaybe<Scalars['Boolean']['input']>;
};


export type QueryPayloadLockedDocumentsArgs = {
  draft?: InputMaybe<Scalars['Boolean']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  pagination?: InputMaybe<Scalars['Boolean']['input']>;
  select?: InputMaybe<Scalars['Boolean']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  trash?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<PayloadLockedDocument_Where>;
};


export type QueryPayloadPreferenceArgs = {
  draft?: InputMaybe<Scalars['Boolean']['input']>;
  id: Scalars['Int']['input'];
  select?: InputMaybe<Scalars['Boolean']['input']>;
  trash?: InputMaybe<Scalars['Boolean']['input']>;
};


export type QueryPayloadPreferencesArgs = {
  draft?: InputMaybe<Scalars['Boolean']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  pagination?: InputMaybe<Scalars['Boolean']['input']>;
  select?: InputMaybe<Scalars['Boolean']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  trash?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<PayloadPreference_Where>;
};


export type QuerySearchResultArgs = {
  draft?: InputMaybe<Scalars['Boolean']['input']>;
  id: Scalars['Int']['input'];
  select?: InputMaybe<Scalars['Boolean']['input']>;
  trash?: InputMaybe<Scalars['Boolean']['input']>;
};


export type QuerySearchResultsArgs = {
  draft?: InputMaybe<Scalars['Boolean']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  pagination?: InputMaybe<Scalars['Boolean']['input']>;
  select?: InputMaybe<Scalars['Boolean']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  trash?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<SearchResult_Where>;
};


export type QuerySeasonArgs = {
  draft?: InputMaybe<Scalars['Boolean']['input']>;
  id: Scalars['Int']['input'];
  select?: InputMaybe<Scalars['Boolean']['input']>;
  trash?: InputMaybe<Scalars['Boolean']['input']>;
};


export type QuerySeasonsArgs = {
  draft?: InputMaybe<Scalars['Boolean']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  pagination?: InputMaybe<Scalars['Boolean']['input']>;
  select?: InputMaybe<Scalars['Boolean']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  trash?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<Season_Where>;
};


export type QueryUserArgs = {
  draft?: InputMaybe<Scalars['Boolean']['input']>;
  id: Scalars['Int']['input'];
  select?: InputMaybe<Scalars['Boolean']['input']>;
  trash?: InputMaybe<Scalars['Boolean']['input']>;
};


export type QueryUsersArgs = {
  draft?: InputMaybe<Scalars['Boolean']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  pagination?: InputMaybe<Scalars['Boolean']['input']>;
  select?: InputMaybe<Scalars['Boolean']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  trash?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<User_Where>;
};


export type QueryAllMediaArgs = {
  draft?: InputMaybe<Scalars['Boolean']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  pagination?: InputMaybe<Scalars['Boolean']['input']>;
  select?: InputMaybe<Scalars['Boolean']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  trash?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<Media_Where>;
};


export type QueryCountContentsArgs = {
  draft?: InputMaybe<Scalars['Boolean']['input']>;
  trash?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<Content_Where>;
};


export type QueryCountEpisodesArgs = {
  draft?: InputMaybe<Scalars['Boolean']['input']>;
  trash?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<Episode_Where>;
};


export type QueryCountFavoritesArgs = {
  draft?: InputMaybe<Scalars['Boolean']['input']>;
  trash?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<Favorite_Where>;
};


export type QueryCountGenresArgs = {
  draft?: InputMaybe<Scalars['Boolean']['input']>;
  trash?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<Genre_Where>;
};


export type QueryCountPayloadKvsArgs = {
  draft?: InputMaybe<Scalars['Boolean']['input']>;
  trash?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<PayloadKv_Where>;
};


export type QueryCountPayloadLockedDocumentsArgs = {
  draft?: InputMaybe<Scalars['Boolean']['input']>;
  trash?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<PayloadLockedDocument_Where>;
};


export type QueryCountPayloadPreferencesArgs = {
  draft?: InputMaybe<Scalars['Boolean']['input']>;
  trash?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<PayloadPreference_Where>;
};


export type QueryCountSearchResultsArgs = {
  draft?: InputMaybe<Scalars['Boolean']['input']>;
  trash?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<SearchResult_Where>;
};


export type QueryCountSeasonsArgs = {
  draft?: InputMaybe<Scalars['Boolean']['input']>;
  trash?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<Season_Where>;
};


export type QueryCountUsersArgs = {
  draft?: InputMaybe<Scalars['Boolean']['input']>;
  trash?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<User_Where>;
};


export type QueryCountallMediaArgs = {
  draft?: InputMaybe<Scalars['Boolean']['input']>;
  trash?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<Media_Where>;
};


export type QueryDocAccessContentArgs = {
  id: Scalars['Int']['input'];
};


export type QueryDocAccessEpisodeArgs = {
  id: Scalars['Int']['input'];
};


export type QueryDocAccessFavoriteArgs = {
  id: Scalars['Int']['input'];
};


export type QueryDocAccessGenreArgs = {
  id: Scalars['Int']['input'];
};


export type QueryDocAccessMediaArgs = {
  id: Scalars['Int']['input'];
};


export type QueryDocAccessPayloadKvArgs = {
  id: Scalars['Int']['input'];
};


export type QueryDocAccessPayloadLockedDocumentArgs = {
  id: Scalars['Int']['input'];
};


export type QueryDocAccessPayloadPreferenceArgs = {
  id: Scalars['Int']['input'];
};


export type QueryDocAccessSearchResultArgs = {
  id: Scalars['Int']['input'];
};


export type QueryDocAccessSeasonArgs = {
  id: Scalars['Int']['input'];
};


export type QueryDocAccessUserArgs = {
  id: Scalars['Int']['input'];
};


export type QueryVersionContentArgs = {
  id?: InputMaybe<Scalars['Int']['input']>;
  trash?: InputMaybe<Scalars['Boolean']['input']>;
};


export type QueryVersionsContentsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  pagination?: InputMaybe<Scalars['Boolean']['input']>;
  select?: InputMaybe<Scalars['Boolean']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  trash?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<VersionsContent_Where>;
};

export type SearchResult = {
  __typename?: 'SearchResult';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  doc?: Maybe<SearchResult_Doc_Relationship>;
  id: Scalars['Int']['output'];
  poster?: Maybe<Media>;
  priority?: Maybe<Scalars['Float']['output']>;
  rating?: Maybe<Scalars['Float']['output']>;
  releaseYear?: Maybe<Scalars['Float']['output']>;
  slug?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
  titleEn?: Maybe<Scalars['String']['output']>;
  type?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};


export type SearchResultDocArgs = {
  draft?: InputMaybe<Scalars['Boolean']['input']>;
};

export type SearchResultUpdate_DocRelationshipInput = {
  relationTo?: InputMaybe<SearchResultUpdate_DocRelationshipInputRelationTo>;
  value?: InputMaybe<Scalars['JSON']['input']>;
};

export enum SearchResultUpdate_DocRelationshipInputRelationTo {
  Content = 'content'
}

export type SearchResult_Doc = Content;

export type SearchResult_DocRelationshipInput = {
  relationTo?: InputMaybe<SearchResult_DocRelationshipInputRelationTo>;
  value?: InputMaybe<Scalars['JSON']['input']>;
};

export enum SearchResult_DocRelationshipInputRelationTo {
  Content = 'content'
}

export enum SearchResult_Doc_RelationTo {
  Content = 'content'
}

export type SearchResult_Doc_Relationship = {
  __typename?: 'SearchResult_Doc_Relationship';
  relationTo?: Maybe<SearchResult_Doc_RelationTo>;
  value?: Maybe<SearchResult_Doc>;
};

export type SearchResult_CreatedAt_Operator = {
  equals?: InputMaybe<Scalars['DateTime']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  greater_than?: InputMaybe<Scalars['DateTime']['input']>;
  greater_than_equal?: InputMaybe<Scalars['DateTime']['input']>;
  less_than?: InputMaybe<Scalars['DateTime']['input']>;
  less_than_equal?: InputMaybe<Scalars['DateTime']['input']>;
  like?: InputMaybe<Scalars['DateTime']['input']>;
  not_equals?: InputMaybe<Scalars['DateTime']['input']>;
};

export type SearchResult_Doc_Relation = {
  relationTo?: InputMaybe<SearchResult_Doc_Relation_RelationTo>;
  value?: InputMaybe<Scalars['JSON']['input']>;
};

export enum SearchResult_Doc_Relation_RelationTo {
  Content = 'content'
}

export type SearchResult_Id_Operator = {
  equals?: InputMaybe<Scalars['Int']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  greater_than?: InputMaybe<Scalars['Int']['input']>;
  greater_than_equal?: InputMaybe<Scalars['Int']['input']>;
  less_than?: InputMaybe<Scalars['Int']['input']>;
  less_than_equal?: InputMaybe<Scalars['Int']['input']>;
  not_equals?: InputMaybe<Scalars['Int']['input']>;
};

export type SearchResult_Poster_Operator = {
  all?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>;
  equals?: InputMaybe<Scalars['JSON']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>;
  not_equals?: InputMaybe<Scalars['JSON']['input']>;
  not_in?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>;
};

export type SearchResult_Priority_Operator = {
  equals?: InputMaybe<Scalars['Float']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  greater_than?: InputMaybe<Scalars['Float']['input']>;
  greater_than_equal?: InputMaybe<Scalars['Float']['input']>;
  less_than?: InputMaybe<Scalars['Float']['input']>;
  less_than_equal?: InputMaybe<Scalars['Float']['input']>;
  not_equals?: InputMaybe<Scalars['Float']['input']>;
};

export type SearchResult_Rating_Operator = {
  equals?: InputMaybe<Scalars['Float']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  greater_than?: InputMaybe<Scalars['Float']['input']>;
  greater_than_equal?: InputMaybe<Scalars['Float']['input']>;
  less_than?: InputMaybe<Scalars['Float']['input']>;
  less_than_equal?: InputMaybe<Scalars['Float']['input']>;
  not_equals?: InputMaybe<Scalars['Float']['input']>;
};

export type SearchResult_ReleaseYear_Operator = {
  equals?: InputMaybe<Scalars['Float']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  greater_than?: InputMaybe<Scalars['Float']['input']>;
  greater_than_equal?: InputMaybe<Scalars['Float']['input']>;
  less_than?: InputMaybe<Scalars['Float']['input']>;
  less_than_equal?: InputMaybe<Scalars['Float']['input']>;
  not_equals?: InputMaybe<Scalars['Float']['input']>;
};

export type SearchResult_Slug_Operator = {
  all?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  contains?: InputMaybe<Scalars['String']['input']>;
  equals?: InputMaybe<Scalars['String']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  like?: InputMaybe<Scalars['String']['input']>;
  not_equals?: InputMaybe<Scalars['String']['input']>;
  not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type SearchResult_TitleEn_Operator = {
  all?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  contains?: InputMaybe<Scalars['String']['input']>;
  equals?: InputMaybe<Scalars['String']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  like?: InputMaybe<Scalars['String']['input']>;
  not_equals?: InputMaybe<Scalars['String']['input']>;
  not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type SearchResult_Title_Operator = {
  all?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  contains?: InputMaybe<Scalars['String']['input']>;
  equals?: InputMaybe<Scalars['String']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  like?: InputMaybe<Scalars['String']['input']>;
  not_equals?: InputMaybe<Scalars['String']['input']>;
  not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type SearchResult_Type_Operator = {
  all?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  contains?: InputMaybe<Scalars['String']['input']>;
  equals?: InputMaybe<Scalars['String']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  like?: InputMaybe<Scalars['String']['input']>;
  not_equals?: InputMaybe<Scalars['String']['input']>;
  not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type SearchResult_UpdatedAt_Operator = {
  equals?: InputMaybe<Scalars['DateTime']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  greater_than?: InputMaybe<Scalars['DateTime']['input']>;
  greater_than_equal?: InputMaybe<Scalars['DateTime']['input']>;
  less_than?: InputMaybe<Scalars['DateTime']['input']>;
  less_than_equal?: InputMaybe<Scalars['DateTime']['input']>;
  like?: InputMaybe<Scalars['DateTime']['input']>;
  not_equals?: InputMaybe<Scalars['DateTime']['input']>;
};

export type SearchResult_Where = {
  AND?: InputMaybe<Array<InputMaybe<SearchResult_Where_And>>>;
  OR?: InputMaybe<Array<InputMaybe<SearchResult_Where_Or>>>;
  createdAt?: InputMaybe<SearchResult_CreatedAt_Operator>;
  doc?: InputMaybe<SearchResult_Doc_Relation>;
  id?: InputMaybe<SearchResult_Id_Operator>;
  poster?: InputMaybe<SearchResult_Poster_Operator>;
  priority?: InputMaybe<SearchResult_Priority_Operator>;
  rating?: InputMaybe<SearchResult_Rating_Operator>;
  releaseYear?: InputMaybe<SearchResult_ReleaseYear_Operator>;
  slug?: InputMaybe<SearchResult_Slug_Operator>;
  title?: InputMaybe<SearchResult_Title_Operator>;
  titleEn?: InputMaybe<SearchResult_TitleEn_Operator>;
  type?: InputMaybe<SearchResult_Type_Operator>;
  updatedAt?: InputMaybe<SearchResult_UpdatedAt_Operator>;
};

export type SearchResult_Where_And = {
  AND?: InputMaybe<Array<InputMaybe<SearchResult_Where_And>>>;
  OR?: InputMaybe<Array<InputMaybe<SearchResult_Where_Or>>>;
  createdAt?: InputMaybe<SearchResult_CreatedAt_Operator>;
  doc?: InputMaybe<SearchResult_Doc_Relation>;
  id?: InputMaybe<SearchResult_Id_Operator>;
  poster?: InputMaybe<SearchResult_Poster_Operator>;
  priority?: InputMaybe<SearchResult_Priority_Operator>;
  rating?: InputMaybe<SearchResult_Rating_Operator>;
  releaseYear?: InputMaybe<SearchResult_ReleaseYear_Operator>;
  slug?: InputMaybe<SearchResult_Slug_Operator>;
  title?: InputMaybe<SearchResult_Title_Operator>;
  titleEn?: InputMaybe<SearchResult_TitleEn_Operator>;
  type?: InputMaybe<SearchResult_Type_Operator>;
  updatedAt?: InputMaybe<SearchResult_UpdatedAt_Operator>;
};

export type SearchResult_Where_Or = {
  AND?: InputMaybe<Array<InputMaybe<SearchResult_Where_And>>>;
  OR?: InputMaybe<Array<InputMaybe<SearchResult_Where_Or>>>;
  createdAt?: InputMaybe<SearchResult_CreatedAt_Operator>;
  doc?: InputMaybe<SearchResult_Doc_Relation>;
  id?: InputMaybe<SearchResult_Id_Operator>;
  poster?: InputMaybe<SearchResult_Poster_Operator>;
  priority?: InputMaybe<SearchResult_Priority_Operator>;
  rating?: InputMaybe<SearchResult_Rating_Operator>;
  releaseYear?: InputMaybe<SearchResult_ReleaseYear_Operator>;
  slug?: InputMaybe<SearchResult_Slug_Operator>;
  title?: InputMaybe<SearchResult_Title_Operator>;
  titleEn?: InputMaybe<SearchResult_TitleEn_Operator>;
  type?: InputMaybe<SearchResult_Type_Operator>;
  updatedAt?: InputMaybe<SearchResult_UpdatedAt_Operator>;
};

export type SearchResults = {
  __typename?: 'SearchResults';
  docs: Array<SearchResult>;
  hasNextPage: Scalars['Boolean']['output'];
  hasPrevPage: Scalars['Boolean']['output'];
  limit: Scalars['Int']['output'];
  nextPage?: Maybe<Scalars['Int']['output']>;
  offset?: Maybe<Scalars['Int']['output']>;
  page: Scalars['Int']['output'];
  pagingCounter: Scalars['Int']['output'];
  prevPage?: Maybe<Scalars['Int']['output']>;
  totalDocs: Scalars['Int']['output'];
  totalPages: Scalars['Int']['output'];
};

export type SearchResultsCreateAccess = {
  __typename?: 'SearchResultsCreateAccess';
  permission: Scalars['Boolean']['output'];
  where?: Maybe<Scalars['JSONObject']['output']>;
};

export type SearchResultsCreateDocAccess = {
  __typename?: 'SearchResultsCreateDocAccess';
  permission: Scalars['Boolean']['output'];
  where?: Maybe<Scalars['JSONObject']['output']>;
};

export type SearchResultsDeleteAccess = {
  __typename?: 'SearchResultsDeleteAccess';
  permission: Scalars['Boolean']['output'];
  where?: Maybe<Scalars['JSONObject']['output']>;
};

export type SearchResultsDeleteDocAccess = {
  __typename?: 'SearchResultsDeleteDocAccess';
  permission: Scalars['Boolean']['output'];
  where?: Maybe<Scalars['JSONObject']['output']>;
};

export type SearchResultsDocAccessFields = {
  __typename?: 'SearchResultsDocAccessFields';
  createdAt?: Maybe<SearchResultsDocAccessFields_CreatedAt>;
  doc?: Maybe<SearchResultsDocAccessFields_Doc>;
  poster?: Maybe<SearchResultsDocAccessFields_Poster>;
  priority?: Maybe<SearchResultsDocAccessFields_Priority>;
  rating?: Maybe<SearchResultsDocAccessFields_Rating>;
  releaseYear?: Maybe<SearchResultsDocAccessFields_ReleaseYear>;
  slug?: Maybe<SearchResultsDocAccessFields_Slug>;
  title?: Maybe<SearchResultsDocAccessFields_Title>;
  titleEn?: Maybe<SearchResultsDocAccessFields_TitleEn>;
  type?: Maybe<SearchResultsDocAccessFields_Type>;
  updatedAt?: Maybe<SearchResultsDocAccessFields_UpdatedAt>;
};

export type SearchResultsDocAccessFields_CreatedAt = {
  __typename?: 'SearchResultsDocAccessFields_createdAt';
  create?: Maybe<SearchResultsDocAccessFields_CreatedAt_Create>;
  delete?: Maybe<SearchResultsDocAccessFields_CreatedAt_Delete>;
  read?: Maybe<SearchResultsDocAccessFields_CreatedAt_Read>;
  update?: Maybe<SearchResultsDocAccessFields_CreatedAt_Update>;
};

export type SearchResultsDocAccessFields_CreatedAt_Create = {
  __typename?: 'SearchResultsDocAccessFields_createdAt_Create';
  permission: Scalars['Boolean']['output'];
};

export type SearchResultsDocAccessFields_CreatedAt_Delete = {
  __typename?: 'SearchResultsDocAccessFields_createdAt_Delete';
  permission: Scalars['Boolean']['output'];
};

export type SearchResultsDocAccessFields_CreatedAt_Read = {
  __typename?: 'SearchResultsDocAccessFields_createdAt_Read';
  permission: Scalars['Boolean']['output'];
};

export type SearchResultsDocAccessFields_CreatedAt_Update = {
  __typename?: 'SearchResultsDocAccessFields_createdAt_Update';
  permission: Scalars['Boolean']['output'];
};

export type SearchResultsDocAccessFields_Doc = {
  __typename?: 'SearchResultsDocAccessFields_doc';
  create?: Maybe<SearchResultsDocAccessFields_Doc_Create>;
  delete?: Maybe<SearchResultsDocAccessFields_Doc_Delete>;
  read?: Maybe<SearchResultsDocAccessFields_Doc_Read>;
  update?: Maybe<SearchResultsDocAccessFields_Doc_Update>;
};

export type SearchResultsDocAccessFields_Doc_Create = {
  __typename?: 'SearchResultsDocAccessFields_doc_Create';
  permission: Scalars['Boolean']['output'];
};

export type SearchResultsDocAccessFields_Doc_Delete = {
  __typename?: 'SearchResultsDocAccessFields_doc_Delete';
  permission: Scalars['Boolean']['output'];
};

export type SearchResultsDocAccessFields_Doc_Read = {
  __typename?: 'SearchResultsDocAccessFields_doc_Read';
  permission: Scalars['Boolean']['output'];
};

export type SearchResultsDocAccessFields_Doc_Update = {
  __typename?: 'SearchResultsDocAccessFields_doc_Update';
  permission: Scalars['Boolean']['output'];
};

export type SearchResultsDocAccessFields_Poster = {
  __typename?: 'SearchResultsDocAccessFields_poster';
  create?: Maybe<SearchResultsDocAccessFields_Poster_Create>;
  delete?: Maybe<SearchResultsDocAccessFields_Poster_Delete>;
  read?: Maybe<SearchResultsDocAccessFields_Poster_Read>;
  update?: Maybe<SearchResultsDocAccessFields_Poster_Update>;
};

export type SearchResultsDocAccessFields_Poster_Create = {
  __typename?: 'SearchResultsDocAccessFields_poster_Create';
  permission: Scalars['Boolean']['output'];
};

export type SearchResultsDocAccessFields_Poster_Delete = {
  __typename?: 'SearchResultsDocAccessFields_poster_Delete';
  permission: Scalars['Boolean']['output'];
};

export type SearchResultsDocAccessFields_Poster_Read = {
  __typename?: 'SearchResultsDocAccessFields_poster_Read';
  permission: Scalars['Boolean']['output'];
};

export type SearchResultsDocAccessFields_Poster_Update = {
  __typename?: 'SearchResultsDocAccessFields_poster_Update';
  permission: Scalars['Boolean']['output'];
};

export type SearchResultsDocAccessFields_Priority = {
  __typename?: 'SearchResultsDocAccessFields_priority';
  create?: Maybe<SearchResultsDocAccessFields_Priority_Create>;
  delete?: Maybe<SearchResultsDocAccessFields_Priority_Delete>;
  read?: Maybe<SearchResultsDocAccessFields_Priority_Read>;
  update?: Maybe<SearchResultsDocAccessFields_Priority_Update>;
};

export type SearchResultsDocAccessFields_Priority_Create = {
  __typename?: 'SearchResultsDocAccessFields_priority_Create';
  permission: Scalars['Boolean']['output'];
};

export type SearchResultsDocAccessFields_Priority_Delete = {
  __typename?: 'SearchResultsDocAccessFields_priority_Delete';
  permission: Scalars['Boolean']['output'];
};

export type SearchResultsDocAccessFields_Priority_Read = {
  __typename?: 'SearchResultsDocAccessFields_priority_Read';
  permission: Scalars['Boolean']['output'];
};

export type SearchResultsDocAccessFields_Priority_Update = {
  __typename?: 'SearchResultsDocAccessFields_priority_Update';
  permission: Scalars['Boolean']['output'];
};

export type SearchResultsDocAccessFields_Rating = {
  __typename?: 'SearchResultsDocAccessFields_rating';
  create?: Maybe<SearchResultsDocAccessFields_Rating_Create>;
  delete?: Maybe<SearchResultsDocAccessFields_Rating_Delete>;
  read?: Maybe<SearchResultsDocAccessFields_Rating_Read>;
  update?: Maybe<SearchResultsDocAccessFields_Rating_Update>;
};

export type SearchResultsDocAccessFields_Rating_Create = {
  __typename?: 'SearchResultsDocAccessFields_rating_Create';
  permission: Scalars['Boolean']['output'];
};

export type SearchResultsDocAccessFields_Rating_Delete = {
  __typename?: 'SearchResultsDocAccessFields_rating_Delete';
  permission: Scalars['Boolean']['output'];
};

export type SearchResultsDocAccessFields_Rating_Read = {
  __typename?: 'SearchResultsDocAccessFields_rating_Read';
  permission: Scalars['Boolean']['output'];
};

export type SearchResultsDocAccessFields_Rating_Update = {
  __typename?: 'SearchResultsDocAccessFields_rating_Update';
  permission: Scalars['Boolean']['output'];
};

export type SearchResultsDocAccessFields_ReleaseYear = {
  __typename?: 'SearchResultsDocAccessFields_releaseYear';
  create?: Maybe<SearchResultsDocAccessFields_ReleaseYear_Create>;
  delete?: Maybe<SearchResultsDocAccessFields_ReleaseYear_Delete>;
  read?: Maybe<SearchResultsDocAccessFields_ReleaseYear_Read>;
  update?: Maybe<SearchResultsDocAccessFields_ReleaseYear_Update>;
};

export type SearchResultsDocAccessFields_ReleaseYear_Create = {
  __typename?: 'SearchResultsDocAccessFields_releaseYear_Create';
  permission: Scalars['Boolean']['output'];
};

export type SearchResultsDocAccessFields_ReleaseYear_Delete = {
  __typename?: 'SearchResultsDocAccessFields_releaseYear_Delete';
  permission: Scalars['Boolean']['output'];
};

export type SearchResultsDocAccessFields_ReleaseYear_Read = {
  __typename?: 'SearchResultsDocAccessFields_releaseYear_Read';
  permission: Scalars['Boolean']['output'];
};

export type SearchResultsDocAccessFields_ReleaseYear_Update = {
  __typename?: 'SearchResultsDocAccessFields_releaseYear_Update';
  permission: Scalars['Boolean']['output'];
};

export type SearchResultsDocAccessFields_Slug = {
  __typename?: 'SearchResultsDocAccessFields_slug';
  create?: Maybe<SearchResultsDocAccessFields_Slug_Create>;
  delete?: Maybe<SearchResultsDocAccessFields_Slug_Delete>;
  read?: Maybe<SearchResultsDocAccessFields_Slug_Read>;
  update?: Maybe<SearchResultsDocAccessFields_Slug_Update>;
};

export type SearchResultsDocAccessFields_Slug_Create = {
  __typename?: 'SearchResultsDocAccessFields_slug_Create';
  permission: Scalars['Boolean']['output'];
};

export type SearchResultsDocAccessFields_Slug_Delete = {
  __typename?: 'SearchResultsDocAccessFields_slug_Delete';
  permission: Scalars['Boolean']['output'];
};

export type SearchResultsDocAccessFields_Slug_Read = {
  __typename?: 'SearchResultsDocAccessFields_slug_Read';
  permission: Scalars['Boolean']['output'];
};

export type SearchResultsDocAccessFields_Slug_Update = {
  __typename?: 'SearchResultsDocAccessFields_slug_Update';
  permission: Scalars['Boolean']['output'];
};

export type SearchResultsDocAccessFields_Title = {
  __typename?: 'SearchResultsDocAccessFields_title';
  create?: Maybe<SearchResultsDocAccessFields_Title_Create>;
  delete?: Maybe<SearchResultsDocAccessFields_Title_Delete>;
  read?: Maybe<SearchResultsDocAccessFields_Title_Read>;
  update?: Maybe<SearchResultsDocAccessFields_Title_Update>;
};

export type SearchResultsDocAccessFields_TitleEn = {
  __typename?: 'SearchResultsDocAccessFields_titleEn';
  create?: Maybe<SearchResultsDocAccessFields_TitleEn_Create>;
  delete?: Maybe<SearchResultsDocAccessFields_TitleEn_Delete>;
  read?: Maybe<SearchResultsDocAccessFields_TitleEn_Read>;
  update?: Maybe<SearchResultsDocAccessFields_TitleEn_Update>;
};

export type SearchResultsDocAccessFields_TitleEn_Create = {
  __typename?: 'SearchResultsDocAccessFields_titleEn_Create';
  permission: Scalars['Boolean']['output'];
};

export type SearchResultsDocAccessFields_TitleEn_Delete = {
  __typename?: 'SearchResultsDocAccessFields_titleEn_Delete';
  permission: Scalars['Boolean']['output'];
};

export type SearchResultsDocAccessFields_TitleEn_Read = {
  __typename?: 'SearchResultsDocAccessFields_titleEn_Read';
  permission: Scalars['Boolean']['output'];
};

export type SearchResultsDocAccessFields_TitleEn_Update = {
  __typename?: 'SearchResultsDocAccessFields_titleEn_Update';
  permission: Scalars['Boolean']['output'];
};

export type SearchResultsDocAccessFields_Title_Create = {
  __typename?: 'SearchResultsDocAccessFields_title_Create';
  permission: Scalars['Boolean']['output'];
};

export type SearchResultsDocAccessFields_Title_Delete = {
  __typename?: 'SearchResultsDocAccessFields_title_Delete';
  permission: Scalars['Boolean']['output'];
};

export type SearchResultsDocAccessFields_Title_Read = {
  __typename?: 'SearchResultsDocAccessFields_title_Read';
  permission: Scalars['Boolean']['output'];
};

export type SearchResultsDocAccessFields_Title_Update = {
  __typename?: 'SearchResultsDocAccessFields_title_Update';
  permission: Scalars['Boolean']['output'];
};

export type SearchResultsDocAccessFields_Type = {
  __typename?: 'SearchResultsDocAccessFields_type';
  create?: Maybe<SearchResultsDocAccessFields_Type_Create>;
  delete?: Maybe<SearchResultsDocAccessFields_Type_Delete>;
  read?: Maybe<SearchResultsDocAccessFields_Type_Read>;
  update?: Maybe<SearchResultsDocAccessFields_Type_Update>;
};

export type SearchResultsDocAccessFields_Type_Create = {
  __typename?: 'SearchResultsDocAccessFields_type_Create';
  permission: Scalars['Boolean']['output'];
};

export type SearchResultsDocAccessFields_Type_Delete = {
  __typename?: 'SearchResultsDocAccessFields_type_Delete';
  permission: Scalars['Boolean']['output'];
};

export type SearchResultsDocAccessFields_Type_Read = {
  __typename?: 'SearchResultsDocAccessFields_type_Read';
  permission: Scalars['Boolean']['output'];
};

export type SearchResultsDocAccessFields_Type_Update = {
  __typename?: 'SearchResultsDocAccessFields_type_Update';
  permission: Scalars['Boolean']['output'];
};

export type SearchResultsDocAccessFields_UpdatedAt = {
  __typename?: 'SearchResultsDocAccessFields_updatedAt';
  create?: Maybe<SearchResultsDocAccessFields_UpdatedAt_Create>;
  delete?: Maybe<SearchResultsDocAccessFields_UpdatedAt_Delete>;
  read?: Maybe<SearchResultsDocAccessFields_UpdatedAt_Read>;
  update?: Maybe<SearchResultsDocAccessFields_UpdatedAt_Update>;
};

export type SearchResultsDocAccessFields_UpdatedAt_Create = {
  __typename?: 'SearchResultsDocAccessFields_updatedAt_Create';
  permission: Scalars['Boolean']['output'];
};

export type SearchResultsDocAccessFields_UpdatedAt_Delete = {
  __typename?: 'SearchResultsDocAccessFields_updatedAt_Delete';
  permission: Scalars['Boolean']['output'];
};

export type SearchResultsDocAccessFields_UpdatedAt_Read = {
  __typename?: 'SearchResultsDocAccessFields_updatedAt_Read';
  permission: Scalars['Boolean']['output'];
};

export type SearchResultsDocAccessFields_UpdatedAt_Update = {
  __typename?: 'SearchResultsDocAccessFields_updatedAt_Update';
  permission: Scalars['Boolean']['output'];
};

export type SearchResultsFields = {
  __typename?: 'SearchResultsFields';
  createdAt?: Maybe<SearchResultsFields_CreatedAt>;
  doc?: Maybe<SearchResultsFields_Doc>;
  poster?: Maybe<SearchResultsFields_Poster>;
  priority?: Maybe<SearchResultsFields_Priority>;
  rating?: Maybe<SearchResultsFields_Rating>;
  releaseYear?: Maybe<SearchResultsFields_ReleaseYear>;
  slug?: Maybe<SearchResultsFields_Slug>;
  title?: Maybe<SearchResultsFields_Title>;
  titleEn?: Maybe<SearchResultsFields_TitleEn>;
  type?: Maybe<SearchResultsFields_Type>;
  updatedAt?: Maybe<SearchResultsFields_UpdatedAt>;
};

export type SearchResultsFields_CreatedAt = {
  __typename?: 'SearchResultsFields_createdAt';
  create?: Maybe<SearchResultsFields_CreatedAt_Create>;
  delete?: Maybe<SearchResultsFields_CreatedAt_Delete>;
  read?: Maybe<SearchResultsFields_CreatedAt_Read>;
  update?: Maybe<SearchResultsFields_CreatedAt_Update>;
};

export type SearchResultsFields_CreatedAt_Create = {
  __typename?: 'SearchResultsFields_createdAt_Create';
  permission: Scalars['Boolean']['output'];
};

export type SearchResultsFields_CreatedAt_Delete = {
  __typename?: 'SearchResultsFields_createdAt_Delete';
  permission: Scalars['Boolean']['output'];
};

export type SearchResultsFields_CreatedAt_Read = {
  __typename?: 'SearchResultsFields_createdAt_Read';
  permission: Scalars['Boolean']['output'];
};

export type SearchResultsFields_CreatedAt_Update = {
  __typename?: 'SearchResultsFields_createdAt_Update';
  permission: Scalars['Boolean']['output'];
};

export type SearchResultsFields_Doc = {
  __typename?: 'SearchResultsFields_doc';
  create?: Maybe<SearchResultsFields_Doc_Create>;
  delete?: Maybe<SearchResultsFields_Doc_Delete>;
  read?: Maybe<SearchResultsFields_Doc_Read>;
  update?: Maybe<SearchResultsFields_Doc_Update>;
};

export type SearchResultsFields_Doc_Create = {
  __typename?: 'SearchResultsFields_doc_Create';
  permission: Scalars['Boolean']['output'];
};

export type SearchResultsFields_Doc_Delete = {
  __typename?: 'SearchResultsFields_doc_Delete';
  permission: Scalars['Boolean']['output'];
};

export type SearchResultsFields_Doc_Read = {
  __typename?: 'SearchResultsFields_doc_Read';
  permission: Scalars['Boolean']['output'];
};

export type SearchResultsFields_Doc_Update = {
  __typename?: 'SearchResultsFields_doc_Update';
  permission: Scalars['Boolean']['output'];
};

export type SearchResultsFields_Poster = {
  __typename?: 'SearchResultsFields_poster';
  create?: Maybe<SearchResultsFields_Poster_Create>;
  delete?: Maybe<SearchResultsFields_Poster_Delete>;
  read?: Maybe<SearchResultsFields_Poster_Read>;
  update?: Maybe<SearchResultsFields_Poster_Update>;
};

export type SearchResultsFields_Poster_Create = {
  __typename?: 'SearchResultsFields_poster_Create';
  permission: Scalars['Boolean']['output'];
};

export type SearchResultsFields_Poster_Delete = {
  __typename?: 'SearchResultsFields_poster_Delete';
  permission: Scalars['Boolean']['output'];
};

export type SearchResultsFields_Poster_Read = {
  __typename?: 'SearchResultsFields_poster_Read';
  permission: Scalars['Boolean']['output'];
};

export type SearchResultsFields_Poster_Update = {
  __typename?: 'SearchResultsFields_poster_Update';
  permission: Scalars['Boolean']['output'];
};

export type SearchResultsFields_Priority = {
  __typename?: 'SearchResultsFields_priority';
  create?: Maybe<SearchResultsFields_Priority_Create>;
  delete?: Maybe<SearchResultsFields_Priority_Delete>;
  read?: Maybe<SearchResultsFields_Priority_Read>;
  update?: Maybe<SearchResultsFields_Priority_Update>;
};

export type SearchResultsFields_Priority_Create = {
  __typename?: 'SearchResultsFields_priority_Create';
  permission: Scalars['Boolean']['output'];
};

export type SearchResultsFields_Priority_Delete = {
  __typename?: 'SearchResultsFields_priority_Delete';
  permission: Scalars['Boolean']['output'];
};

export type SearchResultsFields_Priority_Read = {
  __typename?: 'SearchResultsFields_priority_Read';
  permission: Scalars['Boolean']['output'];
};

export type SearchResultsFields_Priority_Update = {
  __typename?: 'SearchResultsFields_priority_Update';
  permission: Scalars['Boolean']['output'];
};

export type SearchResultsFields_Rating = {
  __typename?: 'SearchResultsFields_rating';
  create?: Maybe<SearchResultsFields_Rating_Create>;
  delete?: Maybe<SearchResultsFields_Rating_Delete>;
  read?: Maybe<SearchResultsFields_Rating_Read>;
  update?: Maybe<SearchResultsFields_Rating_Update>;
};

export type SearchResultsFields_Rating_Create = {
  __typename?: 'SearchResultsFields_rating_Create';
  permission: Scalars['Boolean']['output'];
};

export type SearchResultsFields_Rating_Delete = {
  __typename?: 'SearchResultsFields_rating_Delete';
  permission: Scalars['Boolean']['output'];
};

export type SearchResultsFields_Rating_Read = {
  __typename?: 'SearchResultsFields_rating_Read';
  permission: Scalars['Boolean']['output'];
};

export type SearchResultsFields_Rating_Update = {
  __typename?: 'SearchResultsFields_rating_Update';
  permission: Scalars['Boolean']['output'];
};

export type SearchResultsFields_ReleaseYear = {
  __typename?: 'SearchResultsFields_releaseYear';
  create?: Maybe<SearchResultsFields_ReleaseYear_Create>;
  delete?: Maybe<SearchResultsFields_ReleaseYear_Delete>;
  read?: Maybe<SearchResultsFields_ReleaseYear_Read>;
  update?: Maybe<SearchResultsFields_ReleaseYear_Update>;
};

export type SearchResultsFields_ReleaseYear_Create = {
  __typename?: 'SearchResultsFields_releaseYear_Create';
  permission: Scalars['Boolean']['output'];
};

export type SearchResultsFields_ReleaseYear_Delete = {
  __typename?: 'SearchResultsFields_releaseYear_Delete';
  permission: Scalars['Boolean']['output'];
};

export type SearchResultsFields_ReleaseYear_Read = {
  __typename?: 'SearchResultsFields_releaseYear_Read';
  permission: Scalars['Boolean']['output'];
};

export type SearchResultsFields_ReleaseYear_Update = {
  __typename?: 'SearchResultsFields_releaseYear_Update';
  permission: Scalars['Boolean']['output'];
};

export type SearchResultsFields_Slug = {
  __typename?: 'SearchResultsFields_slug';
  create?: Maybe<SearchResultsFields_Slug_Create>;
  delete?: Maybe<SearchResultsFields_Slug_Delete>;
  read?: Maybe<SearchResultsFields_Slug_Read>;
  update?: Maybe<SearchResultsFields_Slug_Update>;
};

export type SearchResultsFields_Slug_Create = {
  __typename?: 'SearchResultsFields_slug_Create';
  permission: Scalars['Boolean']['output'];
};

export type SearchResultsFields_Slug_Delete = {
  __typename?: 'SearchResultsFields_slug_Delete';
  permission: Scalars['Boolean']['output'];
};

export type SearchResultsFields_Slug_Read = {
  __typename?: 'SearchResultsFields_slug_Read';
  permission: Scalars['Boolean']['output'];
};

export type SearchResultsFields_Slug_Update = {
  __typename?: 'SearchResultsFields_slug_Update';
  permission: Scalars['Boolean']['output'];
};

export type SearchResultsFields_Title = {
  __typename?: 'SearchResultsFields_title';
  create?: Maybe<SearchResultsFields_Title_Create>;
  delete?: Maybe<SearchResultsFields_Title_Delete>;
  read?: Maybe<SearchResultsFields_Title_Read>;
  update?: Maybe<SearchResultsFields_Title_Update>;
};

export type SearchResultsFields_TitleEn = {
  __typename?: 'SearchResultsFields_titleEn';
  create?: Maybe<SearchResultsFields_TitleEn_Create>;
  delete?: Maybe<SearchResultsFields_TitleEn_Delete>;
  read?: Maybe<SearchResultsFields_TitleEn_Read>;
  update?: Maybe<SearchResultsFields_TitleEn_Update>;
};

export type SearchResultsFields_TitleEn_Create = {
  __typename?: 'SearchResultsFields_titleEn_Create';
  permission: Scalars['Boolean']['output'];
};

export type SearchResultsFields_TitleEn_Delete = {
  __typename?: 'SearchResultsFields_titleEn_Delete';
  permission: Scalars['Boolean']['output'];
};

export type SearchResultsFields_TitleEn_Read = {
  __typename?: 'SearchResultsFields_titleEn_Read';
  permission: Scalars['Boolean']['output'];
};

export type SearchResultsFields_TitleEn_Update = {
  __typename?: 'SearchResultsFields_titleEn_Update';
  permission: Scalars['Boolean']['output'];
};

export type SearchResultsFields_Title_Create = {
  __typename?: 'SearchResultsFields_title_Create';
  permission: Scalars['Boolean']['output'];
};

export type SearchResultsFields_Title_Delete = {
  __typename?: 'SearchResultsFields_title_Delete';
  permission: Scalars['Boolean']['output'];
};

export type SearchResultsFields_Title_Read = {
  __typename?: 'SearchResultsFields_title_Read';
  permission: Scalars['Boolean']['output'];
};

export type SearchResultsFields_Title_Update = {
  __typename?: 'SearchResultsFields_title_Update';
  permission: Scalars['Boolean']['output'];
};

export type SearchResultsFields_Type = {
  __typename?: 'SearchResultsFields_type';
  create?: Maybe<SearchResultsFields_Type_Create>;
  delete?: Maybe<SearchResultsFields_Type_Delete>;
  read?: Maybe<SearchResultsFields_Type_Read>;
  update?: Maybe<SearchResultsFields_Type_Update>;
};

export type SearchResultsFields_Type_Create = {
  __typename?: 'SearchResultsFields_type_Create';
  permission: Scalars['Boolean']['output'];
};

export type SearchResultsFields_Type_Delete = {
  __typename?: 'SearchResultsFields_type_Delete';
  permission: Scalars['Boolean']['output'];
};

export type SearchResultsFields_Type_Read = {
  __typename?: 'SearchResultsFields_type_Read';
  permission: Scalars['Boolean']['output'];
};

export type SearchResultsFields_Type_Update = {
  __typename?: 'SearchResultsFields_type_Update';
  permission: Scalars['Boolean']['output'];
};

export type SearchResultsFields_UpdatedAt = {
  __typename?: 'SearchResultsFields_updatedAt';
  create?: Maybe<SearchResultsFields_UpdatedAt_Create>;
  delete?: Maybe<SearchResultsFields_UpdatedAt_Delete>;
  read?: Maybe<SearchResultsFields_UpdatedAt_Read>;
  update?: Maybe<SearchResultsFields_UpdatedAt_Update>;
};

export type SearchResultsFields_UpdatedAt_Create = {
  __typename?: 'SearchResultsFields_updatedAt_Create';
  permission: Scalars['Boolean']['output'];
};

export type SearchResultsFields_UpdatedAt_Delete = {
  __typename?: 'SearchResultsFields_updatedAt_Delete';
  permission: Scalars['Boolean']['output'];
};

export type SearchResultsFields_UpdatedAt_Read = {
  __typename?: 'SearchResultsFields_updatedAt_Read';
  permission: Scalars['Boolean']['output'];
};

export type SearchResultsFields_UpdatedAt_Update = {
  __typename?: 'SearchResultsFields_updatedAt_Update';
  permission: Scalars['Boolean']['output'];
};

export type SearchResultsReadAccess = {
  __typename?: 'SearchResultsReadAccess';
  permission: Scalars['Boolean']['output'];
  where?: Maybe<Scalars['JSONObject']['output']>;
};

export type SearchResultsReadDocAccess = {
  __typename?: 'SearchResultsReadDocAccess';
  permission: Scalars['Boolean']['output'];
  where?: Maybe<Scalars['JSONObject']['output']>;
};

export type SearchResultsUpdateAccess = {
  __typename?: 'SearchResultsUpdateAccess';
  permission: Scalars['Boolean']['output'];
  where?: Maybe<Scalars['JSONObject']['output']>;
};

export type SearchResultsUpdateDocAccess = {
  __typename?: 'SearchResultsUpdateDocAccess';
  permission: Scalars['Boolean']['output'];
  where?: Maybe<Scalars['JSONObject']['output']>;
};

export type Season = {
  __typename?: 'Season';
  content?: Maybe<Content>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  episodes?: Maybe<Season_Episodes>;
  id: Scalars['Int']['output'];
  releaseYear?: Maybe<Scalars['Float']['output']>;
  seasonNumber: Scalars['Float']['output'];
  title?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};


export type SeasonContentArgs = {
  draft?: InputMaybe<Scalars['Boolean']['input']>;
};


export type SeasonEpisodesArgs = {
  count?: InputMaybe<Scalars['Boolean']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  where?: InputMaybe<Episode_Where>;
};

export type Season_Episodes = {
  __typename?: 'Season_Episodes';
  docs: Array<Episode>;
  hasNextPage: Scalars['Boolean']['output'];
  totalDocs?: Maybe<Scalars['Int']['output']>;
};

export type Season_Content_Operator = {
  all?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>;
  equals?: InputMaybe<Scalars['JSON']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>;
  not_equals?: InputMaybe<Scalars['JSON']['input']>;
  not_in?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>;
};

export type Season_CreatedAt_Operator = {
  equals?: InputMaybe<Scalars['DateTime']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  greater_than?: InputMaybe<Scalars['DateTime']['input']>;
  greater_than_equal?: InputMaybe<Scalars['DateTime']['input']>;
  less_than?: InputMaybe<Scalars['DateTime']['input']>;
  less_than_equal?: InputMaybe<Scalars['DateTime']['input']>;
  like?: InputMaybe<Scalars['DateTime']['input']>;
  not_equals?: InputMaybe<Scalars['DateTime']['input']>;
};

export type Season_Id_Operator = {
  equals?: InputMaybe<Scalars['Int']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  greater_than?: InputMaybe<Scalars['Int']['input']>;
  greater_than_equal?: InputMaybe<Scalars['Int']['input']>;
  less_than?: InputMaybe<Scalars['Int']['input']>;
  less_than_equal?: InputMaybe<Scalars['Int']['input']>;
  not_equals?: InputMaybe<Scalars['Int']['input']>;
};

export type Season_ReleaseYear_Operator = {
  equals?: InputMaybe<Scalars['Float']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  greater_than?: InputMaybe<Scalars['Float']['input']>;
  greater_than_equal?: InputMaybe<Scalars['Float']['input']>;
  less_than?: InputMaybe<Scalars['Float']['input']>;
  less_than_equal?: InputMaybe<Scalars['Float']['input']>;
  not_equals?: InputMaybe<Scalars['Float']['input']>;
};

export type Season_SeasonNumber_Operator = {
  equals?: InputMaybe<Scalars['Float']['input']>;
  greater_than?: InputMaybe<Scalars['Float']['input']>;
  greater_than_equal?: InputMaybe<Scalars['Float']['input']>;
  less_than?: InputMaybe<Scalars['Float']['input']>;
  less_than_equal?: InputMaybe<Scalars['Float']['input']>;
  not_equals?: InputMaybe<Scalars['Float']['input']>;
};

export type Season_Title_Operator = {
  all?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  contains?: InputMaybe<Scalars['String']['input']>;
  equals?: InputMaybe<Scalars['String']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  like?: InputMaybe<Scalars['String']['input']>;
  not_equals?: InputMaybe<Scalars['String']['input']>;
  not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type Season_UpdatedAt_Operator = {
  equals?: InputMaybe<Scalars['DateTime']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  greater_than?: InputMaybe<Scalars['DateTime']['input']>;
  greater_than_equal?: InputMaybe<Scalars['DateTime']['input']>;
  less_than?: InputMaybe<Scalars['DateTime']['input']>;
  less_than_equal?: InputMaybe<Scalars['DateTime']['input']>;
  like?: InputMaybe<Scalars['DateTime']['input']>;
  not_equals?: InputMaybe<Scalars['DateTime']['input']>;
};

export type Season_Where = {
  AND?: InputMaybe<Array<InputMaybe<Season_Where_And>>>;
  OR?: InputMaybe<Array<InputMaybe<Season_Where_Or>>>;
  content?: InputMaybe<Season_Content_Operator>;
  createdAt?: InputMaybe<Season_CreatedAt_Operator>;
  id?: InputMaybe<Season_Id_Operator>;
  releaseYear?: InputMaybe<Season_ReleaseYear_Operator>;
  seasonNumber?: InputMaybe<Season_SeasonNumber_Operator>;
  title?: InputMaybe<Season_Title_Operator>;
  updatedAt?: InputMaybe<Season_UpdatedAt_Operator>;
};

export type Season_Where_And = {
  AND?: InputMaybe<Array<InputMaybe<Season_Where_And>>>;
  OR?: InputMaybe<Array<InputMaybe<Season_Where_Or>>>;
  content?: InputMaybe<Season_Content_Operator>;
  createdAt?: InputMaybe<Season_CreatedAt_Operator>;
  id?: InputMaybe<Season_Id_Operator>;
  releaseYear?: InputMaybe<Season_ReleaseYear_Operator>;
  seasonNumber?: InputMaybe<Season_SeasonNumber_Operator>;
  title?: InputMaybe<Season_Title_Operator>;
  updatedAt?: InputMaybe<Season_UpdatedAt_Operator>;
};

export type Season_Where_Or = {
  AND?: InputMaybe<Array<InputMaybe<Season_Where_And>>>;
  OR?: InputMaybe<Array<InputMaybe<Season_Where_Or>>>;
  content?: InputMaybe<Season_Content_Operator>;
  createdAt?: InputMaybe<Season_CreatedAt_Operator>;
  id?: InputMaybe<Season_Id_Operator>;
  releaseYear?: InputMaybe<Season_ReleaseYear_Operator>;
  seasonNumber?: InputMaybe<Season_SeasonNumber_Operator>;
  title?: InputMaybe<Season_Title_Operator>;
  updatedAt?: InputMaybe<Season_UpdatedAt_Operator>;
};

export type Seasons = {
  __typename?: 'Seasons';
  docs: Array<Season>;
  hasNextPage: Scalars['Boolean']['output'];
  hasPrevPage: Scalars['Boolean']['output'];
  limit: Scalars['Int']['output'];
  nextPage?: Maybe<Scalars['Int']['output']>;
  offset?: Maybe<Scalars['Int']['output']>;
  page: Scalars['Int']['output'];
  pagingCounter: Scalars['Int']['output'];
  prevPage?: Maybe<Scalars['Int']['output']>;
  totalDocs: Scalars['Int']['output'];
  totalPages: Scalars['Int']['output'];
};

export type SeasonsCreateAccess = {
  __typename?: 'SeasonsCreateAccess';
  permission: Scalars['Boolean']['output'];
  where?: Maybe<Scalars['JSONObject']['output']>;
};

export type SeasonsCreateDocAccess = {
  __typename?: 'SeasonsCreateDocAccess';
  permission: Scalars['Boolean']['output'];
  where?: Maybe<Scalars['JSONObject']['output']>;
};

export type SeasonsDeleteAccess = {
  __typename?: 'SeasonsDeleteAccess';
  permission: Scalars['Boolean']['output'];
  where?: Maybe<Scalars['JSONObject']['output']>;
};

export type SeasonsDeleteDocAccess = {
  __typename?: 'SeasonsDeleteDocAccess';
  permission: Scalars['Boolean']['output'];
  where?: Maybe<Scalars['JSONObject']['output']>;
};

export type SeasonsDocAccessFields = {
  __typename?: 'SeasonsDocAccessFields';
  content?: Maybe<SeasonsDocAccessFields_Content>;
  createdAt?: Maybe<SeasonsDocAccessFields_CreatedAt>;
  episodes?: Maybe<SeasonsDocAccessFields_Episodes>;
  releaseYear?: Maybe<SeasonsDocAccessFields_ReleaseYear>;
  seasonNumber?: Maybe<SeasonsDocAccessFields_SeasonNumber>;
  title?: Maybe<SeasonsDocAccessFields_Title>;
  updatedAt?: Maybe<SeasonsDocAccessFields_UpdatedAt>;
};

export type SeasonsDocAccessFields_Content = {
  __typename?: 'SeasonsDocAccessFields_content';
  create?: Maybe<SeasonsDocAccessFields_Content_Create>;
  delete?: Maybe<SeasonsDocAccessFields_Content_Delete>;
  read?: Maybe<SeasonsDocAccessFields_Content_Read>;
  update?: Maybe<SeasonsDocAccessFields_Content_Update>;
};

export type SeasonsDocAccessFields_Content_Create = {
  __typename?: 'SeasonsDocAccessFields_content_Create';
  permission: Scalars['Boolean']['output'];
};

export type SeasonsDocAccessFields_Content_Delete = {
  __typename?: 'SeasonsDocAccessFields_content_Delete';
  permission: Scalars['Boolean']['output'];
};

export type SeasonsDocAccessFields_Content_Read = {
  __typename?: 'SeasonsDocAccessFields_content_Read';
  permission: Scalars['Boolean']['output'];
};

export type SeasonsDocAccessFields_Content_Update = {
  __typename?: 'SeasonsDocAccessFields_content_Update';
  permission: Scalars['Boolean']['output'];
};

export type SeasonsDocAccessFields_CreatedAt = {
  __typename?: 'SeasonsDocAccessFields_createdAt';
  create?: Maybe<SeasonsDocAccessFields_CreatedAt_Create>;
  delete?: Maybe<SeasonsDocAccessFields_CreatedAt_Delete>;
  read?: Maybe<SeasonsDocAccessFields_CreatedAt_Read>;
  update?: Maybe<SeasonsDocAccessFields_CreatedAt_Update>;
};

export type SeasonsDocAccessFields_CreatedAt_Create = {
  __typename?: 'SeasonsDocAccessFields_createdAt_Create';
  permission: Scalars['Boolean']['output'];
};

export type SeasonsDocAccessFields_CreatedAt_Delete = {
  __typename?: 'SeasonsDocAccessFields_createdAt_Delete';
  permission: Scalars['Boolean']['output'];
};

export type SeasonsDocAccessFields_CreatedAt_Read = {
  __typename?: 'SeasonsDocAccessFields_createdAt_Read';
  permission: Scalars['Boolean']['output'];
};

export type SeasonsDocAccessFields_CreatedAt_Update = {
  __typename?: 'SeasonsDocAccessFields_createdAt_Update';
  permission: Scalars['Boolean']['output'];
};

export type SeasonsDocAccessFields_Episodes = {
  __typename?: 'SeasonsDocAccessFields_episodes';
  create?: Maybe<SeasonsDocAccessFields_Episodes_Create>;
  delete?: Maybe<SeasonsDocAccessFields_Episodes_Delete>;
  read?: Maybe<SeasonsDocAccessFields_Episodes_Read>;
  update?: Maybe<SeasonsDocAccessFields_Episodes_Update>;
};

export type SeasonsDocAccessFields_Episodes_Create = {
  __typename?: 'SeasonsDocAccessFields_episodes_Create';
  permission: Scalars['Boolean']['output'];
};

export type SeasonsDocAccessFields_Episodes_Delete = {
  __typename?: 'SeasonsDocAccessFields_episodes_Delete';
  permission: Scalars['Boolean']['output'];
};

export type SeasonsDocAccessFields_Episodes_Read = {
  __typename?: 'SeasonsDocAccessFields_episodes_Read';
  permission: Scalars['Boolean']['output'];
};

export type SeasonsDocAccessFields_Episodes_Update = {
  __typename?: 'SeasonsDocAccessFields_episodes_Update';
  permission: Scalars['Boolean']['output'];
};

export type SeasonsDocAccessFields_ReleaseYear = {
  __typename?: 'SeasonsDocAccessFields_releaseYear';
  create?: Maybe<SeasonsDocAccessFields_ReleaseYear_Create>;
  delete?: Maybe<SeasonsDocAccessFields_ReleaseYear_Delete>;
  read?: Maybe<SeasonsDocAccessFields_ReleaseYear_Read>;
  update?: Maybe<SeasonsDocAccessFields_ReleaseYear_Update>;
};

export type SeasonsDocAccessFields_ReleaseYear_Create = {
  __typename?: 'SeasonsDocAccessFields_releaseYear_Create';
  permission: Scalars['Boolean']['output'];
};

export type SeasonsDocAccessFields_ReleaseYear_Delete = {
  __typename?: 'SeasonsDocAccessFields_releaseYear_Delete';
  permission: Scalars['Boolean']['output'];
};

export type SeasonsDocAccessFields_ReleaseYear_Read = {
  __typename?: 'SeasonsDocAccessFields_releaseYear_Read';
  permission: Scalars['Boolean']['output'];
};

export type SeasonsDocAccessFields_ReleaseYear_Update = {
  __typename?: 'SeasonsDocAccessFields_releaseYear_Update';
  permission: Scalars['Boolean']['output'];
};

export type SeasonsDocAccessFields_SeasonNumber = {
  __typename?: 'SeasonsDocAccessFields_seasonNumber';
  create?: Maybe<SeasonsDocAccessFields_SeasonNumber_Create>;
  delete?: Maybe<SeasonsDocAccessFields_SeasonNumber_Delete>;
  read?: Maybe<SeasonsDocAccessFields_SeasonNumber_Read>;
  update?: Maybe<SeasonsDocAccessFields_SeasonNumber_Update>;
};

export type SeasonsDocAccessFields_SeasonNumber_Create = {
  __typename?: 'SeasonsDocAccessFields_seasonNumber_Create';
  permission: Scalars['Boolean']['output'];
};

export type SeasonsDocAccessFields_SeasonNumber_Delete = {
  __typename?: 'SeasonsDocAccessFields_seasonNumber_Delete';
  permission: Scalars['Boolean']['output'];
};

export type SeasonsDocAccessFields_SeasonNumber_Read = {
  __typename?: 'SeasonsDocAccessFields_seasonNumber_Read';
  permission: Scalars['Boolean']['output'];
};

export type SeasonsDocAccessFields_SeasonNumber_Update = {
  __typename?: 'SeasonsDocAccessFields_seasonNumber_Update';
  permission: Scalars['Boolean']['output'];
};

export type SeasonsDocAccessFields_Title = {
  __typename?: 'SeasonsDocAccessFields_title';
  create?: Maybe<SeasonsDocAccessFields_Title_Create>;
  delete?: Maybe<SeasonsDocAccessFields_Title_Delete>;
  read?: Maybe<SeasonsDocAccessFields_Title_Read>;
  update?: Maybe<SeasonsDocAccessFields_Title_Update>;
};

export type SeasonsDocAccessFields_Title_Create = {
  __typename?: 'SeasonsDocAccessFields_title_Create';
  permission: Scalars['Boolean']['output'];
};

export type SeasonsDocAccessFields_Title_Delete = {
  __typename?: 'SeasonsDocAccessFields_title_Delete';
  permission: Scalars['Boolean']['output'];
};

export type SeasonsDocAccessFields_Title_Read = {
  __typename?: 'SeasonsDocAccessFields_title_Read';
  permission: Scalars['Boolean']['output'];
};

export type SeasonsDocAccessFields_Title_Update = {
  __typename?: 'SeasonsDocAccessFields_title_Update';
  permission: Scalars['Boolean']['output'];
};

export type SeasonsDocAccessFields_UpdatedAt = {
  __typename?: 'SeasonsDocAccessFields_updatedAt';
  create?: Maybe<SeasonsDocAccessFields_UpdatedAt_Create>;
  delete?: Maybe<SeasonsDocAccessFields_UpdatedAt_Delete>;
  read?: Maybe<SeasonsDocAccessFields_UpdatedAt_Read>;
  update?: Maybe<SeasonsDocAccessFields_UpdatedAt_Update>;
};

export type SeasonsDocAccessFields_UpdatedAt_Create = {
  __typename?: 'SeasonsDocAccessFields_updatedAt_Create';
  permission: Scalars['Boolean']['output'];
};

export type SeasonsDocAccessFields_UpdatedAt_Delete = {
  __typename?: 'SeasonsDocAccessFields_updatedAt_Delete';
  permission: Scalars['Boolean']['output'];
};

export type SeasonsDocAccessFields_UpdatedAt_Read = {
  __typename?: 'SeasonsDocAccessFields_updatedAt_Read';
  permission: Scalars['Boolean']['output'];
};

export type SeasonsDocAccessFields_UpdatedAt_Update = {
  __typename?: 'SeasonsDocAccessFields_updatedAt_Update';
  permission: Scalars['Boolean']['output'];
};

export type SeasonsFields = {
  __typename?: 'SeasonsFields';
  content?: Maybe<SeasonsFields_Content>;
  createdAt?: Maybe<SeasonsFields_CreatedAt>;
  episodes?: Maybe<SeasonsFields_Episodes>;
  releaseYear?: Maybe<SeasonsFields_ReleaseYear>;
  seasonNumber?: Maybe<SeasonsFields_SeasonNumber>;
  title?: Maybe<SeasonsFields_Title>;
  updatedAt?: Maybe<SeasonsFields_UpdatedAt>;
};

export type SeasonsFields_Content = {
  __typename?: 'SeasonsFields_content';
  create?: Maybe<SeasonsFields_Content_Create>;
  delete?: Maybe<SeasonsFields_Content_Delete>;
  read?: Maybe<SeasonsFields_Content_Read>;
  update?: Maybe<SeasonsFields_Content_Update>;
};

export type SeasonsFields_Content_Create = {
  __typename?: 'SeasonsFields_content_Create';
  permission: Scalars['Boolean']['output'];
};

export type SeasonsFields_Content_Delete = {
  __typename?: 'SeasonsFields_content_Delete';
  permission: Scalars['Boolean']['output'];
};

export type SeasonsFields_Content_Read = {
  __typename?: 'SeasonsFields_content_Read';
  permission: Scalars['Boolean']['output'];
};

export type SeasonsFields_Content_Update = {
  __typename?: 'SeasonsFields_content_Update';
  permission: Scalars['Boolean']['output'];
};

export type SeasonsFields_CreatedAt = {
  __typename?: 'SeasonsFields_createdAt';
  create?: Maybe<SeasonsFields_CreatedAt_Create>;
  delete?: Maybe<SeasonsFields_CreatedAt_Delete>;
  read?: Maybe<SeasonsFields_CreatedAt_Read>;
  update?: Maybe<SeasonsFields_CreatedAt_Update>;
};

export type SeasonsFields_CreatedAt_Create = {
  __typename?: 'SeasonsFields_createdAt_Create';
  permission: Scalars['Boolean']['output'];
};

export type SeasonsFields_CreatedAt_Delete = {
  __typename?: 'SeasonsFields_createdAt_Delete';
  permission: Scalars['Boolean']['output'];
};

export type SeasonsFields_CreatedAt_Read = {
  __typename?: 'SeasonsFields_createdAt_Read';
  permission: Scalars['Boolean']['output'];
};

export type SeasonsFields_CreatedAt_Update = {
  __typename?: 'SeasonsFields_createdAt_Update';
  permission: Scalars['Boolean']['output'];
};

export type SeasonsFields_Episodes = {
  __typename?: 'SeasonsFields_episodes';
  create?: Maybe<SeasonsFields_Episodes_Create>;
  delete?: Maybe<SeasonsFields_Episodes_Delete>;
  read?: Maybe<SeasonsFields_Episodes_Read>;
  update?: Maybe<SeasonsFields_Episodes_Update>;
};

export type SeasonsFields_Episodes_Create = {
  __typename?: 'SeasonsFields_episodes_Create';
  permission: Scalars['Boolean']['output'];
};

export type SeasonsFields_Episodes_Delete = {
  __typename?: 'SeasonsFields_episodes_Delete';
  permission: Scalars['Boolean']['output'];
};

export type SeasonsFields_Episodes_Read = {
  __typename?: 'SeasonsFields_episodes_Read';
  permission: Scalars['Boolean']['output'];
};

export type SeasonsFields_Episodes_Update = {
  __typename?: 'SeasonsFields_episodes_Update';
  permission: Scalars['Boolean']['output'];
};

export type SeasonsFields_ReleaseYear = {
  __typename?: 'SeasonsFields_releaseYear';
  create?: Maybe<SeasonsFields_ReleaseYear_Create>;
  delete?: Maybe<SeasonsFields_ReleaseYear_Delete>;
  read?: Maybe<SeasonsFields_ReleaseYear_Read>;
  update?: Maybe<SeasonsFields_ReleaseYear_Update>;
};

export type SeasonsFields_ReleaseYear_Create = {
  __typename?: 'SeasonsFields_releaseYear_Create';
  permission: Scalars['Boolean']['output'];
};

export type SeasonsFields_ReleaseYear_Delete = {
  __typename?: 'SeasonsFields_releaseYear_Delete';
  permission: Scalars['Boolean']['output'];
};

export type SeasonsFields_ReleaseYear_Read = {
  __typename?: 'SeasonsFields_releaseYear_Read';
  permission: Scalars['Boolean']['output'];
};

export type SeasonsFields_ReleaseYear_Update = {
  __typename?: 'SeasonsFields_releaseYear_Update';
  permission: Scalars['Boolean']['output'];
};

export type SeasonsFields_SeasonNumber = {
  __typename?: 'SeasonsFields_seasonNumber';
  create?: Maybe<SeasonsFields_SeasonNumber_Create>;
  delete?: Maybe<SeasonsFields_SeasonNumber_Delete>;
  read?: Maybe<SeasonsFields_SeasonNumber_Read>;
  update?: Maybe<SeasonsFields_SeasonNumber_Update>;
};

export type SeasonsFields_SeasonNumber_Create = {
  __typename?: 'SeasonsFields_seasonNumber_Create';
  permission: Scalars['Boolean']['output'];
};

export type SeasonsFields_SeasonNumber_Delete = {
  __typename?: 'SeasonsFields_seasonNumber_Delete';
  permission: Scalars['Boolean']['output'];
};

export type SeasonsFields_SeasonNumber_Read = {
  __typename?: 'SeasonsFields_seasonNumber_Read';
  permission: Scalars['Boolean']['output'];
};

export type SeasonsFields_SeasonNumber_Update = {
  __typename?: 'SeasonsFields_seasonNumber_Update';
  permission: Scalars['Boolean']['output'];
};

export type SeasonsFields_Title = {
  __typename?: 'SeasonsFields_title';
  create?: Maybe<SeasonsFields_Title_Create>;
  delete?: Maybe<SeasonsFields_Title_Delete>;
  read?: Maybe<SeasonsFields_Title_Read>;
  update?: Maybe<SeasonsFields_Title_Update>;
};

export type SeasonsFields_Title_Create = {
  __typename?: 'SeasonsFields_title_Create';
  permission: Scalars['Boolean']['output'];
};

export type SeasonsFields_Title_Delete = {
  __typename?: 'SeasonsFields_title_Delete';
  permission: Scalars['Boolean']['output'];
};

export type SeasonsFields_Title_Read = {
  __typename?: 'SeasonsFields_title_Read';
  permission: Scalars['Boolean']['output'];
};

export type SeasonsFields_Title_Update = {
  __typename?: 'SeasonsFields_title_Update';
  permission: Scalars['Boolean']['output'];
};

export type SeasonsFields_UpdatedAt = {
  __typename?: 'SeasonsFields_updatedAt';
  create?: Maybe<SeasonsFields_UpdatedAt_Create>;
  delete?: Maybe<SeasonsFields_UpdatedAt_Delete>;
  read?: Maybe<SeasonsFields_UpdatedAt_Read>;
  update?: Maybe<SeasonsFields_UpdatedAt_Update>;
};

export type SeasonsFields_UpdatedAt_Create = {
  __typename?: 'SeasonsFields_updatedAt_Create';
  permission: Scalars['Boolean']['output'];
};

export type SeasonsFields_UpdatedAt_Delete = {
  __typename?: 'SeasonsFields_updatedAt_Delete';
  permission: Scalars['Boolean']['output'];
};

export type SeasonsFields_UpdatedAt_Read = {
  __typename?: 'SeasonsFields_updatedAt_Read';
  permission: Scalars['Boolean']['output'];
};

export type SeasonsFields_UpdatedAt_Update = {
  __typename?: 'SeasonsFields_updatedAt_Update';
  permission: Scalars['Boolean']['output'];
};

export type SeasonsReadAccess = {
  __typename?: 'SeasonsReadAccess';
  permission: Scalars['Boolean']['output'];
  where?: Maybe<Scalars['JSONObject']['output']>;
};

export type SeasonsReadDocAccess = {
  __typename?: 'SeasonsReadDocAccess';
  permission: Scalars['Boolean']['output'];
  where?: Maybe<Scalars['JSONObject']['output']>;
};

export type SeasonsUpdateAccess = {
  __typename?: 'SeasonsUpdateAccess';
  permission: Scalars['Boolean']['output'];
  where?: Maybe<Scalars['JSONObject']['output']>;
};

export type SeasonsUpdateDocAccess = {
  __typename?: 'SeasonsUpdateDocAccess';
  permission: Scalars['Boolean']['output'];
  where?: Maybe<Scalars['JSONObject']['output']>;
};

export type User = {
  __typename?: 'User';
  avatar?: Maybe<Media>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  email: Scalars['EmailAddress']['output'];
  hash?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  lockUntil?: Maybe<Scalars['DateTime']['output']>;
  loginAttempts?: Maybe<Scalars['Float']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  resetPasswordExpiration?: Maybe<Scalars['DateTime']['output']>;
  resetPasswordToken?: Maybe<Scalars['String']['output']>;
  roles?: Maybe<Array<User_Roles>>;
  salt?: Maybe<Scalars['String']['output']>;
  sessions?: Maybe<Array<User_Sessions>>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export enum UserUpdate_Roles_MutationInput {
  Admin = 'admin',
  Editor = 'editor',
  User = 'user'
}

export type User_Sessions = {
  __typename?: 'User_Sessions';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  expiresAt?: Maybe<Scalars['DateTime']['output']>;
  id?: Maybe<Scalars['String']['output']>;
};

export type User_Avatar_Operator = {
  all?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>;
  equals?: InputMaybe<Scalars['JSON']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>;
  not_equals?: InputMaybe<Scalars['JSON']['input']>;
  not_in?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>;
};

export type User_CreatedAt_Operator = {
  equals?: InputMaybe<Scalars['DateTime']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  greater_than?: InputMaybe<Scalars['DateTime']['input']>;
  greater_than_equal?: InputMaybe<Scalars['DateTime']['input']>;
  less_than?: InputMaybe<Scalars['DateTime']['input']>;
  less_than_equal?: InputMaybe<Scalars['DateTime']['input']>;
  like?: InputMaybe<Scalars['DateTime']['input']>;
  not_equals?: InputMaybe<Scalars['DateTime']['input']>;
};

export type User_Email_Operator = {
  all?: InputMaybe<Array<InputMaybe<Scalars['EmailAddress']['input']>>>;
  contains?: InputMaybe<Scalars['EmailAddress']['input']>;
  equals?: InputMaybe<Scalars['EmailAddress']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['EmailAddress']['input']>>>;
  like?: InputMaybe<Scalars['EmailAddress']['input']>;
  not_equals?: InputMaybe<Scalars['EmailAddress']['input']>;
  not_in?: InputMaybe<Array<InputMaybe<Scalars['EmailAddress']['input']>>>;
};

export type User_Id_Operator = {
  equals?: InputMaybe<Scalars['Int']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  greater_than?: InputMaybe<Scalars['Int']['input']>;
  greater_than_equal?: InputMaybe<Scalars['Int']['input']>;
  less_than?: InputMaybe<Scalars['Int']['input']>;
  less_than_equal?: InputMaybe<Scalars['Int']['input']>;
  not_equals?: InputMaybe<Scalars['Int']['input']>;
};

export type User_Name_Operator = {
  all?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  contains?: InputMaybe<Scalars['String']['input']>;
  equals?: InputMaybe<Scalars['String']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  like?: InputMaybe<Scalars['String']['input']>;
  not_equals?: InputMaybe<Scalars['String']['input']>;
  not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export enum User_Roles {
  Admin = 'admin',
  Editor = 'editor',
  User = 'user'
}

export enum User_Roles_Input {
  Admin = 'admin',
  Editor = 'editor',
  User = 'user'
}

export enum User_Roles_MutationInput {
  Admin = 'admin',
  Editor = 'editor',
  User = 'user'
}

export type User_Roles_Operator = {
  all?: InputMaybe<Array<InputMaybe<User_Roles_Input>>>;
  equals?: InputMaybe<User_Roles_Input>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  in?: InputMaybe<Array<InputMaybe<User_Roles_Input>>>;
  not_equals?: InputMaybe<User_Roles_Input>;
  not_in?: InputMaybe<Array<InputMaybe<User_Roles_Input>>>;
};

export type User_Sessions__CreatedAt_Operator = {
  equals?: InputMaybe<Scalars['DateTime']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  greater_than?: InputMaybe<Scalars['DateTime']['input']>;
  greater_than_equal?: InputMaybe<Scalars['DateTime']['input']>;
  less_than?: InputMaybe<Scalars['DateTime']['input']>;
  less_than_equal?: InputMaybe<Scalars['DateTime']['input']>;
  like?: InputMaybe<Scalars['DateTime']['input']>;
  not_equals?: InputMaybe<Scalars['DateTime']['input']>;
};

export type User_Sessions__ExpiresAt_Operator = {
  equals?: InputMaybe<Scalars['DateTime']['input']>;
  greater_than?: InputMaybe<Scalars['DateTime']['input']>;
  greater_than_equal?: InputMaybe<Scalars['DateTime']['input']>;
  less_than?: InputMaybe<Scalars['DateTime']['input']>;
  less_than_equal?: InputMaybe<Scalars['DateTime']['input']>;
  like?: InputMaybe<Scalars['DateTime']['input']>;
  not_equals?: InputMaybe<Scalars['DateTime']['input']>;
};

export type User_Sessions__Id_Operator = {
  all?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  contains?: InputMaybe<Scalars['String']['input']>;
  equals?: InputMaybe<Scalars['String']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  like?: InputMaybe<Scalars['String']['input']>;
  not_equals?: InputMaybe<Scalars['String']['input']>;
  not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type User_UpdatedAt_Operator = {
  equals?: InputMaybe<Scalars['DateTime']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  greater_than?: InputMaybe<Scalars['DateTime']['input']>;
  greater_than_equal?: InputMaybe<Scalars['DateTime']['input']>;
  less_than?: InputMaybe<Scalars['DateTime']['input']>;
  less_than_equal?: InputMaybe<Scalars['DateTime']['input']>;
  like?: InputMaybe<Scalars['DateTime']['input']>;
  not_equals?: InputMaybe<Scalars['DateTime']['input']>;
};

export type User_Where = {
  AND?: InputMaybe<Array<InputMaybe<User_Where_And>>>;
  OR?: InputMaybe<Array<InputMaybe<User_Where_Or>>>;
  avatar?: InputMaybe<User_Avatar_Operator>;
  createdAt?: InputMaybe<User_CreatedAt_Operator>;
  email?: InputMaybe<User_Email_Operator>;
  id?: InputMaybe<User_Id_Operator>;
  name?: InputMaybe<User_Name_Operator>;
  roles?: InputMaybe<User_Roles_Operator>;
  sessions__createdAt?: InputMaybe<User_Sessions__CreatedAt_Operator>;
  sessions__expiresAt?: InputMaybe<User_Sessions__ExpiresAt_Operator>;
  sessions__id?: InputMaybe<User_Sessions__Id_Operator>;
  updatedAt?: InputMaybe<User_UpdatedAt_Operator>;
};

export type User_Where_And = {
  AND?: InputMaybe<Array<InputMaybe<User_Where_And>>>;
  OR?: InputMaybe<Array<InputMaybe<User_Where_Or>>>;
  avatar?: InputMaybe<User_Avatar_Operator>;
  createdAt?: InputMaybe<User_CreatedAt_Operator>;
  email?: InputMaybe<User_Email_Operator>;
  id?: InputMaybe<User_Id_Operator>;
  name?: InputMaybe<User_Name_Operator>;
  roles?: InputMaybe<User_Roles_Operator>;
  sessions__createdAt?: InputMaybe<User_Sessions__CreatedAt_Operator>;
  sessions__expiresAt?: InputMaybe<User_Sessions__ExpiresAt_Operator>;
  sessions__id?: InputMaybe<User_Sessions__Id_Operator>;
  updatedAt?: InputMaybe<User_UpdatedAt_Operator>;
};

export type User_Where_Or = {
  AND?: InputMaybe<Array<InputMaybe<User_Where_And>>>;
  OR?: InputMaybe<Array<InputMaybe<User_Where_Or>>>;
  avatar?: InputMaybe<User_Avatar_Operator>;
  createdAt?: InputMaybe<User_CreatedAt_Operator>;
  email?: InputMaybe<User_Email_Operator>;
  id?: InputMaybe<User_Id_Operator>;
  name?: InputMaybe<User_Name_Operator>;
  roles?: InputMaybe<User_Roles_Operator>;
  sessions__createdAt?: InputMaybe<User_Sessions__CreatedAt_Operator>;
  sessions__expiresAt?: InputMaybe<User_Sessions__ExpiresAt_Operator>;
  sessions__id?: InputMaybe<User_Sessions__Id_Operator>;
  updatedAt?: InputMaybe<User_UpdatedAt_Operator>;
};

export type Users = {
  __typename?: 'Users';
  docs: Array<User>;
  hasNextPage: Scalars['Boolean']['output'];
  hasPrevPage: Scalars['Boolean']['output'];
  limit: Scalars['Int']['output'];
  nextPage?: Maybe<Scalars['Int']['output']>;
  offset?: Maybe<Scalars['Int']['output']>;
  page: Scalars['Int']['output'];
  pagingCounter: Scalars['Int']['output'];
  prevPage?: Maybe<Scalars['Int']['output']>;
  totalDocs: Scalars['Int']['output'];
  totalPages: Scalars['Int']['output'];
};

export type UsersCreateAccess = {
  __typename?: 'UsersCreateAccess';
  permission: Scalars['Boolean']['output'];
  where?: Maybe<Scalars['JSONObject']['output']>;
};

export type UsersCreateDocAccess = {
  __typename?: 'UsersCreateDocAccess';
  permission: Scalars['Boolean']['output'];
  where?: Maybe<Scalars['JSONObject']['output']>;
};

export type UsersDeleteAccess = {
  __typename?: 'UsersDeleteAccess';
  permission: Scalars['Boolean']['output'];
  where?: Maybe<Scalars['JSONObject']['output']>;
};

export type UsersDeleteDocAccess = {
  __typename?: 'UsersDeleteDocAccess';
  permission: Scalars['Boolean']['output'];
  where?: Maybe<Scalars['JSONObject']['output']>;
};

export type UsersDocAccessFields = {
  __typename?: 'UsersDocAccessFields';
  avatar?: Maybe<UsersDocAccessFields_Avatar>;
  createdAt?: Maybe<UsersDocAccessFields_CreatedAt>;
  email?: Maybe<UsersDocAccessFields_Email>;
  name?: Maybe<UsersDocAccessFields_Name>;
  roles?: Maybe<UsersDocAccessFields_Roles>;
  sessions?: Maybe<UsersDocAccessFields_Sessions>;
  updatedAt?: Maybe<UsersDocAccessFields_UpdatedAt>;
};

export type UsersDocAccessFields_Avatar = {
  __typename?: 'UsersDocAccessFields_avatar';
  create?: Maybe<UsersDocAccessFields_Avatar_Create>;
  delete?: Maybe<UsersDocAccessFields_Avatar_Delete>;
  read?: Maybe<UsersDocAccessFields_Avatar_Read>;
  update?: Maybe<UsersDocAccessFields_Avatar_Update>;
};

export type UsersDocAccessFields_Avatar_Create = {
  __typename?: 'UsersDocAccessFields_avatar_Create';
  permission: Scalars['Boolean']['output'];
};

export type UsersDocAccessFields_Avatar_Delete = {
  __typename?: 'UsersDocAccessFields_avatar_Delete';
  permission: Scalars['Boolean']['output'];
};

export type UsersDocAccessFields_Avatar_Read = {
  __typename?: 'UsersDocAccessFields_avatar_Read';
  permission: Scalars['Boolean']['output'];
};

export type UsersDocAccessFields_Avatar_Update = {
  __typename?: 'UsersDocAccessFields_avatar_Update';
  permission: Scalars['Boolean']['output'];
};

export type UsersDocAccessFields_CreatedAt = {
  __typename?: 'UsersDocAccessFields_createdAt';
  create?: Maybe<UsersDocAccessFields_CreatedAt_Create>;
  delete?: Maybe<UsersDocAccessFields_CreatedAt_Delete>;
  read?: Maybe<UsersDocAccessFields_CreatedAt_Read>;
  update?: Maybe<UsersDocAccessFields_CreatedAt_Update>;
};

export type UsersDocAccessFields_CreatedAt_Create = {
  __typename?: 'UsersDocAccessFields_createdAt_Create';
  permission: Scalars['Boolean']['output'];
};

export type UsersDocAccessFields_CreatedAt_Delete = {
  __typename?: 'UsersDocAccessFields_createdAt_Delete';
  permission: Scalars['Boolean']['output'];
};

export type UsersDocAccessFields_CreatedAt_Read = {
  __typename?: 'UsersDocAccessFields_createdAt_Read';
  permission: Scalars['Boolean']['output'];
};

export type UsersDocAccessFields_CreatedAt_Update = {
  __typename?: 'UsersDocAccessFields_createdAt_Update';
  permission: Scalars['Boolean']['output'];
};

export type UsersDocAccessFields_Email = {
  __typename?: 'UsersDocAccessFields_email';
  create?: Maybe<UsersDocAccessFields_Email_Create>;
  delete?: Maybe<UsersDocAccessFields_Email_Delete>;
  read?: Maybe<UsersDocAccessFields_Email_Read>;
  update?: Maybe<UsersDocAccessFields_Email_Update>;
};

export type UsersDocAccessFields_Email_Create = {
  __typename?: 'UsersDocAccessFields_email_Create';
  permission: Scalars['Boolean']['output'];
};

export type UsersDocAccessFields_Email_Delete = {
  __typename?: 'UsersDocAccessFields_email_Delete';
  permission: Scalars['Boolean']['output'];
};

export type UsersDocAccessFields_Email_Read = {
  __typename?: 'UsersDocAccessFields_email_Read';
  permission: Scalars['Boolean']['output'];
};

export type UsersDocAccessFields_Email_Update = {
  __typename?: 'UsersDocAccessFields_email_Update';
  permission: Scalars['Boolean']['output'];
};

export type UsersDocAccessFields_Name = {
  __typename?: 'UsersDocAccessFields_name';
  create?: Maybe<UsersDocAccessFields_Name_Create>;
  delete?: Maybe<UsersDocAccessFields_Name_Delete>;
  read?: Maybe<UsersDocAccessFields_Name_Read>;
  update?: Maybe<UsersDocAccessFields_Name_Update>;
};

export type UsersDocAccessFields_Name_Create = {
  __typename?: 'UsersDocAccessFields_name_Create';
  permission: Scalars['Boolean']['output'];
};

export type UsersDocAccessFields_Name_Delete = {
  __typename?: 'UsersDocAccessFields_name_Delete';
  permission: Scalars['Boolean']['output'];
};

export type UsersDocAccessFields_Name_Read = {
  __typename?: 'UsersDocAccessFields_name_Read';
  permission: Scalars['Boolean']['output'];
};

export type UsersDocAccessFields_Name_Update = {
  __typename?: 'UsersDocAccessFields_name_Update';
  permission: Scalars['Boolean']['output'];
};

export type UsersDocAccessFields_Roles = {
  __typename?: 'UsersDocAccessFields_roles';
  create?: Maybe<UsersDocAccessFields_Roles_Create>;
  delete?: Maybe<UsersDocAccessFields_Roles_Delete>;
  read?: Maybe<UsersDocAccessFields_Roles_Read>;
  update?: Maybe<UsersDocAccessFields_Roles_Update>;
};

export type UsersDocAccessFields_Roles_Create = {
  __typename?: 'UsersDocAccessFields_roles_Create';
  permission: Scalars['Boolean']['output'];
};

export type UsersDocAccessFields_Roles_Delete = {
  __typename?: 'UsersDocAccessFields_roles_Delete';
  permission: Scalars['Boolean']['output'];
};

export type UsersDocAccessFields_Roles_Read = {
  __typename?: 'UsersDocAccessFields_roles_Read';
  permission: Scalars['Boolean']['output'];
};

export type UsersDocAccessFields_Roles_Update = {
  __typename?: 'UsersDocAccessFields_roles_Update';
  permission: Scalars['Boolean']['output'];
};

export type UsersDocAccessFields_Sessions = {
  __typename?: 'UsersDocAccessFields_sessions';
  create?: Maybe<UsersDocAccessFields_Sessions_Create>;
  delete?: Maybe<UsersDocAccessFields_Sessions_Delete>;
  fields?: Maybe<UsersDocAccessFields_Sessions_Fields>;
  read?: Maybe<UsersDocAccessFields_Sessions_Read>;
  update?: Maybe<UsersDocAccessFields_Sessions_Update>;
};

export type UsersDocAccessFields_Sessions_Create = {
  __typename?: 'UsersDocAccessFields_sessions_Create';
  permission: Scalars['Boolean']['output'];
};

export type UsersDocAccessFields_Sessions_Delete = {
  __typename?: 'UsersDocAccessFields_sessions_Delete';
  permission: Scalars['Boolean']['output'];
};

export type UsersDocAccessFields_Sessions_Fields = {
  __typename?: 'UsersDocAccessFields_sessions_Fields';
  createdAt?: Maybe<UsersDocAccessFields_Sessions_CreatedAt>;
  expiresAt?: Maybe<UsersDocAccessFields_Sessions_ExpiresAt>;
  id?: Maybe<UsersDocAccessFields_Sessions_Id>;
};

export type UsersDocAccessFields_Sessions_Read = {
  __typename?: 'UsersDocAccessFields_sessions_Read';
  permission: Scalars['Boolean']['output'];
};

export type UsersDocAccessFields_Sessions_Update = {
  __typename?: 'UsersDocAccessFields_sessions_Update';
  permission: Scalars['Boolean']['output'];
};

export type UsersDocAccessFields_Sessions_CreatedAt = {
  __typename?: 'UsersDocAccessFields_sessions_createdAt';
  create?: Maybe<UsersDocAccessFields_Sessions_CreatedAt_Create>;
  delete?: Maybe<UsersDocAccessFields_Sessions_CreatedAt_Delete>;
  read?: Maybe<UsersDocAccessFields_Sessions_CreatedAt_Read>;
  update?: Maybe<UsersDocAccessFields_Sessions_CreatedAt_Update>;
};

export type UsersDocAccessFields_Sessions_CreatedAt_Create = {
  __typename?: 'UsersDocAccessFields_sessions_createdAt_Create';
  permission: Scalars['Boolean']['output'];
};

export type UsersDocAccessFields_Sessions_CreatedAt_Delete = {
  __typename?: 'UsersDocAccessFields_sessions_createdAt_Delete';
  permission: Scalars['Boolean']['output'];
};

export type UsersDocAccessFields_Sessions_CreatedAt_Read = {
  __typename?: 'UsersDocAccessFields_sessions_createdAt_Read';
  permission: Scalars['Boolean']['output'];
};

export type UsersDocAccessFields_Sessions_CreatedAt_Update = {
  __typename?: 'UsersDocAccessFields_sessions_createdAt_Update';
  permission: Scalars['Boolean']['output'];
};

export type UsersDocAccessFields_Sessions_ExpiresAt = {
  __typename?: 'UsersDocAccessFields_sessions_expiresAt';
  create?: Maybe<UsersDocAccessFields_Sessions_ExpiresAt_Create>;
  delete?: Maybe<UsersDocAccessFields_Sessions_ExpiresAt_Delete>;
  read?: Maybe<UsersDocAccessFields_Sessions_ExpiresAt_Read>;
  update?: Maybe<UsersDocAccessFields_Sessions_ExpiresAt_Update>;
};

export type UsersDocAccessFields_Sessions_ExpiresAt_Create = {
  __typename?: 'UsersDocAccessFields_sessions_expiresAt_Create';
  permission: Scalars['Boolean']['output'];
};

export type UsersDocAccessFields_Sessions_ExpiresAt_Delete = {
  __typename?: 'UsersDocAccessFields_sessions_expiresAt_Delete';
  permission: Scalars['Boolean']['output'];
};

export type UsersDocAccessFields_Sessions_ExpiresAt_Read = {
  __typename?: 'UsersDocAccessFields_sessions_expiresAt_Read';
  permission: Scalars['Boolean']['output'];
};

export type UsersDocAccessFields_Sessions_ExpiresAt_Update = {
  __typename?: 'UsersDocAccessFields_sessions_expiresAt_Update';
  permission: Scalars['Boolean']['output'];
};

export type UsersDocAccessFields_Sessions_Id = {
  __typename?: 'UsersDocAccessFields_sessions_id';
  create?: Maybe<UsersDocAccessFields_Sessions_Id_Create>;
  delete?: Maybe<UsersDocAccessFields_Sessions_Id_Delete>;
  read?: Maybe<UsersDocAccessFields_Sessions_Id_Read>;
  update?: Maybe<UsersDocAccessFields_Sessions_Id_Update>;
};

export type UsersDocAccessFields_Sessions_Id_Create = {
  __typename?: 'UsersDocAccessFields_sessions_id_Create';
  permission: Scalars['Boolean']['output'];
};

export type UsersDocAccessFields_Sessions_Id_Delete = {
  __typename?: 'UsersDocAccessFields_sessions_id_Delete';
  permission: Scalars['Boolean']['output'];
};

export type UsersDocAccessFields_Sessions_Id_Read = {
  __typename?: 'UsersDocAccessFields_sessions_id_Read';
  permission: Scalars['Boolean']['output'];
};

export type UsersDocAccessFields_Sessions_Id_Update = {
  __typename?: 'UsersDocAccessFields_sessions_id_Update';
  permission: Scalars['Boolean']['output'];
};

export type UsersDocAccessFields_UpdatedAt = {
  __typename?: 'UsersDocAccessFields_updatedAt';
  create?: Maybe<UsersDocAccessFields_UpdatedAt_Create>;
  delete?: Maybe<UsersDocAccessFields_UpdatedAt_Delete>;
  read?: Maybe<UsersDocAccessFields_UpdatedAt_Read>;
  update?: Maybe<UsersDocAccessFields_UpdatedAt_Update>;
};

export type UsersDocAccessFields_UpdatedAt_Create = {
  __typename?: 'UsersDocAccessFields_updatedAt_Create';
  permission: Scalars['Boolean']['output'];
};

export type UsersDocAccessFields_UpdatedAt_Delete = {
  __typename?: 'UsersDocAccessFields_updatedAt_Delete';
  permission: Scalars['Boolean']['output'];
};

export type UsersDocAccessFields_UpdatedAt_Read = {
  __typename?: 'UsersDocAccessFields_updatedAt_Read';
  permission: Scalars['Boolean']['output'];
};

export type UsersDocAccessFields_UpdatedAt_Update = {
  __typename?: 'UsersDocAccessFields_updatedAt_Update';
  permission: Scalars['Boolean']['output'];
};

export type UsersFields = {
  __typename?: 'UsersFields';
  avatar?: Maybe<UsersFields_Avatar>;
  createdAt?: Maybe<UsersFields_CreatedAt>;
  email?: Maybe<UsersFields_Email>;
  name?: Maybe<UsersFields_Name>;
  roles?: Maybe<UsersFields_Roles>;
  sessions?: Maybe<UsersFields_Sessions>;
  updatedAt?: Maybe<UsersFields_UpdatedAt>;
};

export type UsersFields_Avatar = {
  __typename?: 'UsersFields_avatar';
  create?: Maybe<UsersFields_Avatar_Create>;
  delete?: Maybe<UsersFields_Avatar_Delete>;
  read?: Maybe<UsersFields_Avatar_Read>;
  update?: Maybe<UsersFields_Avatar_Update>;
};

export type UsersFields_Avatar_Create = {
  __typename?: 'UsersFields_avatar_Create';
  permission: Scalars['Boolean']['output'];
};

export type UsersFields_Avatar_Delete = {
  __typename?: 'UsersFields_avatar_Delete';
  permission: Scalars['Boolean']['output'];
};

export type UsersFields_Avatar_Read = {
  __typename?: 'UsersFields_avatar_Read';
  permission: Scalars['Boolean']['output'];
};

export type UsersFields_Avatar_Update = {
  __typename?: 'UsersFields_avatar_Update';
  permission: Scalars['Boolean']['output'];
};

export type UsersFields_CreatedAt = {
  __typename?: 'UsersFields_createdAt';
  create?: Maybe<UsersFields_CreatedAt_Create>;
  delete?: Maybe<UsersFields_CreatedAt_Delete>;
  read?: Maybe<UsersFields_CreatedAt_Read>;
  update?: Maybe<UsersFields_CreatedAt_Update>;
};

export type UsersFields_CreatedAt_Create = {
  __typename?: 'UsersFields_createdAt_Create';
  permission: Scalars['Boolean']['output'];
};

export type UsersFields_CreatedAt_Delete = {
  __typename?: 'UsersFields_createdAt_Delete';
  permission: Scalars['Boolean']['output'];
};

export type UsersFields_CreatedAt_Read = {
  __typename?: 'UsersFields_createdAt_Read';
  permission: Scalars['Boolean']['output'];
};

export type UsersFields_CreatedAt_Update = {
  __typename?: 'UsersFields_createdAt_Update';
  permission: Scalars['Boolean']['output'];
};

export type UsersFields_Email = {
  __typename?: 'UsersFields_email';
  create?: Maybe<UsersFields_Email_Create>;
  delete?: Maybe<UsersFields_Email_Delete>;
  read?: Maybe<UsersFields_Email_Read>;
  update?: Maybe<UsersFields_Email_Update>;
};

export type UsersFields_Email_Create = {
  __typename?: 'UsersFields_email_Create';
  permission: Scalars['Boolean']['output'];
};

export type UsersFields_Email_Delete = {
  __typename?: 'UsersFields_email_Delete';
  permission: Scalars['Boolean']['output'];
};

export type UsersFields_Email_Read = {
  __typename?: 'UsersFields_email_Read';
  permission: Scalars['Boolean']['output'];
};

export type UsersFields_Email_Update = {
  __typename?: 'UsersFields_email_Update';
  permission: Scalars['Boolean']['output'];
};

export type UsersFields_Name = {
  __typename?: 'UsersFields_name';
  create?: Maybe<UsersFields_Name_Create>;
  delete?: Maybe<UsersFields_Name_Delete>;
  read?: Maybe<UsersFields_Name_Read>;
  update?: Maybe<UsersFields_Name_Update>;
};

export type UsersFields_Name_Create = {
  __typename?: 'UsersFields_name_Create';
  permission: Scalars['Boolean']['output'];
};

export type UsersFields_Name_Delete = {
  __typename?: 'UsersFields_name_Delete';
  permission: Scalars['Boolean']['output'];
};

export type UsersFields_Name_Read = {
  __typename?: 'UsersFields_name_Read';
  permission: Scalars['Boolean']['output'];
};

export type UsersFields_Name_Update = {
  __typename?: 'UsersFields_name_Update';
  permission: Scalars['Boolean']['output'];
};

export type UsersFields_Roles = {
  __typename?: 'UsersFields_roles';
  create?: Maybe<UsersFields_Roles_Create>;
  delete?: Maybe<UsersFields_Roles_Delete>;
  read?: Maybe<UsersFields_Roles_Read>;
  update?: Maybe<UsersFields_Roles_Update>;
};

export type UsersFields_Roles_Create = {
  __typename?: 'UsersFields_roles_Create';
  permission: Scalars['Boolean']['output'];
};

export type UsersFields_Roles_Delete = {
  __typename?: 'UsersFields_roles_Delete';
  permission: Scalars['Boolean']['output'];
};

export type UsersFields_Roles_Read = {
  __typename?: 'UsersFields_roles_Read';
  permission: Scalars['Boolean']['output'];
};

export type UsersFields_Roles_Update = {
  __typename?: 'UsersFields_roles_Update';
  permission: Scalars['Boolean']['output'];
};

export type UsersFields_Sessions = {
  __typename?: 'UsersFields_sessions';
  create?: Maybe<UsersFields_Sessions_Create>;
  delete?: Maybe<UsersFields_Sessions_Delete>;
  fields?: Maybe<UsersFields_Sessions_Fields>;
  read?: Maybe<UsersFields_Sessions_Read>;
  update?: Maybe<UsersFields_Sessions_Update>;
};

export type UsersFields_Sessions_Create = {
  __typename?: 'UsersFields_sessions_Create';
  permission: Scalars['Boolean']['output'];
};

export type UsersFields_Sessions_Delete = {
  __typename?: 'UsersFields_sessions_Delete';
  permission: Scalars['Boolean']['output'];
};

export type UsersFields_Sessions_Fields = {
  __typename?: 'UsersFields_sessions_Fields';
  createdAt?: Maybe<UsersFields_Sessions_CreatedAt>;
  expiresAt?: Maybe<UsersFields_Sessions_ExpiresAt>;
  id?: Maybe<UsersFields_Sessions_Id>;
};

export type UsersFields_Sessions_Read = {
  __typename?: 'UsersFields_sessions_Read';
  permission: Scalars['Boolean']['output'];
};

export type UsersFields_Sessions_Update = {
  __typename?: 'UsersFields_sessions_Update';
  permission: Scalars['Boolean']['output'];
};

export type UsersFields_Sessions_CreatedAt = {
  __typename?: 'UsersFields_sessions_createdAt';
  create?: Maybe<UsersFields_Sessions_CreatedAt_Create>;
  delete?: Maybe<UsersFields_Sessions_CreatedAt_Delete>;
  read?: Maybe<UsersFields_Sessions_CreatedAt_Read>;
  update?: Maybe<UsersFields_Sessions_CreatedAt_Update>;
};

export type UsersFields_Sessions_CreatedAt_Create = {
  __typename?: 'UsersFields_sessions_createdAt_Create';
  permission: Scalars['Boolean']['output'];
};

export type UsersFields_Sessions_CreatedAt_Delete = {
  __typename?: 'UsersFields_sessions_createdAt_Delete';
  permission: Scalars['Boolean']['output'];
};

export type UsersFields_Sessions_CreatedAt_Read = {
  __typename?: 'UsersFields_sessions_createdAt_Read';
  permission: Scalars['Boolean']['output'];
};

export type UsersFields_Sessions_CreatedAt_Update = {
  __typename?: 'UsersFields_sessions_createdAt_Update';
  permission: Scalars['Boolean']['output'];
};

export type UsersFields_Sessions_ExpiresAt = {
  __typename?: 'UsersFields_sessions_expiresAt';
  create?: Maybe<UsersFields_Sessions_ExpiresAt_Create>;
  delete?: Maybe<UsersFields_Sessions_ExpiresAt_Delete>;
  read?: Maybe<UsersFields_Sessions_ExpiresAt_Read>;
  update?: Maybe<UsersFields_Sessions_ExpiresAt_Update>;
};

export type UsersFields_Sessions_ExpiresAt_Create = {
  __typename?: 'UsersFields_sessions_expiresAt_Create';
  permission: Scalars['Boolean']['output'];
};

export type UsersFields_Sessions_ExpiresAt_Delete = {
  __typename?: 'UsersFields_sessions_expiresAt_Delete';
  permission: Scalars['Boolean']['output'];
};

export type UsersFields_Sessions_ExpiresAt_Read = {
  __typename?: 'UsersFields_sessions_expiresAt_Read';
  permission: Scalars['Boolean']['output'];
};

export type UsersFields_Sessions_ExpiresAt_Update = {
  __typename?: 'UsersFields_sessions_expiresAt_Update';
  permission: Scalars['Boolean']['output'];
};

export type UsersFields_Sessions_Id = {
  __typename?: 'UsersFields_sessions_id';
  create?: Maybe<UsersFields_Sessions_Id_Create>;
  delete?: Maybe<UsersFields_Sessions_Id_Delete>;
  read?: Maybe<UsersFields_Sessions_Id_Read>;
  update?: Maybe<UsersFields_Sessions_Id_Update>;
};

export type UsersFields_Sessions_Id_Create = {
  __typename?: 'UsersFields_sessions_id_Create';
  permission: Scalars['Boolean']['output'];
};

export type UsersFields_Sessions_Id_Delete = {
  __typename?: 'UsersFields_sessions_id_Delete';
  permission: Scalars['Boolean']['output'];
};

export type UsersFields_Sessions_Id_Read = {
  __typename?: 'UsersFields_sessions_id_Read';
  permission: Scalars['Boolean']['output'];
};

export type UsersFields_Sessions_Id_Update = {
  __typename?: 'UsersFields_sessions_id_Update';
  permission: Scalars['Boolean']['output'];
};

export type UsersFields_UpdatedAt = {
  __typename?: 'UsersFields_updatedAt';
  create?: Maybe<UsersFields_UpdatedAt_Create>;
  delete?: Maybe<UsersFields_UpdatedAt_Delete>;
  read?: Maybe<UsersFields_UpdatedAt_Read>;
  update?: Maybe<UsersFields_UpdatedAt_Update>;
};

export type UsersFields_UpdatedAt_Create = {
  __typename?: 'UsersFields_updatedAt_Create';
  permission: Scalars['Boolean']['output'];
};

export type UsersFields_UpdatedAt_Delete = {
  __typename?: 'UsersFields_updatedAt_Delete';
  permission: Scalars['Boolean']['output'];
};

export type UsersFields_UpdatedAt_Read = {
  __typename?: 'UsersFields_updatedAt_Read';
  permission: Scalars['Boolean']['output'];
};

export type UsersFields_UpdatedAt_Update = {
  __typename?: 'UsersFields_updatedAt_Update';
  permission: Scalars['Boolean']['output'];
};

export type UsersReadAccess = {
  __typename?: 'UsersReadAccess';
  permission: Scalars['Boolean']['output'];
  where?: Maybe<Scalars['JSONObject']['output']>;
};

export type UsersReadDocAccess = {
  __typename?: 'UsersReadDocAccess';
  permission: Scalars['Boolean']['output'];
  where?: Maybe<Scalars['JSONObject']['output']>;
};

export type UsersUnlockAccess = {
  __typename?: 'UsersUnlockAccess';
  permission: Scalars['Boolean']['output'];
  where?: Maybe<Scalars['JSONObject']['output']>;
};

export type UsersUnlockDocAccess = {
  __typename?: 'UsersUnlockDocAccess';
  permission: Scalars['Boolean']['output'];
  where?: Maybe<Scalars['JSONObject']['output']>;
};

export type UsersUpdateAccess = {
  __typename?: 'UsersUpdateAccess';
  permission: Scalars['Boolean']['output'];
  where?: Maybe<Scalars['JSONObject']['output']>;
};

export type UsersUpdateDocAccess = {
  __typename?: 'UsersUpdateDocAccess';
  permission: Scalars['Boolean']['output'];
  where?: Maybe<Scalars['JSONObject']['output']>;
};

export type AllMedia = {
  __typename?: 'allMedia';
  docs: Array<Media>;
  hasNextPage: Scalars['Boolean']['output'];
  hasPrevPage: Scalars['Boolean']['output'];
  limit: Scalars['Int']['output'];
  nextPage?: Maybe<Scalars['Int']['output']>;
  offset?: Maybe<Scalars['Int']['output']>;
  page: Scalars['Int']['output'];
  pagingCounter: Scalars['Int']['output'];
  prevPage?: Maybe<Scalars['Int']['output']>;
  totalDocs: Scalars['Int']['output'];
  totalPages: Scalars['Int']['output'];
};

export type ContentAccess = {
  __typename?: 'contentAccess';
  create?: Maybe<ContentCreateAccess>;
  delete?: Maybe<ContentDeleteAccess>;
  fields?: Maybe<ContentFields>;
  read?: Maybe<ContentReadAccess>;
  readVersions?: Maybe<ContentReadVersionsAccess>;
  update?: Maybe<ContentUpdateAccess>;
};

export type ContentDocAccess = {
  __typename?: 'contentDocAccess';
  create?: Maybe<ContentCreateDocAccess>;
  delete?: Maybe<ContentDeleteDocAccess>;
  fields?: Maybe<ContentDocAccessFields>;
  read?: Maybe<ContentReadDocAccess>;
  readVersions?: Maybe<ContentReadVersionsDocAccess>;
  update?: Maybe<ContentUpdateDocAccess>;
};

export type CountContents = {
  __typename?: 'countContents';
  totalDocs?: Maybe<Scalars['Int']['output']>;
};

export type CountEpisodes = {
  __typename?: 'countEpisodes';
  totalDocs?: Maybe<Scalars['Int']['output']>;
};

export type CountFavorites = {
  __typename?: 'countFavorites';
  totalDocs?: Maybe<Scalars['Int']['output']>;
};

export type CountGenres = {
  __typename?: 'countGenres';
  totalDocs?: Maybe<Scalars['Int']['output']>;
};

export type CountPayloadKvs = {
  __typename?: 'countPayloadKvs';
  totalDocs?: Maybe<Scalars['Int']['output']>;
};

export type CountPayloadLockedDocuments = {
  __typename?: 'countPayloadLockedDocuments';
  totalDocs?: Maybe<Scalars['Int']['output']>;
};

export type CountPayloadPreferences = {
  __typename?: 'countPayloadPreferences';
  totalDocs?: Maybe<Scalars['Int']['output']>;
};

export type CountSearchResults = {
  __typename?: 'countSearchResults';
  totalDocs?: Maybe<Scalars['Int']['output']>;
};

export type CountSeasons = {
  __typename?: 'countSeasons';
  totalDocs?: Maybe<Scalars['Int']['output']>;
};

export type CountUsers = {
  __typename?: 'countUsers';
  totalDocs?: Maybe<Scalars['Int']['output']>;
};

export type CountallMedia = {
  __typename?: 'countallMedia';
  totalDocs?: Maybe<Scalars['Int']['output']>;
};

export type EpisodesAccess = {
  __typename?: 'episodesAccess';
  create?: Maybe<EpisodesCreateAccess>;
  delete?: Maybe<EpisodesDeleteAccess>;
  fields?: Maybe<EpisodesFields>;
  read?: Maybe<EpisodesReadAccess>;
  update?: Maybe<EpisodesUpdateAccess>;
};

export type EpisodesDocAccess = {
  __typename?: 'episodesDocAccess';
  create?: Maybe<EpisodesCreateDocAccess>;
  delete?: Maybe<EpisodesDeleteDocAccess>;
  fields?: Maybe<EpisodesDocAccessFields>;
  read?: Maybe<EpisodesReadDocAccess>;
  update?: Maybe<EpisodesUpdateDocAccess>;
};

export type FavoritesAccess = {
  __typename?: 'favoritesAccess';
  create?: Maybe<FavoritesCreateAccess>;
  delete?: Maybe<FavoritesDeleteAccess>;
  fields?: Maybe<FavoritesFields>;
  read?: Maybe<FavoritesReadAccess>;
  update?: Maybe<FavoritesUpdateAccess>;
};

export type FavoritesDocAccess = {
  __typename?: 'favoritesDocAccess';
  create?: Maybe<FavoritesCreateDocAccess>;
  delete?: Maybe<FavoritesDeleteDocAccess>;
  fields?: Maybe<FavoritesDocAccessFields>;
  read?: Maybe<FavoritesReadDocAccess>;
  update?: Maybe<FavoritesUpdateDocAccess>;
};

export type GenresAccess = {
  __typename?: 'genresAccess';
  create?: Maybe<GenresCreateAccess>;
  delete?: Maybe<GenresDeleteAccess>;
  fields?: Maybe<GenresFields>;
  read?: Maybe<GenresReadAccess>;
  update?: Maybe<GenresUpdateAccess>;
};

export type GenresDocAccess = {
  __typename?: 'genresDocAccess';
  create?: Maybe<GenresCreateDocAccess>;
  delete?: Maybe<GenresDeleteDocAccess>;
  fields?: Maybe<GenresDocAccessFields>;
  read?: Maybe<GenresReadDocAccess>;
  update?: Maybe<GenresUpdateDocAccess>;
};

export type MediaAccess = {
  __typename?: 'mediaAccess';
  create?: Maybe<MediaCreateAccess>;
  delete?: Maybe<MediaDeleteAccess>;
  fields?: Maybe<MediaFields>;
  read?: Maybe<MediaReadAccess>;
  update?: Maybe<MediaUpdateAccess>;
};

export type MediaDocAccess = {
  __typename?: 'mediaDocAccess';
  create?: Maybe<MediaCreateDocAccess>;
  delete?: Maybe<MediaDeleteDocAccess>;
  fields?: Maybe<MediaDocAccessFields>;
  read?: Maybe<MediaReadDocAccess>;
  update?: Maybe<MediaUpdateDocAccess>;
};

export type MutationContentInput = {
  _status?: InputMaybe<Content__Status_MutationInput>;
  backdrop?: InputMaybe<Scalars['Int']['input']>;
  createdAt?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['JSON']['input']>;
  duration?: InputMaybe<Scalars['Float']['input']>;
  genres?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  kodikId?: InputMaybe<Scalars['String']['input']>;
  originalTitle?: InputMaybe<Scalars['String']['input']>;
  poster?: InputMaybe<Scalars['Int']['input']>;
  rating?: InputMaybe<Scalars['Float']['input']>;
  releaseYear: Scalars['Float']['input'];
  shikimoriId?: InputMaybe<Scalars['String']['input']>;
  slug: Scalars['String']['input'];
  status: Content_Status_MutationInput;
  titleEn: Scalars['String']['input'];
  titleRu: Scalars['String']['input'];
  type: Content_Type_MutationInput;
  updatedAt?: InputMaybe<Scalars['String']['input']>;
};

export type MutationContentUpdateInput = {
  _status?: InputMaybe<ContentUpdate__Status_MutationInput>;
  backdrop?: InputMaybe<Scalars['Int']['input']>;
  createdAt?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['JSON']['input']>;
  duration?: InputMaybe<Scalars['Float']['input']>;
  genres?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  kodikId?: InputMaybe<Scalars['String']['input']>;
  originalTitle?: InputMaybe<Scalars['String']['input']>;
  poster?: InputMaybe<Scalars['Int']['input']>;
  rating?: InputMaybe<Scalars['Float']['input']>;
  releaseYear?: InputMaybe<Scalars['Float']['input']>;
  shikimoriId?: InputMaybe<Scalars['String']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<ContentUpdate_Status_MutationInput>;
  titleEn?: InputMaybe<Scalars['String']['input']>;
  titleRu?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<ContentUpdate_Type_MutationInput>;
  updatedAt?: InputMaybe<Scalars['String']['input']>;
};

export type MutationEpisodeInput = {
  createdAt?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['JSON']['input']>;
  duration?: InputMaybe<Scalars['Float']['input']>;
  episodeNumber: Scalars['Float']['input'];
  releaseDate?: InputMaybe<Scalars['String']['input']>;
  season?: InputMaybe<Scalars['Int']['input']>;
  title: Scalars['String']['input'];
  updatedAt?: InputMaybe<Scalars['String']['input']>;
};

export type MutationEpisodeUpdateInput = {
  createdAt?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['JSON']['input']>;
  duration?: InputMaybe<Scalars['Float']['input']>;
  episodeNumber?: InputMaybe<Scalars['Float']['input']>;
  releaseDate?: InputMaybe<Scalars['String']['input']>;
  season?: InputMaybe<Scalars['Int']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['String']['input']>;
};

export type MutationFavoriteInput = {
  content?: InputMaybe<Scalars['Int']['input']>;
  createdAt?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['String']['input']>;
  user?: InputMaybe<Scalars['Int']['input']>;
};

export type MutationFavoriteUpdateInput = {
  content?: InputMaybe<Scalars['Int']['input']>;
  createdAt?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['String']['input']>;
  user?: InputMaybe<Scalars['Int']['input']>;
};

export type MutationGenreInput = {
  createdAt?: InputMaybe<Scalars['String']['input']>;
  slug: Scalars['String']['input'];
  title: Scalars['String']['input'];
  updatedAt?: InputMaybe<Scalars['String']['input']>;
};

export type MutationGenreUpdateInput = {
  createdAt?: InputMaybe<Scalars['String']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['String']['input']>;
};

export type MutationMediaInput = {
  alt: Scalars['String']['input'];
  createdAt?: InputMaybe<Scalars['String']['input']>;
  filename?: InputMaybe<Scalars['String']['input']>;
  filesize?: InputMaybe<Scalars['Float']['input']>;
  focalX?: InputMaybe<Scalars['Float']['input']>;
  focalY?: InputMaybe<Scalars['Float']['input']>;
  height?: InputMaybe<Scalars['Float']['input']>;
  mimeType?: InputMaybe<Scalars['String']['input']>;
  thumbnailURL?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['String']['input']>;
  url?: InputMaybe<Scalars['String']['input']>;
  width?: InputMaybe<Scalars['Float']['input']>;
};

export type MutationMediaUpdateInput = {
  alt?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['String']['input']>;
  filename?: InputMaybe<Scalars['String']['input']>;
  filesize?: InputMaybe<Scalars['Float']['input']>;
  focalX?: InputMaybe<Scalars['Float']['input']>;
  focalY?: InputMaybe<Scalars['Float']['input']>;
  height?: InputMaybe<Scalars['Float']['input']>;
  mimeType?: InputMaybe<Scalars['String']['input']>;
  thumbnailURL?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['String']['input']>;
  url?: InputMaybe<Scalars['String']['input']>;
  width?: InputMaybe<Scalars['Float']['input']>;
};

export type MutationPayloadKvInput = {
  data: Scalars['JSON']['input'];
  key: Scalars['String']['input'];
};

export type MutationPayloadKvUpdateInput = {
  data?: InputMaybe<Scalars['JSON']['input']>;
  key?: InputMaybe<Scalars['String']['input']>;
};

export type MutationPayloadLockedDocumentInput = {
  createdAt?: InputMaybe<Scalars['String']['input']>;
  document?: InputMaybe<PayloadLockedDocument_DocumentRelationshipInput>;
  globalSlug?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['String']['input']>;
  user?: InputMaybe<PayloadLockedDocument_UserRelationshipInput>;
};

export type MutationPayloadLockedDocumentUpdateInput = {
  createdAt?: InputMaybe<Scalars['String']['input']>;
  document?: InputMaybe<PayloadLockedDocumentUpdate_DocumentRelationshipInput>;
  globalSlug?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['String']['input']>;
  user?: InputMaybe<PayloadLockedDocumentUpdate_UserRelationshipInput>;
};

export type MutationPayloadPreferenceInput = {
  createdAt?: InputMaybe<Scalars['String']['input']>;
  key?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['String']['input']>;
  user?: InputMaybe<PayloadPreference_UserRelationshipInput>;
  value?: InputMaybe<Scalars['JSON']['input']>;
};

export type MutationPayloadPreferenceUpdateInput = {
  createdAt?: InputMaybe<Scalars['String']['input']>;
  key?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['String']['input']>;
  user?: InputMaybe<PayloadPreferenceUpdate_UserRelationshipInput>;
  value?: InputMaybe<Scalars['JSON']['input']>;
};

export type MutationSearchResultInput = {
  createdAt?: InputMaybe<Scalars['String']['input']>;
  doc?: InputMaybe<SearchResult_DocRelationshipInput>;
  poster?: InputMaybe<Scalars['Int']['input']>;
  priority?: InputMaybe<Scalars['Float']['input']>;
  rating?: InputMaybe<Scalars['Float']['input']>;
  releaseYear?: InputMaybe<Scalars['Float']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  titleEn?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['String']['input']>;
};

export type MutationSearchResultUpdateInput = {
  createdAt?: InputMaybe<Scalars['String']['input']>;
  doc?: InputMaybe<SearchResultUpdate_DocRelationshipInput>;
  poster?: InputMaybe<Scalars['Int']['input']>;
  priority?: InputMaybe<Scalars['Float']['input']>;
  rating?: InputMaybe<Scalars['Float']['input']>;
  releaseYear?: InputMaybe<Scalars['Float']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  titleEn?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['String']['input']>;
};

export type MutationSeasonInput = {
  content?: InputMaybe<Scalars['Int']['input']>;
  createdAt?: InputMaybe<Scalars['String']['input']>;
  releaseYear?: InputMaybe<Scalars['Float']['input']>;
  seasonNumber: Scalars['Float']['input'];
  title?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['String']['input']>;
};

export type MutationSeasonUpdateInput = {
  content?: InputMaybe<Scalars['Int']['input']>;
  createdAt?: InputMaybe<Scalars['String']['input']>;
  releaseYear?: InputMaybe<Scalars['Float']['input']>;
  seasonNumber?: InputMaybe<Scalars['Float']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['String']['input']>;
};

export type MutationUserInput = {
  avatar?: InputMaybe<Scalars['Int']['input']>;
  createdAt?: InputMaybe<Scalars['String']['input']>;
  email: Scalars['String']['input'];
  hash?: InputMaybe<Scalars['String']['input']>;
  lockUntil?: InputMaybe<Scalars['String']['input']>;
  loginAttempts?: InputMaybe<Scalars['Float']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  password: Scalars['String']['input'];
  resetPasswordExpiration?: InputMaybe<Scalars['String']['input']>;
  resetPasswordToken?: InputMaybe<Scalars['String']['input']>;
  roles?: InputMaybe<Array<InputMaybe<User_Roles_MutationInput>>>;
  salt?: InputMaybe<Scalars['String']['input']>;
  sessions?: InputMaybe<Array<InputMaybe<MutationUser_SessionsInput>>>;
  updatedAt?: InputMaybe<Scalars['String']['input']>;
};

export type MutationUserUpdateInput = {
  avatar?: InputMaybe<Scalars['Int']['input']>;
  createdAt?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  hash?: InputMaybe<Scalars['String']['input']>;
  lockUntil?: InputMaybe<Scalars['String']['input']>;
  loginAttempts?: InputMaybe<Scalars['Float']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
  resetPasswordExpiration?: InputMaybe<Scalars['String']['input']>;
  resetPasswordToken?: InputMaybe<Scalars['String']['input']>;
  roles?: InputMaybe<Array<InputMaybe<UserUpdate_Roles_MutationInput>>>;
  salt?: InputMaybe<Scalars['String']['input']>;
  sessions?: InputMaybe<Array<InputMaybe<MutationUserUpdate_SessionsInput>>>;
  updatedAt?: InputMaybe<Scalars['String']['input']>;
};

export type MutationUserUpdate_SessionsInput = {
  createdAt?: InputMaybe<Scalars['String']['input']>;
  expiresAt: Scalars['String']['input'];
  id: Scalars['String']['input'];
};

export type MutationUser_SessionsInput = {
  createdAt?: InputMaybe<Scalars['String']['input']>;
  expiresAt: Scalars['String']['input'];
  id: Scalars['String']['input'];
};

export type Payload_KvAccess = {
  __typename?: 'payload_kvAccess';
  create?: Maybe<PayloadKvCreateAccess>;
  delete?: Maybe<PayloadKvDeleteAccess>;
  fields?: Maybe<PayloadKvFields>;
  read?: Maybe<PayloadKvReadAccess>;
  update?: Maybe<PayloadKvUpdateAccess>;
};

export type Payload_KvDocAccess = {
  __typename?: 'payload_kvDocAccess';
  create?: Maybe<PayloadKvCreateDocAccess>;
  delete?: Maybe<PayloadKvDeleteDocAccess>;
  fields?: Maybe<PayloadKvDocAccessFields>;
  read?: Maybe<PayloadKvReadDocAccess>;
  update?: Maybe<PayloadKvUpdateDocAccess>;
};

export type Payload_Locked_DocumentsAccess = {
  __typename?: 'payload_locked_documentsAccess';
  create?: Maybe<PayloadLockedDocumentsCreateAccess>;
  delete?: Maybe<PayloadLockedDocumentsDeleteAccess>;
  fields?: Maybe<PayloadLockedDocumentsFields>;
  read?: Maybe<PayloadLockedDocumentsReadAccess>;
  update?: Maybe<PayloadLockedDocumentsUpdateAccess>;
};

export type Payload_Locked_DocumentsDocAccess = {
  __typename?: 'payload_locked_documentsDocAccess';
  create?: Maybe<PayloadLockedDocumentsCreateDocAccess>;
  delete?: Maybe<PayloadLockedDocumentsDeleteDocAccess>;
  fields?: Maybe<PayloadLockedDocumentsDocAccessFields>;
  read?: Maybe<PayloadLockedDocumentsReadDocAccess>;
  update?: Maybe<PayloadLockedDocumentsUpdateDocAccess>;
};

export type Payload_PreferencesAccess = {
  __typename?: 'payload_preferencesAccess';
  create?: Maybe<PayloadPreferencesCreateAccess>;
  delete?: Maybe<PayloadPreferencesDeleteAccess>;
  fields?: Maybe<PayloadPreferencesFields>;
  read?: Maybe<PayloadPreferencesReadAccess>;
  update?: Maybe<PayloadPreferencesUpdateAccess>;
};

export type Payload_PreferencesDocAccess = {
  __typename?: 'payload_preferencesDocAccess';
  create?: Maybe<PayloadPreferencesCreateDocAccess>;
  delete?: Maybe<PayloadPreferencesDeleteDocAccess>;
  fields?: Maybe<PayloadPreferencesDocAccessFields>;
  read?: Maybe<PayloadPreferencesReadDocAccess>;
  update?: Maybe<PayloadPreferencesUpdateDocAccess>;
};

export type Search_ResultsAccess = {
  __typename?: 'search_resultsAccess';
  create?: Maybe<SearchResultsCreateAccess>;
  delete?: Maybe<SearchResultsDeleteAccess>;
  fields?: Maybe<SearchResultsFields>;
  read?: Maybe<SearchResultsReadAccess>;
  update?: Maybe<SearchResultsUpdateAccess>;
};

export type Search_ResultsDocAccess = {
  __typename?: 'search_resultsDocAccess';
  create?: Maybe<SearchResultsCreateDocAccess>;
  delete?: Maybe<SearchResultsDeleteDocAccess>;
  fields?: Maybe<SearchResultsDocAccessFields>;
  read?: Maybe<SearchResultsReadDocAccess>;
  update?: Maybe<SearchResultsUpdateDocAccess>;
};

export type SeasonsAccess = {
  __typename?: 'seasonsAccess';
  create?: Maybe<SeasonsCreateAccess>;
  delete?: Maybe<SeasonsDeleteAccess>;
  fields?: Maybe<SeasonsFields>;
  read?: Maybe<SeasonsReadAccess>;
  update?: Maybe<SeasonsUpdateAccess>;
};

export type SeasonsDocAccess = {
  __typename?: 'seasonsDocAccess';
  create?: Maybe<SeasonsCreateDocAccess>;
  delete?: Maybe<SeasonsDeleteDocAccess>;
  fields?: Maybe<SeasonsDocAccessFields>;
  read?: Maybe<SeasonsReadDocAccess>;
  update?: Maybe<SeasonsUpdateDocAccess>;
};

export type UsersAccess = {
  __typename?: 'usersAccess';
  create?: Maybe<UsersCreateAccess>;
  delete?: Maybe<UsersDeleteAccess>;
  fields?: Maybe<UsersFields>;
  read?: Maybe<UsersReadAccess>;
  unlock?: Maybe<UsersUnlockAccess>;
  update?: Maybe<UsersUpdateAccess>;
};

export type UsersDocAccess = {
  __typename?: 'usersDocAccess';
  create?: Maybe<UsersCreateDocAccess>;
  delete?: Maybe<UsersDeleteDocAccess>;
  fields?: Maybe<UsersDocAccessFields>;
  read?: Maybe<UsersReadDocAccess>;
  unlock?: Maybe<UsersUnlockDocAccess>;
  update?: Maybe<UsersUpdateDocAccess>;
};

export type UsersJwt = {
  __typename?: 'usersJWT';
  collection: Scalars['String']['output'];
  email: Scalars['EmailAddress']['output'];
  roles?: Maybe<Array<UsersJwt_Roles>>;
};

export enum UsersJwt_Roles {
  Admin = 'admin',
  Editor = 'editor',
  User = 'user'
}

export type UsersLoginResult = {
  __typename?: 'usersLoginResult';
  exp?: Maybe<Scalars['Int']['output']>;
  token?: Maybe<Scalars['String']['output']>;
  user?: Maybe<User>;
};

export type UsersMe = {
  __typename?: 'usersMe';
  collection?: Maybe<Scalars['String']['output']>;
  exp?: Maybe<Scalars['Int']['output']>;
  strategy?: Maybe<Scalars['String']['output']>;
  token?: Maybe<Scalars['String']['output']>;
  user?: Maybe<User>;
};

export type UsersRefreshedUser = {
  __typename?: 'usersRefreshedUser';
  exp?: Maybe<Scalars['Int']['output']>;
  refreshedToken?: Maybe<Scalars['String']['output']>;
  strategy?: Maybe<Scalars['String']['output']>;
  user?: Maybe<UsersJwt>;
};

export type UsersResetPassword = {
  __typename?: 'usersResetPassword';
  token?: Maybe<Scalars['String']['output']>;
  user?: Maybe<User>;
};

export type VersionsContent_CreatedAt_Operator = {
  equals?: InputMaybe<Scalars['DateTime']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  greater_than?: InputMaybe<Scalars['DateTime']['input']>;
  greater_than_equal?: InputMaybe<Scalars['DateTime']['input']>;
  less_than?: InputMaybe<Scalars['DateTime']['input']>;
  less_than_equal?: InputMaybe<Scalars['DateTime']['input']>;
  like?: InputMaybe<Scalars['DateTime']['input']>;
  not_equals?: InputMaybe<Scalars['DateTime']['input']>;
};

export type VersionsContent_Id_Operator = {
  equals?: InputMaybe<Scalars['Int']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  greater_than?: InputMaybe<Scalars['Int']['input']>;
  greater_than_equal?: InputMaybe<Scalars['Int']['input']>;
  less_than?: InputMaybe<Scalars['Int']['input']>;
  less_than_equal?: InputMaybe<Scalars['Int']['input']>;
  not_equals?: InputMaybe<Scalars['Int']['input']>;
};

export type VersionsContent_Latest_Operator = {
  equals?: InputMaybe<Scalars['Boolean']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  not_equals?: InputMaybe<Scalars['Boolean']['input']>;
};

export type VersionsContent_Parent_Operator = {
  all?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>;
  equals?: InputMaybe<Scalars['JSON']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>;
  not_equals?: InputMaybe<Scalars['JSON']['input']>;
  not_in?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>;
};

export type VersionsContent_UpdatedAt_Operator = {
  equals?: InputMaybe<Scalars['DateTime']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  greater_than?: InputMaybe<Scalars['DateTime']['input']>;
  greater_than_equal?: InputMaybe<Scalars['DateTime']['input']>;
  less_than?: InputMaybe<Scalars['DateTime']['input']>;
  less_than_equal?: InputMaybe<Scalars['DateTime']['input']>;
  like?: InputMaybe<Scalars['DateTime']['input']>;
  not_equals?: InputMaybe<Scalars['DateTime']['input']>;
};

export enum VersionsContent_Version___Status_Input {
  Draft = 'draft',
  Published = 'published'
}

export type VersionsContent_Version___Status_Operator = {
  all?: InputMaybe<Array<InputMaybe<VersionsContent_Version___Status_Input>>>;
  equals?: InputMaybe<VersionsContent_Version___Status_Input>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  in?: InputMaybe<Array<InputMaybe<VersionsContent_Version___Status_Input>>>;
  not_equals?: InputMaybe<VersionsContent_Version___Status_Input>;
  not_in?: InputMaybe<Array<InputMaybe<VersionsContent_Version___Status_Input>>>;
};

export type VersionsContent_Version__Backdrop_Operator = {
  all?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>;
  equals?: InputMaybe<Scalars['JSON']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>;
  not_equals?: InputMaybe<Scalars['JSON']['input']>;
  not_in?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>;
};

export type VersionsContent_Version__CreatedAt_Operator = {
  equals?: InputMaybe<Scalars['DateTime']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  greater_than?: InputMaybe<Scalars['DateTime']['input']>;
  greater_than_equal?: InputMaybe<Scalars['DateTime']['input']>;
  less_than?: InputMaybe<Scalars['DateTime']['input']>;
  less_than_equal?: InputMaybe<Scalars['DateTime']['input']>;
  like?: InputMaybe<Scalars['DateTime']['input']>;
  not_equals?: InputMaybe<Scalars['DateTime']['input']>;
};

export type VersionsContent_Version__Description_Operator = {
  contains?: InputMaybe<Scalars['JSON']['input']>;
  equals?: InputMaybe<Scalars['JSON']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  like?: InputMaybe<Scalars['JSON']['input']>;
  not_equals?: InputMaybe<Scalars['JSON']['input']>;
};

export type VersionsContent_Version__Duration_Operator = {
  equals?: InputMaybe<Scalars['Float']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  greater_than?: InputMaybe<Scalars['Float']['input']>;
  greater_than_equal?: InputMaybe<Scalars['Float']['input']>;
  less_than?: InputMaybe<Scalars['Float']['input']>;
  less_than_equal?: InputMaybe<Scalars['Float']['input']>;
  not_equals?: InputMaybe<Scalars['Float']['input']>;
};

export type VersionsContent_Version__Genres_Operator = {
  all?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>;
  equals?: InputMaybe<Scalars['JSON']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>;
  not_equals?: InputMaybe<Scalars['JSON']['input']>;
  not_in?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>;
};

export type VersionsContent_Version__KodikId_Operator = {
  all?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  contains?: InputMaybe<Scalars['String']['input']>;
  equals?: InputMaybe<Scalars['String']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  like?: InputMaybe<Scalars['String']['input']>;
  not_equals?: InputMaybe<Scalars['String']['input']>;
  not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type VersionsContent_Version__OriginalTitle_Operator = {
  all?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  contains?: InputMaybe<Scalars['String']['input']>;
  equals?: InputMaybe<Scalars['String']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  like?: InputMaybe<Scalars['String']['input']>;
  not_equals?: InputMaybe<Scalars['String']['input']>;
  not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type VersionsContent_Version__Poster_Operator = {
  all?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>;
  equals?: InputMaybe<Scalars['JSON']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>;
  not_equals?: InputMaybe<Scalars['JSON']['input']>;
  not_in?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>;
};

export type VersionsContent_Version__Rating_Operator = {
  equals?: InputMaybe<Scalars['Float']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  greater_than?: InputMaybe<Scalars['Float']['input']>;
  greater_than_equal?: InputMaybe<Scalars['Float']['input']>;
  less_than?: InputMaybe<Scalars['Float']['input']>;
  less_than_equal?: InputMaybe<Scalars['Float']['input']>;
  not_equals?: InputMaybe<Scalars['Float']['input']>;
};

export type VersionsContent_Version__ReleaseYear_Operator = {
  equals?: InputMaybe<Scalars['Float']['input']>;
  greater_than?: InputMaybe<Scalars['Float']['input']>;
  greater_than_equal?: InputMaybe<Scalars['Float']['input']>;
  less_than?: InputMaybe<Scalars['Float']['input']>;
  less_than_equal?: InputMaybe<Scalars['Float']['input']>;
  not_equals?: InputMaybe<Scalars['Float']['input']>;
};

export type VersionsContent_Version__ShikimoriId_Operator = {
  all?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  contains?: InputMaybe<Scalars['String']['input']>;
  equals?: InputMaybe<Scalars['String']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  like?: InputMaybe<Scalars['String']['input']>;
  not_equals?: InputMaybe<Scalars['String']['input']>;
  not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type VersionsContent_Version__Slug_Operator = {
  all?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  contains?: InputMaybe<Scalars['String']['input']>;
  equals?: InputMaybe<Scalars['String']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  like?: InputMaybe<Scalars['String']['input']>;
  not_equals?: InputMaybe<Scalars['String']['input']>;
  not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export enum VersionsContent_Version__Status_Input {
  Draft = 'draft',
  Published = 'published'
}

export type VersionsContent_Version__Status_Operator = {
  all?: InputMaybe<Array<InputMaybe<VersionsContent_Version__Status_Input>>>;
  equals?: InputMaybe<VersionsContent_Version__Status_Input>;
  in?: InputMaybe<Array<InputMaybe<VersionsContent_Version__Status_Input>>>;
  not_equals?: InputMaybe<VersionsContent_Version__Status_Input>;
  not_in?: InputMaybe<Array<InputMaybe<VersionsContent_Version__Status_Input>>>;
};

export type VersionsContent_Version__TitleEn_Operator = {
  all?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  contains?: InputMaybe<Scalars['String']['input']>;
  equals?: InputMaybe<Scalars['String']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  like?: InputMaybe<Scalars['String']['input']>;
  not_equals?: InputMaybe<Scalars['String']['input']>;
  not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type VersionsContent_Version__TitleRu_Operator = {
  all?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  contains?: InputMaybe<Scalars['String']['input']>;
  equals?: InputMaybe<Scalars['String']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  like?: InputMaybe<Scalars['String']['input']>;
  not_equals?: InputMaybe<Scalars['String']['input']>;
  not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export enum VersionsContent_Version__Type_Input {
  Movie = 'movie',
  Series = 'series'
}

export type VersionsContent_Version__Type_Operator = {
  all?: InputMaybe<Array<InputMaybe<VersionsContent_Version__Type_Input>>>;
  equals?: InputMaybe<VersionsContent_Version__Type_Input>;
  in?: InputMaybe<Array<InputMaybe<VersionsContent_Version__Type_Input>>>;
  not_equals?: InputMaybe<VersionsContent_Version__Type_Input>;
  not_in?: InputMaybe<Array<InputMaybe<VersionsContent_Version__Type_Input>>>;
};

export type VersionsContent_Version__UpdatedAt_Operator = {
  equals?: InputMaybe<Scalars['DateTime']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  greater_than?: InputMaybe<Scalars['DateTime']['input']>;
  greater_than_equal?: InputMaybe<Scalars['DateTime']['input']>;
  less_than?: InputMaybe<Scalars['DateTime']['input']>;
  less_than_equal?: InputMaybe<Scalars['DateTime']['input']>;
  like?: InputMaybe<Scalars['DateTime']['input']>;
  not_equals?: InputMaybe<Scalars['DateTime']['input']>;
};

export type VersionsContent_Where = {
  AND?: InputMaybe<Array<InputMaybe<VersionsContent_Where_And>>>;
  OR?: InputMaybe<Array<InputMaybe<VersionsContent_Where_Or>>>;
  createdAt?: InputMaybe<VersionsContent_CreatedAt_Operator>;
  id?: InputMaybe<VersionsContent_Id_Operator>;
  latest?: InputMaybe<VersionsContent_Latest_Operator>;
  parent?: InputMaybe<VersionsContent_Parent_Operator>;
  updatedAt?: InputMaybe<VersionsContent_UpdatedAt_Operator>;
  version___status?: InputMaybe<VersionsContent_Version___Status_Operator>;
  version__backdrop?: InputMaybe<VersionsContent_Version__Backdrop_Operator>;
  version__createdAt?: InputMaybe<VersionsContent_Version__CreatedAt_Operator>;
  version__description?: InputMaybe<VersionsContent_Version__Description_Operator>;
  version__duration?: InputMaybe<VersionsContent_Version__Duration_Operator>;
  version__genres?: InputMaybe<VersionsContent_Version__Genres_Operator>;
  version__kodikId?: InputMaybe<VersionsContent_Version__KodikId_Operator>;
  version__originalTitle?: InputMaybe<VersionsContent_Version__OriginalTitle_Operator>;
  version__poster?: InputMaybe<VersionsContent_Version__Poster_Operator>;
  version__rating?: InputMaybe<VersionsContent_Version__Rating_Operator>;
  version__releaseYear?: InputMaybe<VersionsContent_Version__ReleaseYear_Operator>;
  version__shikimoriId?: InputMaybe<VersionsContent_Version__ShikimoriId_Operator>;
  version__slug?: InputMaybe<VersionsContent_Version__Slug_Operator>;
  version__status?: InputMaybe<VersionsContent_Version__Status_Operator>;
  version__titleEn?: InputMaybe<VersionsContent_Version__TitleEn_Operator>;
  version__titleRu?: InputMaybe<VersionsContent_Version__TitleRu_Operator>;
  version__type?: InputMaybe<VersionsContent_Version__Type_Operator>;
  version__updatedAt?: InputMaybe<VersionsContent_Version__UpdatedAt_Operator>;
};

export type VersionsContent_Where_And = {
  AND?: InputMaybe<Array<InputMaybe<VersionsContent_Where_And>>>;
  OR?: InputMaybe<Array<InputMaybe<VersionsContent_Where_Or>>>;
  createdAt?: InputMaybe<VersionsContent_CreatedAt_Operator>;
  id?: InputMaybe<VersionsContent_Id_Operator>;
  latest?: InputMaybe<VersionsContent_Latest_Operator>;
  parent?: InputMaybe<VersionsContent_Parent_Operator>;
  updatedAt?: InputMaybe<VersionsContent_UpdatedAt_Operator>;
  version___status?: InputMaybe<VersionsContent_Version___Status_Operator>;
  version__backdrop?: InputMaybe<VersionsContent_Version__Backdrop_Operator>;
  version__createdAt?: InputMaybe<VersionsContent_Version__CreatedAt_Operator>;
  version__description?: InputMaybe<VersionsContent_Version__Description_Operator>;
  version__duration?: InputMaybe<VersionsContent_Version__Duration_Operator>;
  version__genres?: InputMaybe<VersionsContent_Version__Genres_Operator>;
  version__kodikId?: InputMaybe<VersionsContent_Version__KodikId_Operator>;
  version__originalTitle?: InputMaybe<VersionsContent_Version__OriginalTitle_Operator>;
  version__poster?: InputMaybe<VersionsContent_Version__Poster_Operator>;
  version__rating?: InputMaybe<VersionsContent_Version__Rating_Operator>;
  version__releaseYear?: InputMaybe<VersionsContent_Version__ReleaseYear_Operator>;
  version__shikimoriId?: InputMaybe<VersionsContent_Version__ShikimoriId_Operator>;
  version__slug?: InputMaybe<VersionsContent_Version__Slug_Operator>;
  version__status?: InputMaybe<VersionsContent_Version__Status_Operator>;
  version__titleEn?: InputMaybe<VersionsContent_Version__TitleEn_Operator>;
  version__titleRu?: InputMaybe<VersionsContent_Version__TitleRu_Operator>;
  version__type?: InputMaybe<VersionsContent_Version__Type_Operator>;
  version__updatedAt?: InputMaybe<VersionsContent_Version__UpdatedAt_Operator>;
};

export type VersionsContent_Where_Or = {
  AND?: InputMaybe<Array<InputMaybe<VersionsContent_Where_And>>>;
  OR?: InputMaybe<Array<InputMaybe<VersionsContent_Where_Or>>>;
  createdAt?: InputMaybe<VersionsContent_CreatedAt_Operator>;
  id?: InputMaybe<VersionsContent_Id_Operator>;
  latest?: InputMaybe<VersionsContent_Latest_Operator>;
  parent?: InputMaybe<VersionsContent_Parent_Operator>;
  updatedAt?: InputMaybe<VersionsContent_UpdatedAt_Operator>;
  version___status?: InputMaybe<VersionsContent_Version___Status_Operator>;
  version__backdrop?: InputMaybe<VersionsContent_Version__Backdrop_Operator>;
  version__createdAt?: InputMaybe<VersionsContent_Version__CreatedAt_Operator>;
  version__description?: InputMaybe<VersionsContent_Version__Description_Operator>;
  version__duration?: InputMaybe<VersionsContent_Version__Duration_Operator>;
  version__genres?: InputMaybe<VersionsContent_Version__Genres_Operator>;
  version__kodikId?: InputMaybe<VersionsContent_Version__KodikId_Operator>;
  version__originalTitle?: InputMaybe<VersionsContent_Version__OriginalTitle_Operator>;
  version__poster?: InputMaybe<VersionsContent_Version__Poster_Operator>;
  version__rating?: InputMaybe<VersionsContent_Version__Rating_Operator>;
  version__releaseYear?: InputMaybe<VersionsContent_Version__ReleaseYear_Operator>;
  version__shikimoriId?: InputMaybe<VersionsContent_Version__ShikimoriId_Operator>;
  version__slug?: InputMaybe<VersionsContent_Version__Slug_Operator>;
  version__status?: InputMaybe<VersionsContent_Version__Status_Operator>;
  version__titleEn?: InputMaybe<VersionsContent_Version__TitleEn_Operator>;
  version__titleRu?: InputMaybe<VersionsContent_Version__TitleRu_Operator>;
  version__type?: InputMaybe<VersionsContent_Version__Type_Operator>;
  version__updatedAt?: InputMaybe<VersionsContent_Version__UpdatedAt_Operator>;
};

export type VersionsContents = {
  __typename?: 'versionsContents';
  docs: Array<ContentVersion>;
  hasNextPage: Scalars['Boolean']['output'];
  hasPrevPage: Scalars['Boolean']['output'];
  limit: Scalars['Int']['output'];
  nextPage?: Maybe<Scalars['Int']['output']>;
  offset?: Maybe<Scalars['Int']['output']>;
  page: Scalars['Int']['output'];
  pagingCounter: Scalars['Int']['output'];
  prevPage?: Maybe<Scalars['Int']['output']>;
  totalDocs: Scalars['Int']['output'];
  totalPages: Scalars['Int']['output'];
};

export type Content_Status =
  | 'draft'
  | 'published';

export type Content_Type =
  | 'movie'
  | 'series';

export type Favorite_Content_Operator = {
  all?: Array<unknown> | null | undefined;
  equals?: unknown;
  in?: Array<unknown> | null | undefined;
  not_equals?: unknown;
  not_in?: Array<unknown> | null | undefined;
};

export type Favorite_CreatedAt_Operator = {
  equals?: unknown;
  exists?: boolean | null | undefined;
  greater_than?: unknown;
  greater_than_equal?: unknown;
  less_than?: unknown;
  less_than_equal?: unknown;
  like?: unknown;
  not_equals?: unknown;
};

export type Favorite_Id_Operator = {
  equals?: number | null | undefined;
  exists?: boolean | null | undefined;
  greater_than?: number | null | undefined;
  greater_than_equal?: number | null | undefined;
  less_than?: number | null | undefined;
  less_than_equal?: number | null | undefined;
  not_equals?: number | null | undefined;
};

export type Favorite_UpdatedAt_Operator = {
  equals?: unknown;
  exists?: boolean | null | undefined;
  greater_than?: unknown;
  greater_than_equal?: unknown;
  less_than?: unknown;
  less_than_equal?: unknown;
  like?: unknown;
  not_equals?: unknown;
};

export type Favorite_User_Operator = {
  all?: Array<unknown> | null | undefined;
  equals?: unknown;
  in?: Array<unknown> | null | undefined;
  not_equals?: unknown;
  not_in?: Array<unknown> | null | undefined;
};

export type Favorite_Where = {
  AND?: Array<Favorite_Where_And | null | undefined> | null | undefined;
  OR?: Array<Favorite_Where_Or | null | undefined> | null | undefined;
  content?: Favorite_Content_Operator | null | undefined;
  createdAt?: Favorite_CreatedAt_Operator | null | undefined;
  id?: Favorite_Id_Operator | null | undefined;
  updatedAt?: Favorite_UpdatedAt_Operator | null | undefined;
  user?: Favorite_User_Operator | null | undefined;
};

export type Favorite_Where_And = {
  AND?: Array<Favorite_Where_And | null | undefined> | null | undefined;
  OR?: Array<Favorite_Where_Or | null | undefined> | null | undefined;
  content?: Favorite_Content_Operator | null | undefined;
  createdAt?: Favorite_CreatedAt_Operator | null | undefined;
  id?: Favorite_Id_Operator | null | undefined;
  updatedAt?: Favorite_UpdatedAt_Operator | null | undefined;
  user?: Favorite_User_Operator | null | undefined;
};

export type Favorite_Where_Or = {
  AND?: Array<Favorite_Where_And | null | undefined> | null | undefined;
  OR?: Array<Favorite_Where_Or | null | undefined> | null | undefined;
  content?: Favorite_Content_Operator | null | undefined;
  createdAt?: Favorite_CreatedAt_Operator | null | undefined;
  id?: Favorite_Id_Operator | null | undefined;
  updatedAt?: Favorite_UpdatedAt_Operator | null | undefined;
  user?: Favorite_User_Operator | null | undefined;
};

export type SearchResult_CreatedAt_Operator = {
  equals?: unknown;
  exists?: boolean | null | undefined;
  greater_than?: unknown;
  greater_than_equal?: unknown;
  less_than?: unknown;
  less_than_equal?: unknown;
  like?: unknown;
  not_equals?: unknown;
};

export type SearchResult_Doc_Relation = {
  relationTo?: SearchResult_Doc_Relation_RelationTo | null | undefined;
  value?: unknown;
};

export type SearchResult_Doc_Relation_RelationTo =
  | 'content';

export type SearchResult_Id_Operator = {
  equals?: number | null | undefined;
  exists?: boolean | null | undefined;
  greater_than?: number | null | undefined;
  greater_than_equal?: number | null | undefined;
  less_than?: number | null | undefined;
  less_than_equal?: number | null | undefined;
  not_equals?: number | null | undefined;
};

export type SearchResult_Poster_Operator = {
  all?: Array<unknown> | null | undefined;
  equals?: unknown;
  exists?: boolean | null | undefined;
  in?: Array<unknown> | null | undefined;
  not_equals?: unknown;
  not_in?: Array<unknown> | null | undefined;
};

export type SearchResult_Priority_Operator = {
  equals?: number | null | undefined;
  exists?: boolean | null | undefined;
  greater_than?: number | null | undefined;
  greater_than_equal?: number | null | undefined;
  less_than?: number | null | undefined;
  less_than_equal?: number | null | undefined;
  not_equals?: number | null | undefined;
};

export type SearchResult_Rating_Operator = {
  equals?: number | null | undefined;
  exists?: boolean | null | undefined;
  greater_than?: number | null | undefined;
  greater_than_equal?: number | null | undefined;
  less_than?: number | null | undefined;
  less_than_equal?: number | null | undefined;
  not_equals?: number | null | undefined;
};

export type SearchResult_ReleaseYear_Operator = {
  equals?: number | null | undefined;
  exists?: boolean | null | undefined;
  greater_than?: number | null | undefined;
  greater_than_equal?: number | null | undefined;
  less_than?: number | null | undefined;
  less_than_equal?: number | null | undefined;
  not_equals?: number | null | undefined;
};

export type SearchResult_Slug_Operator = {
  all?: Array<string | null | undefined> | null | undefined;
  contains?: string | null | undefined;
  equals?: string | null | undefined;
  exists?: boolean | null | undefined;
  in?: Array<string | null | undefined> | null | undefined;
  like?: string | null | undefined;
  not_equals?: string | null | undefined;
  not_in?: Array<string | null | undefined> | null | undefined;
};

export type SearchResult_TitleEn_Operator = {
  all?: Array<string | null | undefined> | null | undefined;
  contains?: string | null | undefined;
  equals?: string | null | undefined;
  exists?: boolean | null | undefined;
  in?: Array<string | null | undefined> | null | undefined;
  like?: string | null | undefined;
  not_equals?: string | null | undefined;
  not_in?: Array<string | null | undefined> | null | undefined;
};

export type SearchResult_Title_Operator = {
  all?: Array<string | null | undefined> | null | undefined;
  contains?: string | null | undefined;
  equals?: string | null | undefined;
  exists?: boolean | null | undefined;
  in?: Array<string | null | undefined> | null | undefined;
  like?: string | null | undefined;
  not_equals?: string | null | undefined;
  not_in?: Array<string | null | undefined> | null | undefined;
};

export type SearchResult_Type_Operator = {
  all?: Array<string | null | undefined> | null | undefined;
  contains?: string | null | undefined;
  equals?: string | null | undefined;
  exists?: boolean | null | undefined;
  in?: Array<string | null | undefined> | null | undefined;
  like?: string | null | undefined;
  not_equals?: string | null | undefined;
  not_in?: Array<string | null | undefined> | null | undefined;
};

export type SearchResult_UpdatedAt_Operator = {
  equals?: unknown;
  exists?: boolean | null | undefined;
  greater_than?: unknown;
  greater_than_equal?: unknown;
  less_than?: unknown;
  less_than_equal?: unknown;
  like?: unknown;
  not_equals?: unknown;
};

export type SearchResult_Where = {
  AND?: Array<SearchResult_Where_And | null | undefined> | null | undefined;
  OR?: Array<SearchResult_Where_Or | null | undefined> | null | undefined;
  createdAt?: SearchResult_CreatedAt_Operator | null | undefined;
  doc?: SearchResult_Doc_Relation | null | undefined;
  id?: SearchResult_Id_Operator | null | undefined;
  poster?: SearchResult_Poster_Operator | null | undefined;
  priority?: SearchResult_Priority_Operator | null | undefined;
  rating?: SearchResult_Rating_Operator | null | undefined;
  releaseYear?: SearchResult_ReleaseYear_Operator | null | undefined;
  slug?: SearchResult_Slug_Operator | null | undefined;
  title?: SearchResult_Title_Operator | null | undefined;
  titleEn?: SearchResult_TitleEn_Operator | null | undefined;
  type?: SearchResult_Type_Operator | null | undefined;
  updatedAt?: SearchResult_UpdatedAt_Operator | null | undefined;
};

export type SearchResult_Where_And = {
  AND?: Array<SearchResult_Where_And | null | undefined> | null | undefined;
  OR?: Array<SearchResult_Where_Or | null | undefined> | null | undefined;
  createdAt?: SearchResult_CreatedAt_Operator | null | undefined;
  doc?: SearchResult_Doc_Relation | null | undefined;
  id?: SearchResult_Id_Operator | null | undefined;
  poster?: SearchResult_Poster_Operator | null | undefined;
  priority?: SearchResult_Priority_Operator | null | undefined;
  rating?: SearchResult_Rating_Operator | null | undefined;
  releaseYear?: SearchResult_ReleaseYear_Operator | null | undefined;
  slug?: SearchResult_Slug_Operator | null | undefined;
  title?: SearchResult_Title_Operator | null | undefined;
  titleEn?: SearchResult_TitleEn_Operator | null | undefined;
  type?: SearchResult_Type_Operator | null | undefined;
  updatedAt?: SearchResult_UpdatedAt_Operator | null | undefined;
};

export type SearchResult_Where_Or = {
  AND?: Array<SearchResult_Where_And | null | undefined> | null | undefined;
  OR?: Array<SearchResult_Where_Or | null | undefined> | null | undefined;
  createdAt?: SearchResult_CreatedAt_Operator | null | undefined;
  doc?: SearchResult_Doc_Relation | null | undefined;
  id?: SearchResult_Id_Operator | null | undefined;
  poster?: SearchResult_Poster_Operator | null | undefined;
  priority?: SearchResult_Priority_Operator | null | undefined;
  rating?: SearchResult_Rating_Operator | null | undefined;
  releaseYear?: SearchResult_ReleaseYear_Operator | null | undefined;
  slug?: SearchResult_Slug_Operator | null | undefined;
  title?: SearchResult_Title_Operator | null | undefined;
  titleEn?: SearchResult_TitleEn_Operator | null | undefined;
  type?: SearchResult_Type_Operator | null | undefined;
  updatedAt?: SearchResult_UpdatedAt_Operator | null | undefined;
};

export type GetContentBySlugQueryVariables = Exact<{
  slug: string;
}>;


export type GetContentBySlugQuery = { Contents: { docs: Array<{ id: number, type: Content_Type | null, titleEn: string | null, titleRu: string | null, originalTitle: string | null, slug: string | null, description: unknown, releaseYear: number | null, duration: number | null, rating: number | null, status: Content_Status | null, poster: { url: string | null } | null, backdrop: { url: string | null } | null, genres: Array<{ id: number, title: string, slug: string }> | null, seasons: { docs: Array<{ id: number, seasonNumber: number, title: string | null, releaseYear: number | null, episodes: { docs: Array<{ id: number, episodeNumber: number, title: string, description: unknown, releaseDate: unknown, duration: number | null }> } | null }> } | null }> } | null };

export type GetContentQueryVariables = Exact<{ [key: string]: never; }>;


export type GetContentQuery = { Contents: { docs: Array<{ id: number, titleEn: string | null, titleRu: string | null, slug: string | null, type: Content_Type | null, releaseYear: number | null, rating: number | null, poster: { url: string | null } | null, backdrop: { url: string | null } | null }> } | null };

export type GetSimilarContentQueryVariables = Exact<{
  genreIds?: Array<unknown> | unknown | null | undefined;
  excludeId: number;
  limit: number;
}>;


export type GetSimilarContentQuery = { Contents: { docs: Array<{ id: number, type: Content_Type | null, titleEn: string | null, titleRu: string | null, slug: string | null, releaseYear: number | null, rating: number | null, poster: { url: string | null } | null, genres: Array<{ id: number, title: string, slug: string }> | null }> } | null };

export type AddFavoriteMutationVariables = Exact<{
  userId: number;
  contentId: number;
}>;


export type AddFavoriteMutation = { createFavorite: { id: number, content: { id: number } | null } | null };

export type LoginUserMutationVariables = Exact<{
  email: string;
  password: string;
}>;


export type LoginUserMutation = { loginUser: { exp: number | null, user: { id: number, name: string | null, email: unknown } | null } | null };

export type LogoutUserMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutUserMutation = { logoutUser: string | null };

export type RegisterUserMutationVariables = Exact<{
  name: string;
  email: string;
  password: string;
}>;


export type RegisterUserMutation = { createUser: { id: number, name: string | null, email: unknown } | null };

export type RemoveFavoriteMutationVariables = Exact<{
  id: number;
}>;


export type RemoveFavoriteMutation = { deleteFavorite: { id: number } | null };

export type GetFavoritesQueryVariables = Exact<{
  where?: Favorite_Where | null | undefined;
}>;


export type GetFavoritesQuery = { Favorites: { docs: Array<{ id: number, content: { id: number } | null }> } | null };

export type MeUserQueryVariables = Exact<{ [key: string]: never; }>;


export type MeUserQuery = { meUser: { user: { id: number, name: string | null, email: unknown } | null } | null };

export type SearchContentQueryVariables = Exact<{
  where: SearchResult_Where;
}>;


export type SearchContentQuery = { SearchResults: { docs: Array<{ id: number, title: string | null, titleEn: string | null, slug: string | null, type: string | null, releaseYear: number | null, rating: number | null, poster: { url: string | null } | null }> } | null };


export const GetContentBySlugDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetContentBySlug"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"slug"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"Contents"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"slug"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"equals"},"value":{"kind":"Variable","name":{"kind":"Name","value":"slug"}}}]}}]}},{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"IntValue","value":"1"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"docs"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"titleEn"}},{"kind":"Field","name":{"kind":"Name","value":"titleRu"}},{"kind":"Field","name":{"kind":"Name","value":"originalTitle"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"releaseYear"}},{"kind":"Field","name":{"kind":"Name","value":"duration"}},{"kind":"Field","name":{"kind":"Name","value":"rating"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"poster"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"url"}}]}},{"kind":"Field","name":{"kind":"Name","value":"backdrop"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"url"}}]}},{"kind":"Field","name":{"kind":"Name","value":"genres"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}},{"kind":"Field","name":{"kind":"Name","value":"seasons"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"sort"},"value":{"kind":"StringValue","value":"seasonNumber","block":false}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"docs"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"seasonNumber"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"releaseYear"}},{"kind":"Field","name":{"kind":"Name","value":"episodes"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"sort"},"value":{"kind":"StringValue","value":"episodeNumber","block":false}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"docs"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"episodeNumber"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"releaseDate"}},{"kind":"Field","name":{"kind":"Name","value":"duration"}}]}}]}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetContentBySlugQuery, GetContentBySlugQueryVariables>;
export const GetContentDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetContent"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"Contents"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"docs"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"titleEn"}},{"kind":"Field","name":{"kind":"Name","value":"titleRu"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"releaseYear"}},{"kind":"Field","name":{"kind":"Name","value":"rating"}},{"kind":"Field","name":{"kind":"Name","value":"poster"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"url"}}]}},{"kind":"Field","name":{"kind":"Name","value":"backdrop"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"url"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetContentQuery, GetContentQueryVariables>;
export const GetSimilarContentDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetSimilarContent"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"genreIds"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"JSON"}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"excludeId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"Contents"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"genres"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"in"},"value":{"kind":"Variable","name":{"kind":"Name","value":"genreIds"}}}]}},{"kind":"ObjectField","name":{"kind":"Name","value":"id"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"not_equals"},"value":{"kind":"Variable","name":{"kind":"Name","value":"excludeId"}}}]}},{"kind":"ObjectField","name":{"kind":"Name","value":"status"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"equals"},"value":{"kind":"EnumValue","value":"published"}}]}}]}},{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}},{"kind":"Argument","name":{"kind":"Name","value":"sort"},"value":{"kind":"StringValue","value":"-rating","block":false}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"docs"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"titleEn"}},{"kind":"Field","name":{"kind":"Name","value":"titleRu"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"releaseYear"}},{"kind":"Field","name":{"kind":"Name","value":"rating"}},{"kind":"Field","name":{"kind":"Name","value":"poster"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"url"}}]}},{"kind":"Field","name":{"kind":"Name","value":"genres"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetSimilarContentQuery, GetSimilarContentQueryVariables>;
export const AddFavoriteDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AddFavorite"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"contentId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createFavorite"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"user"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"content"},"value":{"kind":"Variable","name":{"kind":"Name","value":"contentId"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"content"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<AddFavoriteMutation, AddFavoriteMutationVariables>;
export const LoginUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"LoginUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"loginUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}},{"kind":"Argument","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}},{"kind":"Field","name":{"kind":"Name","value":"exp"}}]}}]}}]} as unknown as DocumentNode<LoginUserMutation, LoginUserMutationVariables>;
export const LogoutUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"LogoutUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"logoutUser"}}]}}]} as unknown as DocumentNode<LogoutUserMutation, LogoutUserMutationVariables>;
export const RegisterUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RegisterUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}}]}}]} as unknown as DocumentNode<RegisterUserMutation, RegisterUserMutationVariables>;
export const RemoveFavoriteDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RemoveFavorite"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteFavorite"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<RemoveFavoriteMutation, RemoveFavoriteMutationVariables>;
export const GetFavoritesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetFavorites"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"where"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Favorite_where"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"Favorites"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"Variable","name":{"kind":"Name","value":"where"}}},{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"IntValue","value":"500"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"docs"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"content"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetFavoritesQuery, GetFavoritesQueryVariables>;
export const MeUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"MeUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"meUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}}]}}]}}]} as unknown as DocumentNode<MeUserQuery, MeUserQueryVariables>;
export const SearchContentDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"SearchContent"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"where"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SearchResult_where"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"SearchResults"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"Variable","name":{"kind":"Name","value":"where"}}},{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"IntValue","value":"50"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"docs"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"titleEn"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"releaseYear"}},{"kind":"Field","name":{"kind":"Name","value":"rating"}},{"kind":"Field","name":{"kind":"Name","value":"poster"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"url"}}]}}]}}]}}]}}]} as unknown as DocumentNode<SearchContentQuery, SearchContentQueryVariables>;