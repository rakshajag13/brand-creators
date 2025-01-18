import { PrismaClient, User, UserRole, UserStatus } from "@prisma/client";
import { comparePasswords, hashPassword } from "../utils/password";
import { generateToken } from "../utils/jwt";
import { Expiry } from "../validators/auth.validator";
import { sendPasswordResetEmail } from "../utils/sendEmail";

const prisma = new PrismaClient();

interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone?: string;
  role: UserRole;
}

interface BrandSignupData {
  email: string;
  password: string;
  companyName: string;
  industry: string;
  website: string;
  businessType: string;
  phone?: string;
  domain: string;
  status: UserStatus;
}

interface LoginData {
  email: string;
  password: string;
}

interface forgotPasswordData {
  email: string;
}

export interface resetPasswordData {
  newPassword: string;
  token: string;
}

interface AuthResponse {
  user: Omit<User, "password">;
  token?: string;
}

async function register(data: RegisterData): Promise<AuthResponse> {
  try {
    const existingUser = await prisma.user.findUnique({
      where: { email: data.email },
    });

    if (existingUser) {
      throw new Error("Email already registered");
    }

    const hashedPass = await hashPassword(data.password);
    const user = await prisma.user.create({
      data: {
        ...data,
        password: hashedPass,
        resetToken: "",
      },
    });

    const { password, ...userWithoutPassword } = user;
    // const token=generateToken(user);
    // If role is CREATOR, create a creator record
    if (data.role === "CREATOR") {
      await prisma.creator.create({
        data: {
          userId: user.id,
          expertise: [],
        },
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
  try {
    const existingUser = await prisma.user.findUnique({
      where: { email: data.email },
    });

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
          users: { connect: { id: registerdUser.id } },
        },
      });
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

async function login(data: LoginData): Promise<AuthResponse> {
  try {
    const user = await prisma.user.findUnique({
      where: { email: data.email },
    });

    if (!user) {
      throw new Error("Invalid Credientials");
    }

    const isPasswordValid = await comparePasswords(
      data.password,
      user.password
    );

    if (!isPasswordValid) {
      throw new Error("Invalid Crendentials");
    }

    const { password, ...userWithoutPassword } = user;
    const token = generateToken(user);

    await prisma.session.create({
      data: {
        userId: user.id,
        token,
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000), //24 hours
      },
    });
    return { user: userWithoutPassword, token };
  } catch (error) {
    throw error;
  }
}

async function forgotPassword(data: forgotPasswordData): Promise<void> {
  const user = await prisma.user.findUnique({
    where: { email: data.email },
  });

  if (!user) {
    throw new Error("Invalid Credientials");
  }

  // Update user with reset token
  const resetToken = generateToken(user, Expiry.ONE_HOUR);

  await prisma.user.update({
    where: { id: user.id },
    data: {
      resetToken,
      updatedAt: new Date(),
    },
  });

  const resetLink = `http://localhost:3000/reset-password/${resetToken}`;

  await sendPasswordResetEmail(data.email, resetLink);
}

async function resetPassword(data: resetPasswordData): Promise<void> {
  const user = await prisma.user.findFirst({
    where: { resetToken: data.token },
  });

  if (!user) {
    throw new Error("Invalid or expired reset token'");
  }

  const hashedPassword = await hashPassword(data.newPassword);

  await prisma.user.update({
    where: { id: user.id },
    data: {
      password: hashedPassword,
      resetToken: "",
    },
  });
}
async function validateResetToken(token: string): Promise<boolean> {
  console.log(token);
  const user = await prisma.user.findFirst({
    where: { resetToken: token },
  });
  console.log(user);
  return !!user;
}
// Export functions
export const authService = {
  register,
  brandSignup,
  login,
  forgotPassword,
  resetPassword,
  validateResetToken,
};
