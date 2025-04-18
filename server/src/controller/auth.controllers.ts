import { Request, Response } from "express";
import { admins, students, students_session } from "../db/schema";
import db from "../db";
import { eq } from "drizzle-orm";
import { generateToken, verifyToken } from "../utils/lib";
import { handleLogin } from "../utils/helpers";

// Admin registration
export const register = async (req: Request, res: Response) => {
    const { name, email, mobileNumber, adminRole } = req.body;

    if (!name || !email || !adminRole) {
        return res.status(400).json({ message: "All required fields must be provided." });
    }


    try {
        const result = await db.insert(admins).values({
            name,
            email,
            password: mobileNumber,
            mobileNumber,
            adminRole,
        }).returning();

        return res.status(201).json({
            message: "Admin created successfully!",
            newAdmin: result[0],
        });
    } catch (error) {
        console.error("Error creating admins:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};


export const login = async (req: Request, res: Response) => {
    const { type, userData } = req.body;

    if (!userData) {
        return res.status(400).json({ error: "Login Credentials are necessary is required." });
    }

    const { id, email, password } = userData;

    if (!password) {
        return res.status(400).json({ error: "Password must be provided." });
    }

    if (type === "staff") {
        if (!email) {
            return res.status(400).json({ error: "Email must be provided for staff login." });
        }
        return handleLogin('admins', email, password, res);
    } else {
        if (!id) {
            return res.status(400).json({ error: "ID must be provided for student login." });
        }
        return handleLogin('student', id, password, res);
    }
};

export const logout = async (req: Request, res: Response) => {
    const user = req.user;

    if (!user) {
        return res.status(400).json({ error: "Invalid Token" });
    }

    try {
        const { sessionId } = user;

        if (!sessionId) {
            return res.status(400).json({ error: "Session ID is required" });
        }

        const result = await db
            .update(students_session)
            .set({
                isActive: false,
                logoutDateTime: new Date()
            })
            .where(eq(students_session.id, sessionId));

        if (result.length === 0) {
            return res.status(404).json({ error: "Session not found" });
        }

        return res.status(200).json({ message: "Logout successfully" });
    } catch (error) {
        console.error("Error updating session:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

export const logoutSession = async (req: Request, res: Response) => {
    const { sessionId } = req.body;

    if (!sessionId) {
        return res.status(400).json({ error: "Invalid session Id" });
    }

    try {
        const result = await db
            .update(students_session)
            .set({
                isActive: false,
                logoutDateTime: new Date()
            })
            .where(eq(students_session.id, sessionId)).returning();


        if (result.length === 0) {
            return res.status(404).json({ error: "Session not found" });
        }

        return res.status(200).json({ message: "Session Logged out successfully" });
    } catch (error) {
        console.error("Error updating session:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

export const logoutAllSessions = async (req: Request, res: Response) => {
    const user = req.user;

    if (!user) {
        return res.status(400).json({ error: "Invalid Token" });
    }

    try {
        const { id } = user;

        if (!id) {
            return res.status(400).json({ error: "Session ID is required" });
        }

        const result = await db
            .update(students_session)
            .set({
                isActive: false,
                logoutDateTime: new Date()
            })
            .where(eq(students_session.studentId, id));

        if (result.length === 0) {
            return res.status(404).json({ error: "Sessions not found" });
        }

        return res.status(200).json({ message: "Session Closed successfully" });
    } catch (error) {
        console.error("Error updating session:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

export const getSessions = async (req: Request, res: Response) => {
    try {
        const studentId = req.user?.id;

        if (!studentId) {
            return res.status(400).json({ error: "studentId is required in the URL" });
        }

        const sessions = await db
            .select()
            .from(students_session)
            .where(eq(students_session.studentId, studentId));

        if (sessions.length === 0) {
            return res.status(404).json({ error: "No sessions found for the given student ID" });
        }

        return res.status(200).json({ sessions });
    } catch (error) {
        console.error("Error fetching sessions:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

