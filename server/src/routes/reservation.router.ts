import express from 'express';
import { getAllReservations, newReservation } from '../controller/reservation.controllers';

const router = express.Router();

router.get('/', getAllReservations)
router.post('/', newReservation)


export default router;