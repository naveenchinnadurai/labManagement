import { Request, Response } from "express";
import db from "../db";
import { admins, past_admin } from "../db/schema";
import { eq } from "drizzle-orm";

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


export const deleteAdmin = async (req: Request, res: Response) => {
  const adminId = req.params.id;

  if (!adminId) {
    return res.status(400).json({ error: 'Provide Admin Id to Delete.' });
  }

  try {
    const adminToDelete = await db
      .select()
      .from(admins)
      .where(eq(admins.id, adminId))
      .limit(1);

    if (adminToDelete.length === 0) {
      return res.status(404).json({ error: 'Admin with this Id is not found' });
    }

    const admin = adminToDelete[0];

    await db.insert(past_admin).values({
      id: admin.id,
      name: admin.name,
      email: admin.email,
      mobileNumber: admin.mobileNumber,
      adminRole: admin.adminRole,
      deletedOn: new Date(),
      deletedBy: req.user?.id,
      reason: "Fired"
    });


    await db.delete(admins).where(eq(admins.id, adminId));

    res.status(200).json({ message: 'Admin deleted and archived successfully' });

  } catch (error) {
    console.error('Error deleting admin:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

