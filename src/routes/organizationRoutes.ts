/**
 * @swagger
 * /api/organizations/get/:
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

/**
 * @swagger
 * /api/users/phone-numbers:
 *   get:
 *     summary: Get users with assigned phone numbers for an organization
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []  # Require JWT for this endpoint 
 *     parameters:
 *       - in: path
 *         name: organizationId
 *         required: true
 *         schema:
 *           type: string
 *         description: Organization ID
 *     responses:
 *       '200':
 *         description: List of users with phone numbers
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   idPassport:
 *                     type: string
 *                   name:
 *                     type: string
 *                   surname:
 *                     type: string
 *                   phoneNumbers:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         _id:
 *                           type: string
 *                         number:
 *                           type: string
 *                         allocatedTo:
 *                           type: string
 *       '400':
 *         description: Invalid organization ID
 */
import express from 'express';
import { getOrganizations, getUsersWithPhoneNumber } from '../controllers/organizationController';
import { jwtAuthMiddleware } from '../middlewares/jwtAuthMiddleware';

const router = express.Router();

router.get('/get', jwtAuthMiddleware, getOrganizations);
router.get('/:organizationId/numbers', jwtAuthMiddleware, getUsersWithPhoneNumber);

export default router;