import { z } from "zod";

export const registerSchema = z.object({
  body: z.object({
    email: z.string().email("Invalid email format"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    firstName: z.string().min(2, "First name must be at least 2 characters"),
    lastName: z.string().min(2, "Last name must be at least 2 characters"),
    phone: z.string().optional(),
    role: z.enum(["ADMIN", "CLIENT", "CREATOR"]),
    // avatar:z.string().optional(),
    // bio:z.string().optional()
  }),
});

export const brandSignupSchema = z.object({
  body: z.object({
    email: z.string().email("Invalid email format"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    companyName: z
      .string()
      .min(2, "Company name must be at least 2 characters"),
    industry: z.string(),
    website: z.string(),
    businessType: z.string(),
    phone: z.string().optional(),
    domain: z.string(),
  }),
});

export const loginSchema = z.object({
  body: z.object({
    email: z.string().email("Invalid email format"),
    password: z.string(),
  }),
});

export const forgotPasswordSchema = z.object({
  body: z.object({
    email: z.string().email("Invalid email format"),
  }),
});

export const resetPasswordSchema = z.object({
  body: z.object({
    newPassword: z.string().min(8, "Password must be at least 8 characters"),
  }),
  query: z.object({
    token: z.string(),
  }),
});

export enum Expiry {
  ONE_HOUR = "1h",
  ONE_DAY = "24h",
}
