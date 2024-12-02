import { z } from "zod";

export const contactSchema = z.object({
  body: z.object({
    email: z.string().email("Invalid email format"),
    password: z.string().optional(),
    firstName: z.string().min(2, "First name must be at least 2 characters"),
    lastName: z.string().min(2, "Last name must be at least 2 characters"),
    phone: z.string().optional(),
    role: z.enum(["ADMIN", "CLIENT", "CREATOR"]),
    status: z.enum(["ACTIVE", "INACTIVE", "PENDING", "SUSPENDED"]).optional(),
  }),
});
