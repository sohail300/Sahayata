"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminEditSchema = exports.WorkerSchema = exports.registerAdminSchema = void 0;
const zod_1 = require("zod");
exports.registerAdminSchema = zod_1.z.object({
    name: zod_1.z
        .string()
        .min(1, "Name cannot be empty")
        .max(100, "Max 100 characters"),
    number: zod_1.z
        .string()
        .regex(/^[6-9]\d{9}$/, "Provide a valid Indian mobile number"),
    password: zod_1.z
        .string()
        .regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, "Password must contain at least one letter, one digit, and be at least 8 characters long."),
    latitude: zod_1.z.string().regex(/^[0-9]+$/, "Provide a valid input"),
    longitude: zod_1.z.string().regex(/^[0-9]+$/, "Provide a valid input"),
});
exports.WorkerSchema = zod_1.z.object({
    profession: zod_1.z.string({
        message: "Provide valid input",
    }),
    quantity: zod_1.z.number().int().positive("Provide valid input"),
});
exports.adminEditSchema = zod_1.z.object({
    worker: zod_1.z.array(exports.WorkerSchema),
    available: zod_1.z.boolean({
        message: "Provide valid input",
    }),
});
