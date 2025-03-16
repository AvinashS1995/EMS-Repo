import express from 'express';
import { Login, resendOtp, resetPassword, sendOtp, VerifyEmail, verifyOtp } from '../Controllers/LoginController.js';
import CreateUser from '../Controllers/UserController.js';


const router = express.Router();

router.post('/registerUser', CreateUser)
router.post('/Login', Login);
router.post('/VerifyEmail', VerifyEmail);
router.post('/sendOtp', sendOtp);
router.post('/resendOtp', resendOtp)
router.post('/verifyOtp', verifyOtp)
router.post('/resetPassword', resetPassword)


export default router;