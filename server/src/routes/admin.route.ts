import express from 'express';
import { deleteAdmin, getAdmins } from '../controller/admin.controllers';
import { checkUser } from '../middlewares/middleware';

const router = express.Router();

router.get('/', getAdmins );
router.delete('/:id',checkUser, deleteAdmin );

export default router;