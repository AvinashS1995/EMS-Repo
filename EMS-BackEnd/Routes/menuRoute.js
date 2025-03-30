import express from 'express';
import { AssignRoleMenus, CreateMenu, GetMenu, GetRoleMenus  } from '../Controllers/MenuController.js';

const router = express.Router();

router.post('/create-menu', CreateMenu)
router.get('/getmenu', GetMenu)
router.post('/create-role-wise-menu', AssignRoleMenus)
router.post('/getrole-wise-menu', GetRoleMenus)



export default router;