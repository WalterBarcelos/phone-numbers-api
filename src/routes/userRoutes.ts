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
 *       - in: query
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
import { login, getUsersWithPhoneNumber, allocatePhoneNumber, deallocatePhoneNumber } from '../controllers/userController';
import { jwtAuthMiddleware } from '../services/jwtAuthMiddleware';

const router = express.Router();

// Route for user login and get jwt
router.post('/login', login);

router.get('/phone-numbers', jwtAuthMiddleware, getUsersWithPhoneNumber);
router.post('/allocate', jwtAuthMiddleware, allocatePhoneNumber);
router.delete('/deallocate/:idPassport', jwtAuthMiddleware, deallocatePhoneNumber);

export default router;

