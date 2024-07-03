"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deallocatePhoneNumber = exports.allocatePhoneNumber = exports.login = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const phoneNumberService_1 = require("../services/phoneNumberService");
const errorHandler_1 = require("../utils/errorHandler");
const phoneNumberService = new phoneNumberService_1.PhoneNumberService();
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password } = req.body;
        if (username === process.env.JWT_USERNAME && password === process.env.JWT_PASSWORD) {
            const user = {
                id: 1,
                username: 'user',
                email: 'user@example.com',
            };
            const token = jsonwebtoken_1.default.sign({ user }, process.env.JWT_SECRET || 'defaultjwtsecret', { expiresIn: '1h' });
            res.json({ token });
        }
        else {
            res.status(401).json({ message: 'Invalid credentials' });
        }
    }
    catch (error) {
        (0, errorHandler_1.handleError)(res, error);
    }
});
exports.login = login;
const allocatePhoneNumber = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const dto = req.body;
        yield phoneNumberService.allocatePhoneNumber(dto);
        res.json({ message: 'Phone number allocated successfully.' });
    }
    catch (error) {
        (0, errorHandler_1.handleError)(res, error);
    }
});
exports.allocatePhoneNumber = allocatePhoneNumber;
const deallocatePhoneNumber = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const dto = req.body;
        yield phoneNumberService.deallocatePhoneNumber(dto);
        res.json({ message: 'Phone number deallocated successfully' });
    }
    catch (error) {
        (0, errorHandler_1.handleError)(res, error);
    }
});
exports.deallocatePhoneNumber = deallocatePhoneNumber;
