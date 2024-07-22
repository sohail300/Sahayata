"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.emergencyCaseSchema = exports.contactSchema = void 0;
const zod_1 = require("zod");
exports.contactSchema = zod_1.z.object({
    name: zod_1.z
        .string()
        .min(1, "Name cannot be empty")
        .max(100, "Max 100 characters"),
    number: zod_1.z
        .string()
        .regex(/^[6-9]\d{9}$/, "Provide a valid Indian mobile number"),
    description: zod_1.z.string().min(1, "Provide valid input"),
    userId: zod_1.z.string().min(1, "Provide valid input"),
});
exports.emergencyCaseSchema = zod_1.z.object({
    cause: zod_1.z.string().min(1, "Name cannot be empty"),
    latitude: zod_1.z.number({
        message: "Provide valid input",
    }),
    longitude: zod_1.z.number({
        message: "Provide valid input",
    }),
});
