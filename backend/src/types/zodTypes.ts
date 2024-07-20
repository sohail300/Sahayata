import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Provide a valid email"),
  password: z.string().min(1, "The password should not be empty"),
});

export const registerAdminSchema = z.object({
  name: z
    .string()
    .min(1, "Name cannot be empty")
    .max(100, "Max 100 characters"),
  number: z
    .string()
    .regex(/^[6-9]\d{9}$/, "Provide a valid Indian mobile number"),
  password: z
    .string()
    .regex(
      /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
      "Password must contain at least one letter, one digit, and be at least 8 characters long."
    ),
  latitude: z.number({
    message: "Provide valid input",
  }),
  longitude: z.number({
    message: "Provide valid input",
  }),
});

export const WorkerSchema = z.object({
  profession: z.string({
    message: "Provide valid input",
  }),
  quantity: z.number().int().positive("Provide valid input"),
});

export const adminEditSchema = z.object({
  worker: z.array(WorkerSchema),
  available: z.boolean({
    message: "Provide valid input",
  }),
});

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

export const contactSchema = z.object({
  name: z
    .string()
    .min(1, "Name cannot be empty")
    .max(100, "Max 100 characters"),
  number: z
    .string()
    .regex(/^[6-9]\d{9}$/, "Provide a valid Indian mobile number"),
  description: z.string().min(1, "Provide valid input"),
  userId: z.string().min(1, "Provide valid input"),
});

export const emergencyCaseSchema = z.object({
  cause: z.string().min(1, "Name cannot be empty"),
  latitude: z.number({
    message: "Provide valid input",
  }),
  longitude: z.number({
    message: "Provide valid input",
  }),
});

export type loginType = z.infer<typeof loginSchema>;
export type adminEditType = z.infer<typeof adminEditSchema>;
export type WorkerType = z.infer<typeof WorkerSchema>;
export type registerAdminType = z.infer<typeof registerAdminSchema>;
export type sendOTPType = z.infer<typeof sendOTPSchema>;
export type senverifyOTPType = z.infer<typeof verifyOTPSchema>;
export type updateUserType = z.infer<typeof updateUserSchema>;
export type emergencyCaseType = z.infer<typeof emergencyCaseSchema>;
