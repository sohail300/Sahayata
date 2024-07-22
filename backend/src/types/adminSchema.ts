import { z } from "zod";

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
  latitude: z.string().regex(/^[0-9]+$/, "Provide a valid input"),
  longitude: z.string().regex(/^[0-9]+$/, "Provide a valid input"),
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

export type adminEditType = z.infer<typeof adminEditSchema>;
export type WorkerType = z.infer<typeof WorkerSchema>;
export type registerAdminType = z.infer<typeof registerAdminSchema>;
