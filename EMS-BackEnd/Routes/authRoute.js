import express from 'express';
import { Login } from '../Controllers/LoginController.js';


const router = express.Router();

router.post('/Login', Login)


export default router;