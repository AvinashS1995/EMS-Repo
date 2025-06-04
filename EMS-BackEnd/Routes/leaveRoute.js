import express from 'express';
import { GetUpcomingHolidays } from "../Controllers/LeaveController.js";


const router = express.Router();

/**
 * @swagger
 * /api/leave/get-upcoming-holidays:
 *   get:
 *     summary: Get All Upcoming Holidays New Menu
 *     tags:
 *       - Leave
 *     responses:
 *       200:
 *         description: Record(s) Fetched successfully
 *       400:
 *         description: Bad request or missing required fields
 *       500:
 *         description: Server error
 */
router.get('/get-upcoming-holidays', GetUpcomingHolidays)


export default router;