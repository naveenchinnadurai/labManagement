import { Request, Response } from "express";
import db from "../db";
import { admin } from "../db/schema";

export const getAdmins = async (req: Request, res: Response) => {
  try {
    const admins = await db.select().from(admin);

    return res.status(200).json({
      isSuccess: true,
      data: admins,
    });
  } catch (error) {
    console.error("Error fetching admins:", error);
  }
};
