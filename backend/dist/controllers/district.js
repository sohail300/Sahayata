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
exports.registerAdmin = registerAdmin;
exports.sendEmail = sendEmail;
exports.changePassword = changePassword;
exports.getEmergency = getEmergency;
const schema_1 = require("../db/schema");
const dotenv_1 = __importDefault(require("dotenv"));
const adminSchema_1 = require("../types/adminSchema");
const districtAdminSchema_1 = require("../types/districtAdminSchema");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const getDate_1 = require("../utils/getDate");
const mailer_1 = require("../utils/mailer");
dotenv_1.default.config();
const secretKey = process.env.JWT_SECRET;
function districtAdminLogin(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const parsedInput = districtAdminSchema_1.loginSchema.safeParse(req.body);
            if (parsedInput.success === false) {
                return res.status(401).json({
                    msg: parsedInput.error.issues[0],
                    success: false,
                });
            }
            const { number, password } = parsedInput.data;
            const user = yield schema_1.District.findOne({ number: number });
            console.log(user);
            if (user) {
                const match = yield bcrypt_1.default.compare(password, user.password);
                console.log(match);
                if (match) {
                    const payload = { id: user._id, role: "district " };
                    const token = jsonwebtoken_1.default.sign(payload, secretKey, {
                        expiresIn: "24h",
                    });
                    return res
                        .status(200)
                        .json({ msg: "Logged in!", token, success: true });
                }
                else {
                    return res.status(401).json({
                        msg: "Invalid Credentials",
                        success: false,
                    });
                }
            }
            else {
                return res.status(401).json({
                    msg: "Invalid Credentials",
                    success: false,
                });
            }
        }
        catch (err) {
            console.log("[ERROR]", err);
            return res.status(500).json({ msg: err, success: false });
        }
    });
}
function registerAdmin(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const parsedInput = adminSchema_1.registerAdminSchema.safeParse(req.body);
            if (parsedInput.success === false) {
                return res.status(401).json({
                    msg: parsedInput.error.issues[0],
                    success: false,
                });
            }
            const { name, number, password, latitude, longitude } = parsedInput.data;
            const admin = yield schema_1.Admin.findOne({ number });
            if (admin) {
                return res.status(403).json({ msg: "User already Exists" });
            }
            else {
                const hashedPassword = yield bcrypt_1.default.hash(password, 10);
                const obj = {
                    name,
                    password: hashedPassword,
                    number,
                    latitude,
                    longitude,
                    avaiable: true,
                };
                const newAdmin = new schema_1.Admin(obj);
                yield newAdmin.save();
                return res
                    .status(201)
                    .json({ msg: "Successfully Created Admin!", success: true });
            }
        }
        catch (err) {
            console.log("[ERROR]", err);
            return res.status(500).json({ msg: err, success: false });
        }
    });
}
function sendEmail(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const parsedInput = districtAdminSchema_1.emailSchema.safeParse(req.body);
            if (parsedInput.success === false) {
                return res.status(401).json({
                    msg: parsedInput.error.issues[0],
                    success: false,
                });
            }
            const { email } = parsedInput.data;
            const admin = yield schema_1.District.findOne({ email });
            if (admin) {
                (0, mailer_1.mailer)(email, res);
                return res.status(201).json({ msg: "Email sent!", success: true });
            }
            else {
                return res
                    .status(400)
                    .json({ msg: "User does not exist", success: false });
            }
        }
        catch (err) {
            console.log("[ERROR]", err);
            return res.status(500).json({ msg: err, success: false });
        }
    });
}
function changePassword(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const parsedInput = districtAdminSchema_1.resetPasswordSchema.safeParse(req.body);
            if (parsedInput.success === false) {
                return res.status(401).json({
                    msg: parsedInput.error.issues[0],
                    success: false,
                });
            }
            const { password, token } = parsedInput.data;
            const admin = yield schema_1.District.findOne({ forgotPasswordVerifyToken: token });
            if (admin &&
                admin.forgotPasswordExpiryDate != null &&
                admin.forgotPasswordExpiryDate > new Date()) {
                const hashedPassword = yield bcrypt_1.default.hash(password, 10);
                admin.forgotPasswordExpiryDate = null;
                admin.forgotPasswordVerifyToken = null;
                admin.password = hashedPassword;
                yield admin.save();
                return res.status(201).json({ msg: "Password updated!", success: true });
            }
            else {
                return res.status(400).json({ msg: "Invalid OTP", success: false });
            }
        }
        catch (err) {
            console.log("[ERROR]", err);
            return res.status(500).json({ msg: err, success: false });
        }
    });
}
function getEmergency(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const date = (0, getDate_1.getTodayDate)();
            const emergencyCases = yield schema_1.Emergency.findOne({ date });
            return res
                .status(200)
                .json({ emergencyCases: emergencyCases || [], success: true });
        }
        catch (err) {
            console.log("[ERROR]", err);
            return res.status(500).json({ msg: err, success: false });
        }
    });
}
