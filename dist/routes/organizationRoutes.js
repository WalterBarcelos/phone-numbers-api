"use strict";
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
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
const express_1 = __importDefault(require("express"));
const organizationController_1 = require("../controllers/organizationController");
const jwtAuthMiddleware_1 = require("../middlewares/jwtAuthMiddleware");
const router = express_1.default.Router();
router.get('/get', jwtAuthMiddleware_1.jwtAuthMiddleware, organizationController_1.getOrganizations);
router.get('/:organizationId/numbers', jwtAuthMiddleware_1.jwtAuthMiddleware, organizationController_1.getUsersWithPhoneNumber);
exports.default = router;
