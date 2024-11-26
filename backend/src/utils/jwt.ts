import jwt from "jsonwebtoken";
import { User } from "@prisma/client";
import { Expiry } from "../validators/auth.validator";

export const generateToken = (
  user: User,
  expiry: Expiry = Expiry.ONE_HOUR
): string => {
  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
      role: user.role,
    },
    process.env.JWT_SECRET!,
    {
      expiresIn: expiry,
    }
  );
  return token;
};
