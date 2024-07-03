"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const phoneNumberRoutes_1 = __importDefault(require("./routes/phoneNumberRoutes"));
const organizationRoutes_1 = __importDefault(require("./routes/organizationRoutes"));
require('dotenv').config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
// Middleware for parsing JSON body
app.use(express_1.default.json());
app.use('/api/users', userRoutes_1.default);
app.use('/api/organizations', organizationRoutes_1.default);
app.use('/api/phone-numbers', phoneNumberRoutes_1.default);
// Default route
app.get('/', (req, res) => {
    res.send('Phone Number API is running');
});
exports.default = app;
