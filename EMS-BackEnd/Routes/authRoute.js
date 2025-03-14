import express from 'express';
import { Login, VerifyEmail } from '../Controllers/LoginController.js';


const router = express.Router();

router.post('/Login', Login);
router.post('/VerifyEmail', VerifyEmail)


export default router;