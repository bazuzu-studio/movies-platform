import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

/**
 * Коллекции `voiceovers` (справочник озвучек) и `episode-sources` (ссылка на плеер
 * по паре «серия ↔ озвучка»), а также колонки для них в payload_locked_documents_rels.
 * Нужны kodik-pipeline: sync-voiceovers, match-voiceovers, sync-dubs.
 *
 * Идемпотентна (IF NOT EXISTS / duplicate_object) — безопасно при повторном запуске
 * и если таблицы уже созданы вручную или dev-режимом (push).
 * Внешние ключи episode_sources → episodes / voiceovers — ON DELETE cascade (см. комментарий
 * в src/collections/episode-sources/config.ts).
 */
export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
  CREATE TABLE IF NOT EXISTS "voiceovers" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"kodik_translation_id" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );

  CREATE TABLE IF NOT EXISTS "episode_sources" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"episode_id" integer NOT NULL,
  	"voiceover_id" integer NOT NULL,
  	"player_link" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );

  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN IF NOT EXISTS "voiceovers_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN IF NOT EXISTS "episode_sources_id" integer;

  DO $$ BEGIN
    ALTER TABLE "episode_sources" ADD CONSTRAINT "episode_sources_episode_id_episodes_id_fk" FOREIGN KEY ("episode_id") REFERENCES "public"."episodes"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION WHEN duplicate_object THEN NULL; END $$;
  DO $$ BEGIN
    ALTER TABLE "episode_sources" ADD CONSTRAINT "episode_sources_voiceover_id_voiceovers_id_fk" FOREIGN KEY ("voiceover_id") REFERENCES "public"."voiceovers"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION WHEN duplicate_object THEN NULL; END $$;
  DO $$ BEGIN
    ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_voiceovers_fk" FOREIGN KEY ("voiceovers_id") REFERENCES "public"."voiceovers"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION WHEN duplicate_object THEN NULL; END $$;
  DO $$ BEGIN
    ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_episode_sources_fk" FOREIGN KEY ("episode_sources_id") REFERENCES "public"."episode_sources"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION WHEN duplicate_object THEN NULL; END $$;

  CREATE UNIQUE INDEX IF NOT EXISTS "voiceovers_title_idx" ON "voiceovers" USING btree ("title");
  CREATE UNIQUE INDEX IF NOT EXISTS "voiceovers_slug_idx" ON "voiceovers" USING btree ("slug");
  CREATE UNIQUE INDEX IF NOT EXISTS "voiceovers_kodik_translation_id_idx" ON "voiceovers" USING btree ("kodik_translation_id");
  CREATE INDEX IF NOT EXISTS "voiceovers_updated_at_idx" ON "voiceovers" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "voiceovers_created_at_idx" ON "voiceovers" USING btree ("created_at");

  CREATE INDEX IF NOT EXISTS "episode_sources_episode_idx" ON "episode_sources" USING btree ("episode_id");
  CREATE INDEX IF NOT EXISTS "episode_sources_voiceover_idx" ON "episode_sources" USING btree ("voiceover_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "episode_sources_episode_voiceover_idx" ON "episode_sources" USING btree ("episode_id", "voiceover_id");
  CREATE INDEX IF NOT EXISTS "episode_sources_updated_at_idx" ON "episode_sources" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "episode_sources_created_at_idx" ON "episode_sources" USING btree ("created_at");

  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_voiceovers_id_idx" ON "payload_locked_documents_rels" USING btree ("voiceovers_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_episode_sources_id_idx" ON "payload_locked_documents_rels" USING btree ("episode_sources_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT IF EXISTS "payload_locked_documents_rels_voiceovers_fk";
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT IF EXISTS "payload_locked_documents_rels_episode_sources_fk";
  DROP INDEX IF EXISTS "payload_locked_documents_rels_voiceovers_id_idx";
  DROP INDEX IF EXISTS "payload_locked_documents_rels_episode_sources_id_idx";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN IF EXISTS "voiceovers_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN IF EXISTS "episode_sources_id";
  DROP TABLE IF EXISTS "episode_sources" CASCADE;
  DROP TABLE IF EXISTS "voiceovers" CASCADE;`)
}
