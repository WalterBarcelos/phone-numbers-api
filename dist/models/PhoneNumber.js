"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const PhoneNumberSchema = new mongoose_1.Schema({
    number: { type: String, required: true, unique: true },
    allocatedTo: { type: String, default: null }
});
exports.default = (0, mongoose_1.model)('PhoneNumber', PhoneNumberSchema);
