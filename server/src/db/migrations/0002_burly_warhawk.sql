CREATE TABLE IF NOT EXISTS "past_admins" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"mobile_number" text,
	"admin_role" text,
	"deleted_on" timestamp DEFAULT '2025-04-13 15:41:49.172',
	"deleted_by" uuid,
	"reason" text DEFAULT 'Resigned Jobs',
	CONSTRAINT "past_admins_name_unique" UNIQUE("name"),
	CONSTRAINT "past_admins_email_unique" UNIQUE("email")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "past_admins" ADD CONSTRAINT "past_admins_deleted_by_admins_id_fk" FOREIGN KEY ("deleted_by") REFERENCES "public"."admins"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
