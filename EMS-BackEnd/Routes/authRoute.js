import express from 'express';
import { Login, resendOtp, resetPassword, sendOtp, VerifyEmail, verifyOtp } from '../Controllers/LoginController.js';
import CreateUser from '../Controllers/UserController.js';


const router = express.Router();

router.post('/register-user', CreateUser)
router.post('/login', Login);
router.post('/verify-email', VerifyEmail);
router.post('/send-otp', sendOtp);
router.post('/resend-otp', resendOtp)
router.post('/verify-otp', verifyOtp)
router.post('/reset-password', resetPassword)


export default router;