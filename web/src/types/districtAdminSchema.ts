import { z } from "zod";

export const loginSchema = z.object({
  number: z.string().regex(/^[6-9]\d{9}$/, "Provide a valid mobile number"),
  password: z.string().min(1, "The password should not be empty"),
});

export const emailSchema = z.object({
  email: z.string().email("Provide a valid enmail"),
});

export const passwordSchema = z.object({
  password: z
    .string()
    .regex(
      /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
      "Password must contain at least one letter, one digit, and be at least 8 characters long."
    ),
});

export type loginType = z.infer<typeof loginSchema>;
export type emailType = z.infer<typeof emailSchema>;
export type passwordType = z.infer<typeof passwordSchema>;
