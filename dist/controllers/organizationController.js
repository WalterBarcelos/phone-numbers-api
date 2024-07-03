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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUsersWithPhoneNumber = exports.getOrganizations = void 0;
const UserRepository_1 = require("../repositories/mongo/UserRepository");
const OrganizationRepository_1 = require("../repositories/mongo/OrganizationRepository");
const errorHandler_1 = require("../utils/errorHandler");
const userRepository = new UserRepository_1.UserRepository();
const organizationRepository = new OrganizationRepository_1.OrganizationRepository();
const getOrganizations = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const organizations = yield organizationRepository.findAll();
        res.json(organizations);
    }
    catch (error) {
        (0, errorHandler_1.handleError)(res, error);
    }
});
exports.getOrganizations = getOrganizations;
const getUsersWithPhoneNumber = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const organizationId = req.params.organizationId;
        console.log('getUsersWithPhoneNumber Organization ID: ' + organizationId);
        // Check if the organization exists
        const existingOrganization = yield organizationRepository.findById(organizationId);
        if (!existingOrganization) {
            return res.status(404).json({ error: 'Organization not found.' });
        }
        // Find users for the given organizationId and populate the 'phoneNumbers' field
        const users = yield userRepository.getUsersWithPhoneNumber(organizationId);
        // Send the users with populated phone numbers as response
        res.json({ users });
    }
    catch (error) {
        // Handle error using custom error handler
        (0, errorHandler_1.handleError)(res, error);
    }
});
exports.getUsersWithPhoneNumber = getUsersWithPhoneNumber;
