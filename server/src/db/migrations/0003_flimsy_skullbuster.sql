CREATE TABLE IF NOT EXISTS "students_session" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"student_id" text NOT NULL,
	"login_date_time" timestamp with time zone NOT NULL,
	"logout_date_time" timestamp with time zone
);
--> statement-breakpoint
ALTER TABLE "past_admins" ALTER COLUMN "deleted_on" SET DEFAULT '2025-04-18 14:04:27.274';--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "students_session" ADD CONSTRAINT "students_session_student_id_students_id_fk" FOREIGN KEY ("student_id") REFERENCES "public"."students"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
