/**
 * @swagger
 * /api/phone-numbers/available-numbers/:
 *   get:
 *     summary: Get all available numbers
 *     tags:
 *       - Phone Numbers
*     security:
 *       - bearerAuth: []  # Require JWT for this endpoint
 *     responses:
 *       '200':
 *         description: List of available phone numbers
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   number: 
 *                     type: string
 *                   allocatedTo:
 *                     type: string 
 *       '400':
 *         description: Invalid request data
 */
import express from 'express';
import { getAvailableNumbers } from '../controllers/phoneNumberController';
import { jwtAuthMiddleware } from '../services/jwtAuthMiddleware';

const router = express.Router();

router.get('/available-numbers', jwtAuthMiddleware, getAvailableNumbers);

export default router;
