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
exports.PhoneNumberService = void 0;
const UserRepository_1 = require("../repositories/mongo/UserRepository");
const PhoneNumberRepository_1 = require("../repositories/mongo/PhoneNumberRepository");
const OrganizationRepository_1 = require("../repositories/mongo/OrganizationRepository");
class PhoneNumberService {
    constructor() {
        this.userRepository = new UserRepository_1.UserRepository();
        this.phoneNumberRepository = new PhoneNumberRepository_1.PhoneNumberRepository();
        this.organizationRepository = new OrganizationRepository_1.OrganizationRepository();
    }
    allocatePhoneNumber(dto) {
        return __awaiter(this, void 0, void 0, function* () {
            const { idPassport, name, surname, organizationId } = dto;
            // Check if the organization exists
            const existingOrganization = yield this.organizationRepository.findById(organizationId);
            if (!existingOrganization) {
                throw new Error('Organization not found.');
            }
            // Check if the user already exists
            const existingUser = yield this.userRepository.findByPassportAndName(idPassport, name, surname);
            if (existingUser) {
                throw new Error('User already has a number allocated.');
            }
            // Get the first available phone number
            const phoneRecord = yield this.phoneNumberRepository.findFirstAvailable();
            if (!phoneRecord) {
                throw new Error('No available phone numbers.');
            }
            // Insert new user and update phone number with new user id
            yield this.userRepository.create({ idPassport, name, surname, organizationId, phoneNumber: phoneRecord.number });
            yield this.phoneNumberRepository.updateAllocation(phoneRecord.number, idPassport);
        });
    }
    deallocatePhoneNumber(dto) {
        return __awaiter(this, void 0, void 0, function* () {
            const { idPassport } = dto;
            // Check if the user exists
            const existingUser = yield this.userRepository.findUserByIdPassport(idPassport);
            if (!existingUser) {
                throw new Error('User not found.');
            }
            // Deallocate phone number
            yield this.phoneNumberRepository.updateAllocation(existingUser.phoneNumber.toString(), null);
            yield this.userRepository.deleteByIdPassport(idPassport);
        });
    }
}
exports.PhoneNumberService = PhoneNumberService;
