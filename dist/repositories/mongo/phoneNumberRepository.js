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
exports.PhoneNumberRepository = void 0;
const PhoneNumber_1 = __importDefault(require("../../models/PhoneNumber"));
class PhoneNumberRepository {
    findFirstAvailable() {
        return __awaiter(this, void 0, void 0, function* () {
            return PhoneNumber_1.default.findOne({ allocatedTo: null }).exec();
        });
    }
    findAllAvailable() {
        return __awaiter(this, void 0, void 0, function* () {
            return PhoneNumber_1.default.find({ allocatedTo: null }).exec();
        });
    }
    updateAllocation(phoneNumber, idPassport) {
        return __awaiter(this, void 0, void 0, function* () {
            yield PhoneNumber_1.default.updateOne({ number: phoneNumber }, { allocatedTo: idPassport }).exec();
        });
    }
}
exports.PhoneNumberRepository = PhoneNumberRepository;
