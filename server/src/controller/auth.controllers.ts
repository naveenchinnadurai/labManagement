import { Request, Response } from "express";
import { admin } from "../db/schema";
import db from "../db";
import { eq } from "drizzle-orm";

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

        res.status(201).json({
            message: "Admin created successfully!",
            adminId: result[0].id,
        });
    } catch (error) {
        console.error("Error creating admin:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};


export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "All required fields must be provided." });
    }

    try {
        const result = await db.select().from(admin).where(eq(admin.email,email))

        if(!result){
            return res.status(201).json({
                message:"User Not Found!"
            })
        }

        if(result[0].password===password){
            res.status(201).json({
                message: "Login Successful",
                userInfo: result[0],
            });
        }

        res.status(201).json({
            message: "Wrong Password"
        });
    } catch (error) {
        console.error("Error creating admin:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};