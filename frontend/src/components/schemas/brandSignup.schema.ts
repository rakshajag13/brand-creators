import { z } from "zod";

export const brandSignupSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  companyName: z.string().min(2, "Company name must be at least 2 characters"),
  industry: z.string(),
  website: z.string(),
  businessType: z.string(),
  phone: z.string().optional(),
  domain: z.string(),
  status: z.enum(["ACTIVE", "INACTIVE", "PENDING", "SUSPENDED"]).optional(),
});
