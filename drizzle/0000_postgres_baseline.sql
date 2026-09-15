CREATE TABLE "accounts" (
	"id" text PRIMARY KEY NOT NULL,
	"email" text NOT NULL,
	"password_hash" text NOT NULL,
	"created_at" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "attempts" (
	"id" text PRIMARY KEY NOT NULL,
	"owner" text NOT NULL,
	"answers" text NOT NULL,
	"score" integer NOT NULL,
	"created_at" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "journal" (
	"id" text PRIMARY KEY NOT NULL,
	"owner" text NOT NULL,
	"situation" text NOT NULL,
	"lesson" text NOT NULL,
	"law" integer,
	"created_at" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "notes" (
	"owner" text NOT NULL,
	"law" integer NOT NULL,
	"body" text NOT NULL,
	"updated_at" text NOT NULL,
	CONSTRAINT "notes_owner_law_pk" PRIMARY KEY("owner","law")
);
--> statement-breakpoint
CREATE TABLE "profiles" (
	"owner" text PRIMARY KEY NOT NULL,
	"answers" text NOT NULL,
	"updated_at" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "sessions" (
	"id" text PRIMARY KEY NOT NULL,
	"owner" text NOT NULL,
	"expires_at" text NOT NULL,
	"created_at" text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX "accounts_email_unique" ON "accounts" USING btree ("email");--> statement-breakpoint
CREATE INDEX "attempts_owner_created" ON "attempts" USING btree ("owner","created_at");--> statement-breakpoint
CREATE INDEX "journal_owner_created" ON "journal" USING btree ("owner","created_at");--> statement-breakpoint
CREATE INDEX "sessions_owner" ON "sessions" USING btree ("owner");--> statement-breakpoint
CREATE INDEX "sessions_expires" ON "sessions" USING btree ("expires_at");