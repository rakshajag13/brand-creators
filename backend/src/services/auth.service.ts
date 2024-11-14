import { PrismaClient, User, UserRole } from "@prisma/client";
import { comparePasswords, hashPassword } from "../utils/password";
import { generateToken } from "../utils/jwt";
//import { registerSchema } from '../validators/auth.validator';

const prisma = new PrismaClient();

interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone?: string;
  role: UserRole;
}

interface LoginData {
  email: string;
  password: string;
}

interface AuthResponse {
  user: Omit<User, "password">;
  token?: string;
}

async function register(data: RegisterData): Promise<AuthResponse> {
  const existingUser = await prisma.user.findUnique({
    where: { email: data.email },
  });

  if (existingUser) {
    throw new Error("Email already registered");
  }

  const isPassword = await hashPassword(data.password);

  const user = await prisma.user.create({
    data: {
      ...data,
      password: isPassword,
    },
  });

  const { password, ...userWithoutPassword } = user;
  // const token=generateToken(user);

  // If role is CLIENT, create a client record
  if (data.role === "CLIENT") {
    await prisma.client.create({
      data: {
        companyName: "",
        industry: "",
        businessType: "",
        users: { connect: { id: user.id } },
      },
    });
  }

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
}

async function login(data: LoginData): Promise<AuthResponse> {
  const user = await prisma.user.findUnique({
    where: { email: data.email },
  });

  if (!user) {
    throw new Error("Invalid Credientials");
  }

  const isPasswordValid = await comparePasswords(data.password, user.password);

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
}

// Export functions
export const authService = {
  register,
  login,
};
