import { Router } from "express";
const userRouter = new Router();

import {
  registration,
  login,
  logout,
  refresh,
  activate,
  getUsers,
} from "../controllers/user.controller.js";

userRouter.post("/registration", registration);
userRouter.post("/login", login);
userRouter.post("/logout", logout);
userRouter.get("/activate/:link", activate);
userRouter.get("/refresh", refresh);
userRouter.get("/users", getUsers);

export default userRouter;
