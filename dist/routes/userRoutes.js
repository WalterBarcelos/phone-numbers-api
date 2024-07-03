"use strict";
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
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
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controllers/userController");
const jwtAuthMiddleware_1 = require("../middlewares/jwtAuthMiddleware");
const router = express_1.default.Router();
// Route for user login and get jwt
router.post('/login', userController_1.login);
router.post('/allocate', jwtAuthMiddleware_1.jwtAuthMiddleware, userController_1.allocatePhoneNumber);
router.delete('/deallocate/:idPassport', jwtAuthMiddleware_1.jwtAuthMiddleware, userController_1.deallocatePhoneNumber);
exports.default = router;
