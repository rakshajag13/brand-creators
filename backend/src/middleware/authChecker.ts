import { verifyToken } from "../utils/jwt";
export const tokenBasedAuth = (token: string) => {
  try {
    console.log("Token received for verification:", token);
    const decoded = verifyToken(token);
    return decoded;
  } catch (error) {
    console.error("Token verification failed:", error);
    return null;
  }
};
