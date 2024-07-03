"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const database_1 = require("./utils/database");
const swagger_1 = __importDefault(require("./swagger"));
const PORT = process.env.PORT || 3000;
// Swagger setup
(0, swagger_1.default)(app_1.default);
// Connect to DB and start server
const db = database_1.Database.getInstance();
db.connect().then(() => {
    app_1.default.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
});
