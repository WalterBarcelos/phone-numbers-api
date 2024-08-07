/**
 * @swagger
 * /api/users/login:
 *   post:
 *     summary: Login to get JWT token
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       '201':
 *         description: Successful allocation
 *       '400':
 *         description: Invalid request data
 */

/**
 * @swagger
 * /api/users/allocate:
 *   post:
 *     summary: Allocate a phone number to a user
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []  # Require JWT for this endpoint
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               organizationId:
 *                 type: string
 *               IdPassport:
 *                 type: string
 *               name:
 *                 type: string
 *               surname:
 *                 type: string
 *     responses:
 *       '201':
 *         description: Successful allocation
 *       '400':
 *         description: Invalid request data
 */

/**
 * @swagger
 * /api/users/deallocate:
 *   delete:
 *     summary: Deallocate a phone number from a user
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []  # Require JWT for this endpoint
 *     parameters:
 *       - in: path
 *         name: IdPassport
 *         required: true
 *         schema:
 *           type: string
 *         description: User unique ID or passport
 *     responses:
 *       '200':
 *         description: Successful deallocation
 *       '400':
 *         description: Invalid request data
 */

import express from 'express';
import { login, allocatePhoneNumber, deallocatePhoneNumber } from '../controllers/userController';
import { jwtAuthMiddleware } from '../middlewares/jwtAuthMiddleware';

const router = express.Router();

// Route for user login and get jwt
router.post('/login', login);

router.post('/allocate', jwtAuthMiddleware, allocatePhoneNumber);
router.delete('/deallocate/:idPassport', jwtAuthMiddleware, deallocatePhoneNumber);

export default router;

