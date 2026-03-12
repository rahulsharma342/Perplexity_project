import express from "express";
import { register, login ,verifyEmail} from "../controllers/auth.controller.js";
import {
  registerValidator,
  loginValidator,
} from "../validator/auth.validator.js";

const authRouter = express.Router();

authRouter.post("/register", registerValidator, register);

authRouter.get("/verify-email", verifyEmail);

authRouter.post("/login", loginValidator, login);

export default authRouter;
