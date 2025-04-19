import cors from 'cors';
import dotenv from "dotenv";
import express from 'express';
import authRouter from './routes/auth.route';
import adminRouter from './routes/admin.route';
import studentRouter from './routes/student.route';
import complaintsRouter from './routes/complaints.route';
import reservationRouter from './routes/reservation.router';
dotenv.config;

const app = express();
const PORT = process.env.PORT || 3000;


app.use(cors({
  origin: 'http://localhost:5173',
  credentials: false
}));

app.use(express.json());

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/admin', adminRouter);
app.use('/api/v1/student', studentRouter);
app.use('/api/v1/complaints', complaintsRouter);
app.use('/api/v1/reservation', reservationRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
