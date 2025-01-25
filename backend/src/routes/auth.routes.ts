import { Router } from "express";
import * as AuthController from "../controllers/auth.controller";

const router = Router();

router.post("/register", AuthController.register);
router.post("/login", AuthController.login);
router.post("/brand-signup", AuthController.brandSignup);
router.post("/forgot-password", AuthController.forgotPassword);
router.post("/reset-password", AuthController.resetPassword);
// router.get("/validate-reset-token/:token", AuthController.validateResetToken);

export default router;
