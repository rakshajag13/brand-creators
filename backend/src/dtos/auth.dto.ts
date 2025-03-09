import { z } from "zod";
import { User, UserRole, UserStatus } from "@prisma/client";

// Base schemas for reuse
const emailSchema = z.string().email();
const passwordSchema = z.string().min(8).max(100);
const phoneSchema = z.string().optional();

// Register DTO
export const RegisterDTO = z.object({
  email: emailSchema,
  password: passwordSchema,
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  phone: phoneSchema,
  role: z.nativeEnum(UserRole),
});

// Brand Signup DTO
export const BrandSignupDTO = z.object({
  email: emailSchema,
  password: passwordSchema,
  companyName: z.string().min(1),
  industry: z.string().min(1),
  website: z.string().url(),
  businessType: z.string().min(1),
  phone: phoneSchema,
  domain: z.string().min(1),
  status: z.nativeEnum(UserStatus),
});

// Login DTO
export const LoginDTO = z.object({
  email: emailSchema,
  password: passwordSchema,
});

// Forgot Password DTO
export const ForgotPasswordDTO = z.object({
  email: emailSchema,
});

// Reset Password DTO
export const ResetPasswordDTO = z.object({
  newPassword: passwordSchema,
  token: z.string().min(1),
});

// Auth Response DTO (this one needs to remain as a type since it uses Omit)
export type AuthResponse = {
  user: Omit<User, "password">;
  token?: string;
};

// Export inferred types if needed
export type RegisterData = z.infer<typeof RegisterDTO>;
export type BrandSignupData = z.infer<typeof BrandSignupDTO>;
export type LoginData = z.infer<typeof LoginDTO>;
export type ForgotPasswordData = z.infer<typeof ForgotPasswordDTO>;
export type ResetPasswordData = z.infer<typeof ResetPasswordDTO>;
