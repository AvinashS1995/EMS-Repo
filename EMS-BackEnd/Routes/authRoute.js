import express from 'express';
import { Login, LogOut, resendOtp, resetPassword, sendOtp, VerifyEmail, verifyOtp } from '../Controllers/LoginController.js';
import { CreateUser, CreateTypeList, GetTypeList, UpdateTypeList, DeleteTypeList, GetUserList, UpdateEmployeeList, DeleteEmployeeList } from '../Controllers/UserController.js';
import upload from '../Middlewares/uploadMiddleware.js';


const router = express.Router();

router.post('/register-user', upload.single("profileImage") ,CreateUser)
router.post('/login', Login);
router.post('/verify-email', VerifyEmail);
router.post('/send-otp', sendOtp);
router.post('/resend-otp', resendOtp)
router.post('/verify-otp', verifyOtp)
router.post('/reset-password', resetPassword)
router.post('/log-out', LogOut)
router.post('/get-user-list', GetUserList)
router.post('/update-employee-list', UpdateEmployeeList)
router.post('/delete-employee-list', DeleteEmployeeList)
router.post('/save-type-list', CreateTypeList)
router.post('/get-type-list', GetTypeList)
router.post('/update-type-list', UpdateTypeList)
router.post('/delete-type-list', DeleteTypeList)


export default router;