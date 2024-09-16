import { createComplaint, getComplaints, getComplaintsByUser, updateComplaintStatus } from "../controller/complaints.controllers";
import express from "express";

const router = express.Router();

router.get('/:id?', getComplaints);
router.get('/user/:id?', getComplaintsByUser);
router.post('/', createComplaint)
router.put('/:id', updateComplaintStatus)

export default router;
