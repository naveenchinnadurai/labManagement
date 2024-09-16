import { Request, Response } from "express";
import { admin, students } from "../db/schema";
import db from "../db";
import { eq } from "drizzle-orm";

// Admin registration
export const register = async (req: Request, res: Response) => {
    const { name, email, password, mobileNumber, adminRole } = req.body;

    if (!name || !email || !password || !adminRole) {
        return res.status(400).json({ message: "All required fields must be provided." });
    }

    try {
        const result = await db.insert(admin).values({
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
        console.error("Error creating admin:", error);
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
        return handleLogin('admin', email, password, res);
    } else {
        if (!id) {
            return res.status(401).json({ message: "ID must be provided for student login." });
        }
        return handleLogin('student', id, password, res);
    }
};


// Helper function to handle login logic for both admin and student
const handleLogin = async (userType: 'admin' | 'student', identifier: string, password: string, res: Response) => {
    const table = userType === 'admin' ? admin : students;
    const field = userType === 'admin' ? admin.email : students.id;

    try {
        const result = await db.select().from(table).where(eq(field, identifier));

        if (result.length === 0) {
            return res.status(401).json({
                message: `${userType === 'admin' ? 'Admin' : 'Student'} Not Found!`,
            });
        }

        if (result[0].password === password) {
            return res.status(201).json({
                message: "Login Successful",
                userInfo: result[0],
            });
        }

        return res.status(401).json({
            message: "Wrong Password",
        });
    } catch (error) {
        console.error(`Error logging in ${userType}:`, error);
        return res.status(500).json({ message: "Internal server error" });
    }
};