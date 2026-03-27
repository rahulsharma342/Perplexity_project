import express from "express";
import { register, login ,verifyEmail ,getMe} from "../controllers/auth.controller.js";
import {
  registerValidator,
  loginValidator,
} from "../validator/auth.validator.js";

import { authMiddleware } from "../middleware/auth.middleware.js";

const authRouter = express.Router();

authRouter.post("/register", registerValidator, register);

authRouter.get("/verify-email", verifyEmail);

authRouter.post("/login", loginValidator, login);

authRouter.get("/get-me",authMiddleware, getMe);

export default authRouter;
