import express from 'express';
import { deleteAdmin, getAdmins } from '../controller/user.controllers';
import { checkUser } from '../middlewares/middleware';

const router = express.Router();

router.get('/admins', getAdmins );
router.delete('/admin/:id',checkUser, deleteAdmin );

export default router;