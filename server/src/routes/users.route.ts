import express from 'express';
import { getAdmins } from '../controller/user.controllers';

const router = express.Router();

router.get('/admins', getAdmins )


export default router;