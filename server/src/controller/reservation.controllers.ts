import { Request, Response } from "express";
import db from "../db";
import { reservation } from "../db/schema";

export const getAllReservations = async (req: Request, res: Response) => {
    try {
        const newReservation = await db
            .select().
            from(reservation);

        res.status(201).json({
            data: newReservation,
        });
    } catch (error) {
        res.status(500).json({ message: "Error creating reservation.", error });
    }
}
export const newReservation = async (req: Request, res: Response) => {
    const { reservedBy, reserverName, reservedDate, session, reservedOn, message, lab } = req.body;

    if (!reservedBy || !reserverName || !reservedDate || !session || !reservedOn || !lab) {
        return res.status(400).json({ message: "Missing required fields." });
    }

    try {
        const newReservation = await db
            .insert(reservation)
            .values({
                reservedBy,
                reserverName,
                reservedDate,
                session,
                reservedOn,
                message: message || null,
                lab: lab || "I",
            })
            .returning();

        res.status(201).json({
            message: "Reservation successfully created.",
            data: newReservation,
        });
    } catch (error) {
        res.status(500).json({ message: "Error creating reservation.", error });
    }
};
