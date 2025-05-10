import express from 'express';
import { sendCheckInsOtp } from '../Controllers/AttendenceController.js';


const router = express.Router();

router.post('/send-check-ins-otp', sendCheckInsOtp);



export default router;
