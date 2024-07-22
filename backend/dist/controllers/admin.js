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
exports.adminLogin = adminLogin;
exports.adminProfile = adminProfile;
exports.editAdmin = editAdmin;
const schema_1 = require("../db/schema");
const adminSchema_1 = require("../types/adminSchema");
const districtAdminSchema_1 = require("../types/districtAdminSchema");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const secretKey = process.env.JWT_SECRET;
function adminLogin(req, res) {
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
            const user = yield schema_1.Admin.findOne({ number });
            if (user) {
                const match = yield bcrypt_1.default.compare(password, user.password);
                if (match) {
                    const payload = { id: user._id, role: "admin" };
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
function adminProfile(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const id = req.headers["id"];
            const admin = yield schema_1.Admin.findById(id).select("-select");
            if (admin) {
                return res.status(200).json({
                    admin,
                });
            }
            else {
                return res.status(401).json({
                    msg: "Admin does not exist",
                });
            }
        }
        catch (err) {
            console.log("[ERROR]", err);
            return res.status(500).json({ msg: err });
        }
    });
}
function editAdmin(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const id = req.headers["id"];
            const parsedInput = adminSchema_1.adminEditSchema.safeParse(req.body);
            if (parsedInput.success === false) {
                return res.status(401).json({
                    msg: parsedInput.error.issues[0],
                });
            }
            const { worker, available } = parsedInput.data;
            const updatedResponse = yield schema_1.Admin.findByIdAndUpdate(id, {
                available,
                worker,
            });
            if (!updatedResponse) {
                res.status(403).json({ msg: "Not Updated" });
            }
            else {
                res.status(201).json({ msg: "Updated" });
            }
        }
        catch (err) {
            console.log("[ERROR]", err);
            return res.status(500).json({ msg: err });
        }
    });
}
