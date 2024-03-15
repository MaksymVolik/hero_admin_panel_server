import { Router } from "express";
const userRouter = new Router();
import { body } from "express-validator";

import {
  registration,
  login,
  logout,
  refresh,
  activate,
  getUsers,
  getMe,
  resendEmail,
} from "../controllers/user.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";

userRouter.post(
  "/registration",
  body("username").isLength({ min: 3, max: 50 }),
  body("email").isEmail(),
  body("password").isLength({ min: 3, max: 32 }),
  registration
);
userRouter.post("/login", login);
userRouter.post("/logout", authMiddleware, logout);
userRouter.get("/activate/:link", activate);
userRouter.get("/refresh", refresh);
userRouter.get("/users", authMiddleware, getUsers);
userRouter.get("/me", authMiddleware, getMe);
userRouter.post("/resendemail", authMiddleware, resendEmail);

export default userRouter;
