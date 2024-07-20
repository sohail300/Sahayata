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
exports.secretKey = void 0;
exports.authenticate = authenticate;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.secretKey = process.env.SECRET_KEY;
function authenticate(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const authHeader = req.headers.authorization;
            if (authHeader) {
                const token = authHeader.split(" ")[1];
                if (!exports.secretKey) {
                    return res.status(403).json({ msg: "Secret Key not defined" });
                }
                if (token) {
                    const user = (yield jsonwebtoken_1.default.verify(token, exports.secretKey));
                    req.headers["id"] = String(user.id);
                    req.headers["role"] = user.role;
                    next();
                }
            }
        }
        catch (error) {
            console.log("[ERROR]", error);
        }
    });
}
