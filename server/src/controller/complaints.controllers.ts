import { Request, Response } from "express";
import db from "../db";
import { complaints } from "../db/schema";
import { eq } from "drizzle-orm";
import { getCurrentDateOnly } from "../utils/lib";

export const getComplaints = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        if (!id) {
            const allComplaints = await db.select().from(complaints);
            return res.status(200).json({ message: "Complaints fetched successful", complaints: allComplaints });
        }

        const complaint = await db.select().from(complaints).where(eq(complaints.id, id));

        if (!complaint) {
            return res.status(404).json({ error: 'Complaint not found' });
        }

        return  res.status(200).json({ message: "Complaints fetched successful", complaints: complaint[0] });
    } catch (errors) {
        return res.status(500).json({ error: 'Server Error', errors });
    }
};

export const getComplaintsByUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    console.log({ id })

    if (!id) {
        return res.status(400).json({ message: 'Student ID is required.' });
    }

    try {
        const userComplaints = await db
            .select()
            .from(complaints)
            .where(eq(complaints.studentId, id));

        if (userComplaints.length === 0) {
            return res.status(404).json({ message: 'No complaints found for this student.' });
        }
        console.log(userComplaints)
        res.status(200).json({
            message: 'Complaints fetched successfully',
            data: userComplaints,
        });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching complaints', error });
    }
};

export const createComplaint = async (req: Request, res: Response) => {
    const { studentId, studentName, complaintDetails, lab } = req.body;
    console.log({ studentId, complaintDetails, lab })

    if (!studentId || !studentName || !complaintDetails || !lab) {
        res.status(400).json({
            error: "All Fields are Necessary"
        })
    }

    try {
        const [newComplaint] = await db
            .insert(complaints)
            .values({
                studentId,
                complaintDetails,
                studentName,
                createdAt: getCurrentDateOnly(),
                updatedAt: getCurrentDateOnly(),
                status: "Pending",
                lab: lab,
            })
            .returning();

        res.status(201).json({
            message: 'Complaint filed successfully',
            newComplaint: newComplaint,
        });
    } catch (errors: any) {
        res.status(500).json({ error: 'Error creating complaint', errors });
    }
};


export const updateComplaintStatus = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { status, message } = req.body;
    console.log({ id, status, message })

    if (!id || !status) {
        return res.status(400).json({ error: 'Complaint ID and status are required.' });
    }

    try {
        const updatedComplaint = await db
            .update(complaints)
            .set({ status, updatedAt: new Date().toISOString(), message })
            .where(eq(complaints.id, id))
            .returning();

        if (!updatedComplaint.length) {
            return res.status(404).json({ error: 'Complaint not found.' });
        }

        res.status(200).json({
            message: 'Complaint status updated successfully',
            data: updatedComplaint[0],
        });
    } catch (errors: any) {
        res.status(500).json({ error: 'Error updating complaint status', errors });
    }
};
