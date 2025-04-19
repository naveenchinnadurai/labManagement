import express from 'express';
import { updateEmail, updateMobileNumber, updatePassword } from '../controller/student.controller';
import { checkUser } from '../middlewares/middleware';

const router = express.Router();

router.put('/email', checkUser, updateEmail);
router.put('/mobile', checkUser, updateMobileNumber);
router.put('/password', checkUser, updatePassword);

export default router;