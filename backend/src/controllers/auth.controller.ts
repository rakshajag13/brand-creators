import { Request, Response } from "express";
import { authService } from "../services/auth.service";
import { RegisterDTO } from "../dtos/auth.dto";

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const data = RegisterDTO.parse(req.body);
    const result = await authService.register(data);
    res.status(201).json(result);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Internal server error" });
    }
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const result = await authService.login(req.body);
    res.status(200).json(result);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Internal server error" });
    }
  }
};

export const brandSignup = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { clientId } = await authService.brandSignup(req.body);
    res.status(201).json({ clientId });
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Internal server error" });
    }
  }
};

export const forgotPassword = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { email } = req.body;
    await authService.forgotPassword({ email });
    res
      .status(200)
      .json({ message: "Password reset instructions sent to your email" });
  } catch (error) {
    console.error("Forgot password error:", error);
    if (error instanceof Error && error.message === "User not found") {
      res.status(404).json({ message: "User not found" });
    }

    res.status(500).json({
      message: "Server error occurred",
      error: error.message,
    });
  }
};

export const resetPassword = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { token } = req.query;
    const { newPassword } = req.body;

    const isValidToken = await authService.validateResetToken(token as string);
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
};

export const authController = {
  register,
  brandSignup,
  login,
  forgotPassword,
  resetPassword,
};
