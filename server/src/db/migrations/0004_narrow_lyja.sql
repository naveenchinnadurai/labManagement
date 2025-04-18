ALTER TABLE "past_admins" ALTER COLUMN "deleted_on" SET DEFAULT '2025-04-18 14:44:55.216';--> statement-breakpoint
ALTER TABLE "students_session" ADD COLUMN "lab" text NOT NULL;--> statement-breakpoint
ALTER TABLE "students_session" ADD COLUMN "ip_address" text NOT NULL;--> statement-breakpoint
ALTER TABLE "students_session" ADD COLUMN "is_active" boolean DEFAULT true;