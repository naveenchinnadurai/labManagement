import { Request, Response } from "express";
import db from "../db";
import { admins } from "../db/schema";

export const getAdmins = async (req: Request, res: Response) => {
  try {
    const allAdmins = await db.select().from(admins);

    return res.status(200).json({
      isSuccess: true,
      data: allAdmins,
    });
  } catch (error) {
    console.error("Error fetching admins:", error);
  }
};
