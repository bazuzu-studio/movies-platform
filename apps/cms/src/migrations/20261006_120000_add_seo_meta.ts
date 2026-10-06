import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

/**
 * SEO-плагин (@payloadcms/plugin-seo): группа `meta` у коллекции `content`
 * (title, description, image) и её копия в таблице версий.
 * Идемпотентна (IF NOT EXISTS) — безопасно при повторном запуске.
 */
export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
  ALTER TABLE "content" ADD COLUMN IF NOT EXISTS "meta_title" varchar;
  ALTER TABLE "content" ADD COLUMN IF NOT EXISTS "meta_description" varchar;
  ALTER TABLE "content" ADD COLUMN IF NOT EXISTS "meta_image_id" integer;
  ALTER TABLE "_content_v" ADD COLUMN IF NOT EXISTS "version_meta_title" varchar;
  ALTER TABLE "_content_v" ADD COLUMN IF NOT EXISTS "version_meta_description" varchar;
  ALTER TABLE "_content_v" ADD COLUMN IF NOT EXISTS "version_meta_image_id" integer;

  DO $$ BEGIN
    ALTER TABLE "content" ADD CONSTRAINT "content_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION WHEN duplicate_object THEN NULL; END $$;
  DO $$ BEGIN
    ALTER TABLE "_content_v" ADD CONSTRAINT "_content_v_version_meta_image_id_media_id_fk" FOREIGN KEY ("version_meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION WHEN duplicate_object THEN NULL; END $$;

  CREATE INDEX IF NOT EXISTS "content_meta_meta_image_idx" ON "content" USING btree ("meta_image_id");
  CREATE INDEX IF NOT EXISTS "_content_v_version_meta_version_meta_image_idx" ON "_content_v" USING btree ("version_meta_image_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
  ALTER TABLE "content" DROP CONSTRAINT IF EXISTS "content_meta_image_id_media_id_fk";
  ALTER TABLE "_content_v" DROP CONSTRAINT IF EXISTS "_content_v_version_meta_image_id_media_id_fk";
  DROP INDEX IF EXISTS "content_meta_meta_image_idx";
  DROP INDEX IF EXISTS "_content_v_version_meta_version_meta_image_idx";
  ALTER TABLE "content" DROP COLUMN IF EXISTS "meta_title";
  ALTER TABLE "content" DROP COLUMN IF EXISTS "meta_description";
  ALTER TABLE "content" DROP COLUMN IF EXISTS "meta_image_id";
  ALTER TABLE "_content_v" DROP COLUMN IF EXISTS "version_meta_title";
  ALTER TABLE "_content_v" DROP COLUMN IF EXISTS "version_meta_description";
  ALTER TABLE "_content_v" DROP COLUMN IF EXISTS "version_meta_image_id";`)
}
