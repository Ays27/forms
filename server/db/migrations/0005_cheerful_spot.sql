CREATE TABLE "response_answers" (
	"id" serial PRIMARY KEY NOT NULL,
	"response_id" integer NOT NULL,
	"question_id" integer NOT NULL,
	"value" text
);
--> statement-breakpoint
ALTER TABLE "responses" ADD COLUMN "created_at" timestamp DEFAULT now();--> statement-breakpoint
ALTER TABLE "responses" DROP COLUMN "answer";