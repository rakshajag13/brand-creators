import { Request, Response } from "express";
import { authService } from "../services/auth.service";

export async function register(req: Request, res: Response) {
  try {
    const { user, token } = await authService.register(req.body);
    res.status(201).json({ user, token });
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Internal server error" });
    }
  }
}

export async function login(req: Request, res: Response) {
  try {
    const { user, token } = await authService.login(req.body);
    res.status(200).json({ user, token });
  } catch (error) {
    if (error instanceof Error) {
      res.status(401).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Internal server error" });
    }
  }
}

export async function forgotPassword(req: Request, res: Response) {
  try {
    const { email } = req.body;
    await authService.forgotPassword({ email });
    res
      .status(200)
      .json({ message: "Password reset instructions sent to your email" });
  } catch (error) {
    console.error("Forgot password error:", error);
    if (error.message === "User not found") {
      res.status(404).json({ message: "User not found" });
    }

    res.status(500).json({
      message: "Server error occurred",
      error: error.message,
    });
  }
}

export async function resetPassword(req: Request, res: Response) {
  try {
    const { token } = req.query;
    const { newPassword } = req.body;

    const isValidToken = authService.validateResetToken(token as string);
    if (!isValidToken) {
      res.status(400).json({
        message: "Invalid or expired reset token",
      });
    }

    await authService.resetPassword({
      newPassword,
      token: token as string,
    });
    res.status(200).json({
      message: "Password reset successfully",
    });
  } catch (error) {
    console.error("Reset password error:", error);

    res.status(500).json({
      message: "Server error occurred",
      error: error.message,
    });
  }
}

export const authController = {
  register,
  login,
  forgotPassword,
  resetPassword,
};
