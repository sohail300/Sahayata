import { z } from "zod";

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

export type emergencyCaseType = z.infer<typeof emergencyCaseSchema>;
export type contactType = z.infer<typeof contactSchema>;
