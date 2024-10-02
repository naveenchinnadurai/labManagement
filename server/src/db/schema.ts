import { pgEnum, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

export const admins = pgTable("admins", {
    id: uuid("id").primaryKey().defaultRandom(),
    name: text("name").notNull().unique(),
    password: text("password").notNull(),
    email: text("email").unique().notNull(),
    mobileNumber: text("mobile_number"),
    adminRole: text("admin_role")
});

const yearEnum = pgEnum('year', ['I', 'II', 'III', 'IV']);

export const students = pgTable("students", {
    id: text('id').primaryKey().unique(),
    name: text('name').notNull().unique(),
    department: text("department").notNull(),
    year: text('year').notNull(),
    email: text("email").unique().notNull(),
    mobileNumber: text("mobile_number"),
    password: text("password").notNull(),
});

export const reservation = pgTable("reservation", {
    id: uuid('id').primaryKey().defaultRandom(),
    reservedBy: uuid('reserved_by').references(() => admins.id),
    reserverName: text('reserver_name').references(() => admins.name).notNull(),
    reservedDate: text('reservedDate').notNull(),
    session: text('period').array().notNull(),
    reservedOn: text('reserved_on').notNull(),
    message:text('message'),
    lab:text('lab').notNull().default('I')
})

export const complaints = pgTable("complaints", {
    id: uuid("id").primaryKey().defaultRandom(),
    studentName: text("student_name").notNull().references(() => students.name),
    studentId: text("student_id").notNull().references(() => students.id),
    complaintDetails: text("complaint_details").notNull(),
    status: text("status").default("Pending"),
    createdAt: text("created_at").notNull(),
    updatedAt: text("updated_at").notNull(),
    lab: text("lab").default('Common').notNull(),
    message:text('message').default("It will be sorted out soon!!")
});
