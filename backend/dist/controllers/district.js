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
exports.districtAdminLogin = districtAdminLogin;
exports.getEmergency = getEmergency;
exports.registerAdmin = registerAdmin;
const schema_1 = require("../db/schema");
const dotenv_1 = __importDefault(require("dotenv"));
const zodTypes_1 = require("../types/zodTypes");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const getDate_1 = require("../utils/getDate");
dotenv_1.default.config();
const secretKey = process.env.SECRET_KEY;
function districtAdminLogin(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const parsedInput = zodTypes_1.loginSchema.safeParse(req.body);
            if (parsedInput.success === false) {
                return res.status(401).json({
                    msg: parsedInput.error.issues[0],
                });
            }
            const { email, password } = parsedInput.data;
            const user = yield schema_1.District.findOne({ email: email });
            if (user) {
                const match = yield bcrypt_1.default.compare(password, user.password);
                if (match) {
                    const payload = { id: user._id, role: "district " };
                    const token = jsonwebtoken_1.default.sign(payload, secretKey, {
                        expiresIn: "24h",
                    });
                    return res.status(200).json({ msg: "Logged in!", token });
                }
                else {
                    return res.status(401).json({
                        msg: "Invalid Credentials",
                    });
                }
            }
            else {
                return res.status(401).json({
                    msg: "Invalid Credentials",
                });
            }
        }
        catch (err) {
            console.log("[ERROR]", err);
            return res.status(500).json({ msg: err });
        }
    });
}
function getEmergency(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const date = (0, getDate_1.getTodayDate)();
        const emergencyCases = yield schema_1.Emergency.findOne({ date });
        if (emergencyCases) {
            res.status(200).json(emergencyCases);
        }
        else {
            res.status(403).json({ msg: "No Emergency Cases" });
        }
    });
}
function registerAdmin(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const parsedInput = zodTypes_1.registerAdminSchema.safeParse(req.body);
            if (parsedInput.success === false) {
                return res.status(401).json({
                    msg: parsedInput.error.issues[0],
                });
            }
            const { name, number, email, password, latitude, longitude } = parsedInput.data;
            const admin = yield schema_1.Admin.findOne({ email: email });
            if (admin) {
                return res.status(403).json({ msg: "User already Exists" });
            }
            else {
                const obj = {
                    name,
                    email,
                    password,
                    number,
                    latitude,
                    longitude,
                    avaiable: true,
                };
                const newAdmin = new schema_1.Admin(obj);
                yield newAdmin.save();
                return res.status(201).json({ msg: "Successfully Created Admin!" });
            }
        }
        catch (err) {
            console.log("[ERROR]", err);
            return res.status(500).json({ msg: err });
        }
    });
}
