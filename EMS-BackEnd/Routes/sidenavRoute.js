import express from 'express';
import sidenav from '../Controllers/SideNavController.js';


const router = express.Router();

router.get('/sidenav', sidenav)

export default router;