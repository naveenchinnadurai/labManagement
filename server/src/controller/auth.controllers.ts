import { Request, Response } from "express";
import { admins, students } from "../db/schema";
import db from "../db";
import { eq } from "drizzle-orm";

// Admin registration
export const register = async (req: Request, res: Response) => {
    const { name, email, password, mobileNumber, adminRole } = req.body;

    if (!name || !email || !password || !adminRole) {
        return res.status(400).json({ message: "All required fields must be provided." });
    }

    try {
        const result = await db.insert(admins).values({
            name,
            email,
            password,
            mobileNumber,
            adminRole,
        }).returning();

        return res.status(201).json({
            message: "Admin created successfully!",
            adminId: result[0].id,
        });
    } catch (error) {
        console.error("Error creating admins:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};


export const login = async (req: Request, res: Response) => {
    const { type, userData } = req.body;

    if (!userData) {
        return res.status(400).json({ message: "User data is required." });
    }

    const { id, email, password } = userData;

    if (!password) {
        return res.status(401).json({ message: "Password must be provided." });
    }

    if (type === "staff") {
        if (!email) {
            return res.status(401).json({ message: "Email must be provided for staff login." });
        }
        return handleLogin('admins', email, password, res);
    } else {
        if (!id) {
            return res.status(401).json({ message: "ID must be provided for student login." });
        }
        return handleLogin('student', id, password, res);
    }
};


// Helper function to handle login logic for both admins and student
const handleLogin = async (userType: 'admins' | 'student', identifier: string, password: string, res: Response) => {
    const table = userType === 'admins' ? admins : students;
    const field = userType === 'admins' ? admins.email : students.id;

    try {
        const result = await db.select().from(table).where(eq(field, identifier));

        if (result.length === 0) {
            return res.status(401).json({
                message: `${userType === 'admins' ? 'Admin' : 'Student'} Not Found! Try again with correct login credentials`,
            });
        }

        if (result[0].password === password) {
            return res.status(201).json({
                message: "Login Successful",
                user: result[0],
            });
        }

        return res.status(401).json({
            message: "Incorrect Password, try again with correct password",
        });
    } catch (error) {
        console.error(`Error logging in ${userType}:`, error);
        return res.status(500).json({ message: "Internal server error" });
    }
};