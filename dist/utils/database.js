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
exports.Database = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const PhoneNumber_1 = __importDefault(require("../models/PhoneNumber"));
const Organization_1 = __importDefault(require("../models/Organization"));
class Database {
    constructor() { }
    static getInstance() {
        if (!Database.instance) {
            Database.instance = new Database();
        }
        return Database.instance;
    }
    /**
     * Create some fake data on DB so we can test the endpoints
     */
    createFakeData() {
        return __awaiter(this, void 0, void 0, function* () {
            // Init fake data
            const exists = yield PhoneNumber_1.default.countDocuments();
            if (exists === 0) {
                const phoneNumbers = [
                    { number: '123-456-7890', allocatedTo: null },
                    { number: '123-456-7891', allocatedTo: null },
                    { number: '123-456-7892', allocatedTo: null },
                ];
                yield PhoneNumber_1.default.insertMany(phoneNumbers);
            }
            else {
                console.log('Phone numbers already initialized');
            }
            const existOrgs = yield Organization_1.default.countDocuments();
            if (existOrgs === 0) {
                const organizations = [
                    { name: 'Org1' },
                    { name: 'Org2' },
                    { name: 'Org3' },
                ];
                yield Organization_1.default.insertMany(organizations);
            }
            else {
                console.log('Organizations already initialized');
            }
        });
    }
    connect() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/phone-number-management';
                yield mongoose_1.default.connect(uri, {
                    socketTimeoutMS: 45000,
                    connectTimeoutMS: 45000
                }).then(() => this.createFakeData());
                console.log('Database connected successfully');
            }
            catch (err) {
                console.error('Database connection error:', err);
            }
        });
    }
    disconnect() {
        return __awaiter(this, void 0, void 0, function* () {
            yield mongoose_1.default.disconnect();
        });
    }
}
exports.Database = Database;
