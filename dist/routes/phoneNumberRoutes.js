"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
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
const express_1 = __importDefault(require("express"));
const phoneNumberController_1 = require("../controllers/phoneNumberController");
const jwtAuthMiddleware_1 = require("../middlewares/jwtAuthMiddleware");
const router = express_1.default.Router();
router.get('/available-numbers', jwtAuthMiddleware_1.jwtAuthMiddleware, phoneNumberController_1.getAvailableNumbers);
exports.default = router;
