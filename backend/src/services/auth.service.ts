import { ClientUser, PrismaClient, UserRole } from "@prisma/client";
import { hashPassword } from "../utils/password";
import { generateToken } from "../utils/jwt";
import { Expiry } from "../validators/auth.validator";
import { sendPasswordResetEmail } from "../utils/sendEmail";
import {
  createUser,
  createUserByCreatorRole,
  getFirstUserMatchByFilter,
  getUserByEmail,
  updateUser,
  getUserById,
} from "../repositories/userRepository";
import {
  RegisterDTO,
  ForgotPasswordDTO,
  ResetPasswordDTO,
  type RegisterData,
  type BrandSignupData,
  type ForgotPasswordData,
  type ResetPasswordData,
  type AuthResponse,
} from "../dtos/auth.dto";
import passport from "passport";
import { NextFunction, Request, Response } from "express";

const prisma = new PrismaClient();

async function register(data: RegisterData): Promise<AuthResponse> {
  // First validate the data
  RegisterDTO.parse(data);

  try {
    const existingUser = await getUserByEmail(data.email);
    if (existingUser) {
      throw new Error("Email already registered");
    }

    const hashedPass = await hashPassword(data.password);
    const user = await createUser({
      ...data,
      password: hashedPass,
      resetToken: "",
    });

    const { password, ...userWithoutPassword } = user;
    // const token=generateToken(user);
    // If role is CREATOR, create a creator record
    if (data.role === "CREATOR") {
      await createUserByCreatorRole({
        userId: user.id,
        expertise: [],
      });
    }

    return { user: userWithoutPassword };
  } catch (error) {
    throw error;
  }
}

async function brandSignup(
  data: BrandSignupData
): Promise<{ clientId: number }> {
  // First validate the data

  try {
    const existingUser = await getUserByEmail(data.email);
    if (existingUser) {
      throw new Error("Email already registered");
    }

    const hashedPass = await hashPassword(data.password);

    const user: RegisterData = {
      email: data.email,
      password: hashedPass,
      firstName: data.companyName,
      lastName: data.companyName,
      phone: data.phone,
      role: UserRole.ADMIN,
    };
    return prisma.$transaction(async (tx) => {
      const registerdUser = await tx.user.create({
        data: {
          ...user,
          password: hashedPass,
          resetToken: "",
        },
      });
      const client = await tx.client.create({
        data: {
          companyName: data.companyName,
          industry: data.industry,
          businessType: data.businessType,
          website: data.website,
        },
      });

      await tx.clientUser.create({
        data: {
          user: { connect: { id: registerdUser.id } },
          client: { connect: { id: client.id } },
          role: UserRole.CLIENT,
          status: "ACTIVE",
        },
      });

      const existingDomain = await tx.clientDomain.findUnique({
        where: { domain: data.domain },
      });

      if (existingDomain) {
        throw new Error(`Domain ${data.domain} already exists.`);
      }
      await tx.clientDomain.create({
        data: {
          domain: data.domain,
          client: { connect: { id: client.id } },
        },
      });

      return { clientId: client.id };
    });
  } catch (error) {
    throw error;
  }
}

async function forgotPassword(data: ForgotPasswordData): Promise<void> {
  // First validate the data
  ForgotPasswordDTO.parse(data);

  const user = await getUserByEmail(data.email);
  if (!user) {
    throw new Error("Invalid Credientials");
  }
  const clientUser = await getUserById(user.id);

  if (!user || !clientUser) {
    throw new Error("Invalid Credientials");
  }

  // Update user with reset token
  const resetToken = generateToken(clientUser, Expiry.ONE_HOUR);

  await updateUser(user.id, { resetToken, updatedAt: new Date() });

  const resetLink = `http://localhost:3000/reset-password/${resetToken}`;

  await sendPasswordResetEmail(data.email, resetLink);
}

async function resetPassword(data: ResetPasswordData): Promise<void> {
  // First validate the data
  ResetPasswordDTO.parse(data);

  const user = await getFirstUserMatchByFilter(data.token);

  if (!user) {
    throw new Error("Invalid or expired reset token'");
  }

  const hashedPassword = await hashPassword(data.newPassword);

  await updateUser(user.id, { password: hashedPassword, resetToken: "" });
}
async function validateResetToken(token: string): Promise<boolean> {
  const user = await getFirstUserMatchByFilter(token);
  return !!user;
}
async function login(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  passport.authenticate(
    "login",
    async (err: any, user: ClientUser, info: any) => {
      try {
        if (err) {
          return next(err);
        }
        if (!user) {
          return res.status(401).json({ message: info.message });
        }
        req.user = user;
        res.json(info);
        // req.logIn(user, async (loginErr: Error | null) => {
        //   if (loginErr) {
        //     return next(loginErr);
        //   }

        //   // Explicitly set req.user

        // });
      } catch (error) {
        next(error);
      }
    }
  )(req, res, next);
}

// Export functions
export const authService = {
  register,
  brandSignup,
  forgotPassword,
  resetPassword,
  login,
  validateResetToken,
};
