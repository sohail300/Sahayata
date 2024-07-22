"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyOTPSchema = exports.sendOTPSchema = exports.updateUserSchema = void 0;
const zod_1 = require("zod");
exports.updateUserSchema = zod_1.z.object({
    name: zod_1.z
        .string()
        .min(1, "Name cannot be empty")
        .max(100, "Max 100 characters"),
});
exports.sendOTPSchema = zod_1.z.object({
    number: zod_1.z
        .string()
        .regex(/^[6-9]\d{9}$/, "Provide a valid Indian mobile number"),
});
exports.verifyOTPSchema = zod_1.z.object({
    number: zod_1.z
        .string()
        .regex(/^[6-9]\d{9}$/, "Provide a valid Indian mobile number"),
    otp: zod_1.z.string().regex(/^\d{6}$/, "OTP must be a string of exactly 6 digits"),
});
