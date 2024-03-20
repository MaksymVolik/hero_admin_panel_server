import {
  activateUser,
  regUser,
  loginUser,
  logoutUser,
  refreshUser,
  getAllUsers,
  resendEmailUser,
} from "../service/user.service.js";
import { validationResult } from "express-validator";
import { ApiError } from "../exceptions/api.error.js";

// Cookie options
const refreshTokenCookieOptions = {
  expires: new Date(
    Date.now() + process.env.REFRESH_TOKEN_EXPIRES_IN * 24 * 60 * 60 * 1000
  ),
  maxAge: process.env.REFRESH_TOKEN_EXPIRES_IN * 24 * 60 * 60 * 1000,
  httpOnly: true,
  sameSite: "none",
};

if (process.env.NODE_ENV === "production")
  refreshTokenCookieOptions.secure = true;

export const getMe = (req, res, next) => {
  try {
    const user = req.user;

    return res.status(200).json({
      status: "success",
      data: user,
    });
  } catch (e) {
    next(e);
  }
};

export async function registration(req, res, next) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(ApiError.BadRequest("Error in validation", errors.array()));
    }
    const { username, email, password } = req.body;
    const UserData = await regUser(username, email, password);
    res.cookie(
      "refreshToken",
      UserData.refreshToken,
      refreshTokenCookieOptions
    );
    return res.json(UserData);
  } catch (e) {
    next(e);
  }
}

export async function login(req, res, next) {
  try {
    const { email, password } = req.body;

    const UserData = await loginUser(email, password);

    res.cookie(
      "refreshToken",
      UserData.refreshToken,
      refreshTokenCookieOptions
    );

    return res.json(UserData);
  } catch (e) {
    next(e);
  }
}

export async function logout(req, res, next) {
  try {
    const { refreshToken } = req.cookies;
    const token = await logoutUser(refreshToken);
    res.clearCookie("refreshToken");
    return res.json(token);
  } catch (e) {
    next(e);
  }
}
export async function refresh(req, res, next) {
  try {
    const { refreshToken } = req.cookies;

    const UserData = await refreshUser(refreshToken);
    res.cookie(
      "refreshToken",
      UserData.refreshToken,
      refreshTokenCookieOptions
    );
    return res.json(UserData);
  } catch (e) {
    next(e);
  }
}
export async function activate(req, res, next) {
  try {
    const activationLink = req.params.link;
    await activateUser(activationLink);
    return res.redirect(process.env.CLIENT_URL);
  } catch (e) {
    next(e);
  }
}
export async function getUsers(req, res, next) {
  try {
    const users = await getAllUsers();
    return res.json(users);
  } catch (e) {
    next(e);
  }
}

export async function resendEmail(req, res, next) {
  try {
    const user = req.user;
    await resendEmailUser(user.user_id);

    return res.status(200).json({
      status: "success",
    });
  } catch (e) {
    next(e);
  }
}
