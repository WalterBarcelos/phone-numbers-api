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
exports.UserRepository = void 0;
const User_1 = __importDefault(require("../../models/User"));
class UserRepository {
    findByPassportAndName(idPassport, name, surname) {
        return __awaiter(this, void 0, void 0, function* () {
            return User_1.default.findOne({ idPassport, name, surname }).exec();
        });
    }
    create(userDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const newUser = new User_1.default({
                idPassport: userDto.idPassport,
                name: userDto.name,
                surname: userDto.surname,
                organizationId: userDto.organizationId,
                phoneNumbers: [userDto.phoneNumber], // Store single phone number
            });
            return newUser.save(); // Use save() to trigger Mongoose middleware (like validators)
        });
    }
    deleteByIdPassport(idPassport) {
        return __awaiter(this, void 0, void 0, function* () {
            yield User_1.default.deleteOne({ idPassport }).exec();
        });
    }
    findUserByIdPassport(idPassport) {
        return __awaiter(this, void 0, void 0, function* () {
            return User_1.default.findOne({ idPassport }).exec();
        });
    }
    findUserById(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return User_1.default.findById(userId).exec();
        });
    }
    getUsersWithPhoneNumber(organizationId) {
        return __awaiter(this, void 0, void 0, function* () {
            return User_1.default.find({ organizationId }).populate('phoneNumbers').exec();
        });
    }
}
exports.UserRepository = UserRepository;
