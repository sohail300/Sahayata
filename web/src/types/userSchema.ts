import { z } from "zod";

export const updateUserSchema = z.object({
  name: z
    .string()
    .min(1, "Name cannot be empty")
    .max(100, "Max 100 characters"),
});

export const sendOTPSchema = z.object({
  number: z
    .string()
    .regex(/^[6-9]\d{9}$/, "Provide a valid Indian mobile number"),
});

export const verifyOTPSchema = z.object({
  number: z
    .string()
    .regex(/^[6-9]\d{9}$/, "Provide a valid Indian mobile number"),
  otp: z.string().regex(/^\d{6}$/, "OTP must be a string of exactly 6 digits"),
});

export type sendOTPType = z.infer<typeof sendOTPSchema>;
export type senverifyOTPType = z.infer<typeof verifyOTPSchema>;
export type updateUserType = z.infer<typeof updateUserSchema>;
