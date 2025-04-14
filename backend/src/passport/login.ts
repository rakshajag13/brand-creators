import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { comparePasswords } from "../utils/password";

import {
  createSession,
  getUserByEmail,
  getUserById,
} from "../repositories/userRepository";
import { generateToken } from "../utils/jwt";

// Configure Passport Local Strategy

const localLoginStategy = new LocalStrategy(
  {
    usernameField: "email",
    passwordField: "password",
    passReqToCallback: true,
  },
  async (_, email, password, done) => {
    try {
      const user = await getUserByEmail(email);
      if (!user) {
        return done(null, false, { message: "Invalid credentials" });
      }

      const isPasswordValid = await comparePasswords(password, user.password);

      if (!isPasswordValid) {
        return done(null, false, { message: "Invalid credentials" });
      }

      const { password: _, ...userWithoutPassword } = user;
      // Create a session in the database
      const token = generateToken(user);
      await createSession({
        userId: user.id,
        token,
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours
      });

      return done(null, userWithoutPassword);
    } catch (error) {
      console.log(error);
      return done(error);
    }
  }
);

// Serialize and Deserialize User
passport.serializeUser((user: any, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id: string | number, done) => {
  try {
    const user = await getUserById(Number(id)); // Ensure id is converted to a number if necessary
    console.log("User found during deserialization:", user);
    if (!user) {
      console.error("User not found during deserialization");
      return done(null, false); // Return false to indicate no user found
    }
    const { ...userWithoutPassword } = user;
    done(null, userWithoutPassword); // This will be assigned to req.user
  } catch (error) {
    console.error("Error during deserialization:", error);
    done(error);
  }
});

export default localLoginStategy;
