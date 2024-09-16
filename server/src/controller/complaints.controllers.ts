import { Request, Response } from "express";
import db from "../db";
import { complaints } from "../db/schema";
import { eq } from "drizzle-orm";

export const getComplaints = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        if (id) {
            const complaint = await db.select().from(complaints).where(eq(complaints.id, id));
            if (complaint) {
                res.status(200).json({ message: "Complaints fetched successful", data: complaint[0] });
            } else {
                res.status(404).json({ message: 'Complaint not found' });
            }
        } else {
            const allComplaints = await db.select().from(complaints);
            res.status(200).json({ message: "Complaints fetched successful", data: allComplaints });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error });
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
    const { studentId, studentName, complaintDetails, status, lab, postedDate } = req.body;
    console.log({ studentId, complaintDetails, status, lab, postedDate })

    try {
        const newComplaint = await db
            .insert(complaints)
            .values({
                studentId,
                complaintDetails,
                studentName,
                createdAt: postedDate,
                updatedAt: postedDate,
                status: status,
                lab: lab,
            })
            .returning();

        res.status(201).json({
            message: 'Complaint filed successfully',
            data: newComplaint,
        });
    } catch (error) {
        res.status(500).json({ message: 'Error creating complaint', error });
    }
};


export const updateComplaintStatus = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { status } = req.body;
    console.log({ id, status })

    if (!id || !status) {
        return res.status(400).json({ message: 'Complaint ID and status are required.' });
    }

    try {
        const updatedComplaint = await db
            .update(complaints)
            .set({ status, updatedAt: new Date().toISOString() })
            .where(eq(complaints.id, id))
            .returning();

        if (!updatedComplaint.length) {
            return res.status(404).json({ message: 'Complaint not found.' });
        }

        res.status(200).json({
            message: 'Complaint status updated successfully',
            data: updatedComplaint[0],
        });
    } catch (error) {
        res.status(500).json({ message: 'Error updating complaint status', error });
    }
};
