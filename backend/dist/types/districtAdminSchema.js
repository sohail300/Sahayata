"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetPasswordSchema = exports.passwordSchema = exports.emailSchema = exports.loginSchema = void 0;
const zod_1 = require("zod");
exports.loginSchema = zod_1.z.object({
    number: zod_1.z.string().regex(/^[6-9]\d{9}$/, "Provide a valid mobile number"),
    password: zod_1.z.string().min(1, "The password should not be empty"),
});
exports.emailSchema = zod_1.z.object({
    email: zod_1.z.string().email("Provide a valid email"),
});
exports.passwordSchema = zod_1.z.object({
    password: zod_1.z
        .string()
        .regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, "Password must contain at least one letter, one digit, and be at least 8 characters long."),
});
exports.resetPasswordSchema = zod_1.z.object({
    password: zod_1.z
        .string()
        .regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, "Password must contain at least one letter, one digit, and be at least 8 characters long."),
    token: zod_1.z.string(),
});
