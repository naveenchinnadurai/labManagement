import { Request, Response } from "express";
import db from "../db";
import { students } from "../db/schema";
import { eq } from "drizzle-orm";

export const updateEmail = async (req: Request, res: Response) => {
    const id = req.user?.id;

    const { email } = req.body;

    if (!id) {
        return res.status(400).json({ error: "User Id not found, Invalid Token!" })
    }

    if (!email) {
        return res.status(400).json({ error: "Email is required" });
    }

    try {
        const result = await db.update(students)
            .set({ email })
            .where(eq(students.id, id)).returning();

        if (result.length == 0) {
            return res.status(404).json({ error: "User Not Found" });
        }

        return res.status(200).json({ message: "Email updated successfully" });
    } catch (error) {
        console.error("Error updating email:", error);
        res.status(500).json({ error: "Failed to update email" });
    }
};


export const updateMobileNumber = async (req: Request, res: Response) => {
    const id = req.user?.id;

    const { mobileNumber } = req.body;

    if (!id) {
        return res.status(400).json({ error: "User Id not found, Invalid Token!" })
    }

    if (!mobileNumber) {
        return res.status(400).json({ error: "Mobile Number is required" });
    }

    try {
        const result = await db.update(students)
            .set({ mobileNumber })
            .where(eq(students.id, id)).returning();


        if (result.length == 0) {
            return res.status(404).json({ error: "User Not Found" });

        }

        res.status(200).json({ message: "Mobile number updated successfully" });
    } catch (error) {
        console.error("Error updating mobile number:", error);
        res.status(500).json({ error: "Failed to update mobile number" });
    }
};

export const updatePassword = async (req: Request, res: Response) => {
    const id = req.user?.id;
    const { currentPassword, newPassword } = req.body;

    if (!newPassword || newPassword.length < 6) {
        return res.status(400).json({ error: "Password must be at least 6 characters" });
    }

    if (!id) {
        return res.status(400).json({ error: "User Id required, Invalid Access Token!" });
    }

    try {

        const thisStudent = await db.select().from(students).where(eq(students.id, id));

        if (thisStudent.length == 0) {
            return res.status(404).json({ error: "User Not Found!" });
        }

        if (thisStudent[0].password !== currentPassword) {
            return res.status(400).json({ error: 'Invalid Credential, Wrond Password!!' })
        }

        const result = await db.update(students)
            .set({ password: newPassword })
            .where(eq(students.id, id)).returning();

        res.status(200).json({ message: "Password updated successfully" });
    } catch (error) {
        console.error("Error updating password:", error);
        res.status(500).json({ error: "Failed to update password" });
    }
};
