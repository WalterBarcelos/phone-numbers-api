/**
 * @swagger
 * /api/organizations/get-all/:
 *   get:
 *     summary: Get all organizations
 *     tags:
 *       - Organizations
 *     security:
 *       - bearerAuth: []  # Require JWT for this endpoint
 *     responses:
 *       '200':
 *         description: List of all registered organizations
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   name: 
 *                     type: string
 *       '400':
 *         description: Invalid request data
 */
import express from 'express';
import { getOrganizations } from '../controllers/organizationController';
import { jwtAuthMiddleware } from '../services/jwtAuthMiddleware';

const router = express.Router();

router.get('/get-all', jwtAuthMiddleware, getOrganizations);

export default router;