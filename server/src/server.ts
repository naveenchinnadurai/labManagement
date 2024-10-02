import cors from 'cors';
import dotenv from "dotenv";
import express from 'express';
import authRouter from './routes/auth.route';
import userRouter from './routes/users.route';
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
app.use('/api/v1/users', userRouter);
app.use('/api/v1/complaints', complaintsRouter);
app.use('/api/v1/reservation', reservationRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
