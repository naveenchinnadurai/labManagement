import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

export const admin = pgTable("admin", {
    id: uuid("id").primaryKey().defaultRandom(),
    name: text("name").notNull(),
    email: text("email").unique().notNull(),
    password: text("password").notNull(),
    mobileNumber: text("mobile_number"),
    adminRole:text("admin_role")
});

export const students = pgTable("students", {
    id: uuid('id').primaryKey().defaultRandom(),
    name:text('name').notNull().unique(),
    department: text("department"),
    year: text("year"),
    password: text("password").notNull(),
});


export const complaints = pgTable("complaints", {
    id: uuid("id").primaryKey().defaultRandom(),
    studentId: uuid("student_id").notNull().references(() => students.id),
    complaintDetails: text("complaint_details").notNull(),
    status: text("status").default("Pending"),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow()
});
