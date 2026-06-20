ALTER TABLE "forms" ADD COLUMN "share_id" text DEFAULT gen_random_uuid();--> statement-breakpoint
ALTER TABLE "forms" ADD CONSTRAINT "forms_share_id_unique" UNIQUE("share_id");