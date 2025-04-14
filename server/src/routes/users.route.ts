import express from 'express';
import { deleteAdmin, getAdmins } from '../controller/user.controllers';
import { verifyAdmin } from '../middlewares/middleware';

const router = express.Router();

router.get('/admins', getAdmins );
router.delete('/admin/:id',verifyAdmin, deleteAdmin );

export default router;