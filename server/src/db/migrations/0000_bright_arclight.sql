CREATE TABLE IF NOT EXISTS "admins" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"password" text NOT NULL,
	"email" text NOT NULL,
	"mobile_number" text,
	"admin_role" text,
	CONSTRAINT "admins_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "complaints" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"student_name" text NOT NULL,
	"student_id" text NOT NULL,
	"complaint_details" text NOT NULL,
	"status" text DEFAULT 'Pending',
	"created_at" text NOT NULL,
	"updated_at" text NOT NULL,
	"lab" text DEFAULT 'Common' NOT NULL,
	"message" text DEFAULT 'It will be sorted out soon!!'
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "reservation" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"reserved_by" uuid,
	"reserver_name" text NOT NULL,
	"reservedDate" text NOT NULL,
	"period" text[] NOT NULL,
	"reserved_on" text NOT NULL,
	"message" text,
	"lab" text DEFAULT 'I' NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "students" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"department" text NOT NULL,
	"year" text NOT NULL,
	"email" text NOT NULL,
	"mobile_number" text,
	"password" text NOT NULL,
	CONSTRAINT "students_id_unique" UNIQUE("id"),
	CONSTRAINT "students_name_unique" UNIQUE("name"),
	CONSTRAINT "students_email_unique" UNIQUE("email")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "complaints" ADD CONSTRAINT "complaints_student_name_students_name_fk" FOREIGN KEY ("student_name") REFERENCES "public"."students"("name") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "complaints" ADD CONSTRAINT "complaints_student_id_students_id_fk" FOREIGN KEY ("student_id") REFERENCES "public"."students"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "reservation" ADD CONSTRAINT "reservation_reserved_by_admins_id_fk" FOREIGN KEY ("reserved_by") REFERENCES "public"."admins"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "reservation" ADD CONSTRAINT "reservation_reserver_name_admins_name_fk" FOREIGN KEY ("reserver_name") REFERENCES "public"."admins"("name") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
