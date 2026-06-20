CREATE TABLE "responses" (
	"id" serial PRIMARY KEY NOT NULL,
	"form_id" integer NOT NULL,
	"answer" text
);
--> statement-breakpoint
ALTER TABLE "questions" ADD COLUMN "go_to_section_id" integer;--> statement-breakpoint
ALTER TABLE "questions" ADD COLUMN "max_length" integer;