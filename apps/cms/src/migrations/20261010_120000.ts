import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

/**
 * Даты появления серий и сводка по озвучкам тайтла (для kodik-pipeline):
 *   - episodes.first_available_at, episodes.sources_count
 *   - episode_sources.first_seen_at
 *   - таблица title_dubs (коллекция title-dubs)
 *
 * Написана вручную по образцу миграций Payload и безопасна к повторному запуску.
 * Если у вас есть возможность запустить CLI, надёжнее сгенерировать миграцию самим
 * (`pnpm payload migrate:create`): тогда рядом появится и актуальный .json-снимок схемы,
 * без которого следующая автогенерированная миграция может повторить эти изменения.
 */
export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
  ALTER TABLE "episodes" ADD COLUMN IF NOT EXISTS "first_available_at" timestamp(3) with time zone;
  ALTER TABLE "episodes" ADD COLUMN IF NOT EXISTS "sources_count" numeric;
  ALTER TABLE "episode_sources" ADD COLUMN IF NOT EXISTS "first_seen_at" timestamp(3) with time zone;

  CREATE TABLE IF NOT EXISTS "title_dubs" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"content_id" integer NOT NULL,
  	"voiceover_id" integer NOT NULL,
  	"kodik_id" varchar NOT NULL,
  	"episodes_count" numeric,
  	"last_episode" numeric,
  	"kodik_updated_at" timestamp(3) with time zone,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );

  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN IF NOT EXISTS "title_dubs_id" integer;

  DO $$ BEGIN
   ALTER TABLE "title_dubs" ADD CONSTRAINT "title_dubs_content_id_content_id_fk" FOREIGN KEY ("content_id") REFERENCES "public"."content"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  DO $$ BEGIN
   ALTER TABLE "title_dubs" ADD CONSTRAINT "title_dubs_voiceover_id_voiceovers_id_fk" FOREIGN KEY ("voiceover_id") REFERENCES "public"."voiceovers"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_title_dubs_fk" FOREIGN KEY ("title_dubs_id") REFERENCES "public"."title_dubs"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;

  CREATE INDEX IF NOT EXISTS "title_dubs_content_idx" ON "title_dubs" USING btree ("content_id");
  CREATE INDEX IF NOT EXISTS "title_dubs_voiceover_idx" ON "title_dubs" USING btree ("voiceover_id");
  CREATE INDEX IF NOT EXISTS "title_dubs_updated_at_idx" ON "title_dubs" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "title_dubs_created_at_idx" ON "title_dubs" USING btree ("created_at");
  CREATE UNIQUE INDEX IF NOT EXISTS "content_voiceover_idx" ON "title_dubs" USING btree ("content_id","voiceover_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_title_dubs_id_idx" ON "payload_locked_documents_rels" USING btree ("title_dubs_id");
  CREATE INDEX IF NOT EXISTS "episodes_first_available_at_idx" ON "episodes" USING btree ("first_available_at");`)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT IF EXISTS "payload_locked_documents_rels_title_dubs_fk";
  DROP INDEX IF EXISTS "payload_locked_documents_rels_title_dubs_id_idx";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN IF EXISTS "title_dubs_id";
  DROP TABLE IF EXISTS "title_dubs" CASCADE;
  DROP INDEX IF EXISTS "episodes_first_available_at_idx";
  ALTER TABLE "episode_sources" DROP COLUMN IF EXISTS "first_seen_at";
  ALTER TABLE "episodes" DROP COLUMN IF EXISTS "sources_count";
  ALTER TABLE "episodes" DROP COLUMN IF EXISTS "first_available_at";`)
}
