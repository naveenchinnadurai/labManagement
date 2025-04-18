import express from 'express';
import { getSessions, login, logout, logoutAllSessions, logoutSession, register } from '../controller/auth.controllers';
import { checkUser } from '../middlewares/middleware';

const router = express.Router();

router.post('/signup', register)
router.post('/login', login)
router.put('/logout', logout)
router.get('/sessions/', checkUser, getSessions);
router.put('/sessions/', checkUser, logoutSession)
router.put('/sessions/all', checkUser, logoutAllSessions)


export default router;