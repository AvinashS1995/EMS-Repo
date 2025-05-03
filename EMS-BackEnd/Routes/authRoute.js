import express from 'express';
import { Login, LogOut, resendOtp, resetPassword, sendOtp, VerifyEmail, verifyOtp } from '../Controllers/LoginController.js';
import { CreateUser, CreateTypeList, GetTypeList, UpdateTypeList, DeleteTypeList } from '../Controllers/UserController.js';


const router = express.Router();

router.post('/register-user', CreateUser)
router.post('/login', Login);
router.post('/verify-email', VerifyEmail);
router.post('/send-otp', sendOtp);
router.post('/resend-otp', resendOtp)
router.post('/verify-otp', verifyOtp)
router.post('/reset-password', resetPassword)
router.post('/log-out', LogOut)
router.post('/save-type-list', CreateTypeList)
router.post('/get-type-list', GetTypeList)
router.post('/update-type-list', UpdateTypeList)
router.post('/delete-type-list', DeleteTypeList)


export default router;