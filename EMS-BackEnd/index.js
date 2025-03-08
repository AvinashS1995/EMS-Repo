import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRouter from './Routes/authRoute.js';
import ConnectToDatabase from './db/db.js';

dotenv.config({path:'./.env'});

ConnectToDatabase();
const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/auth', authRouter);

app.listen(process.env.PORT, () => {
    console.log(`Server is Running on Port ${process.env.PORT}`);
    
})