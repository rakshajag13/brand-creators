import jwt from "jsonwebtoken";
import { ClientUser } from "@prisma/client";
import { Expiry } from "../validators/auth.validator";

export const generateToken = (
  user: ClientUser,
  expiry: Expiry = Expiry.ONE_HOUR
): string => {
  const token = jwt.sign(
    {
      ...user,
    },
    process.env.JWT_SECRET!,
    {
      expiresIn: expiry,
    }
  );
  return token;
};
export const verifyToken = (token: string): ClientUser | null => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as ClientUser;
    console.log("Decoded token:", decoded);
    return decoded;
  } catch (error) {
    console.error("Token verification failed:", error);
    return null;
  }
};
