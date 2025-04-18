import { eq } from "drizzle-orm";
import db from "../db";
import { admins, students, students_session } from "../db/schema";
import { generateToken } from "./lib";
import { Request, Response } from "express";

// Helper function to handle login logic for both admins and student
export const handleLogin = async (userType: 'admins' | 'student', identifier: string, password: string, res: Response) => {
    const table = userType === 'admins' ? admins : students;
    const field = userType === 'admins' ? admins.email : students.id;

    try {
        const result = await db.select().from(table).where(eq(field, identifier));

        if (result.length === 0) {
            return res.status(404).json({
                error: `${userType === 'admins' ? 'Admin' : 'Student'} Not Found! Try again with correct login credentials`,
            });
        }

        const user = result[0];

        if (user.password === password) {
            let sessionId = null;

            if (userType == 'student') {
                const addSession = await addStudentSession(user.id);
                sessionId = addSession.sessionId
            }

            const token = generateToken(
                {
                    id: user.id,
                    email: user.email,
                    role: userType,
                    sessionId,
                }
            );


            return res.status(201).json({
                message: "Login Successful",
                user,
                sessionId,
                token,
            });
        }

        return res.status(401).json({
            error: "Incorrect Password, try again with correct password",
        });
    } catch (error) {
        console.error(`Error logging in ${userType}:`, error);
        return res.status(500).json({ error: "Internal server error" });
    }
};

//add session
export const addStudentSession = async (studentId: string) => {
    try {

        if (!studentId) {
            return { status: false };
        }

        const response = await fetch("https://api.ipify.org?format=json");
        const data = await response.json();

        const session = await db.insert(students_session).values({
            studentId,
            lab: 'I',
            ipAddress: data.ip,
            loginDateTime: new Date(),
        }).returning();

        return { status: true, sessionId: session[0].id };
    } catch (error) {
        console.error("Error adding session:", error);
        return { status: false };
    }
};