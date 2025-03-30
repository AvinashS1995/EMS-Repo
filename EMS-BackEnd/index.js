import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRouter from './Routes/authRoute.js';
import sidenavRouter from './Routes/sidenavRoute.js'
import ConnectToDatabase from './db/db.js';
// import verifyToken from './Middlewares/verifyTokenMiddleware.js';
import menuRouter from './Routes/menuRoute.js'

dotenv.config({path:'./.env'});

ConnectToDatabase();
const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/auth', authRouter);
// app.use(verifyToken);
app.use('/api/roleMenu',sidenavRouter);
app.use('/api/menu', menuRouter)

app.listen(process.env.PORT, () => {
    console.log(`Server is Running on Port ${process.env.PORT}`);
    
})