import { ApiError } from "../exceptions/api.error.js";
import { validateAccessToken } from "../service/token.service.js";
import { getUserById } from "../service/user.service.js";

export default async (req, res, next) => {
  try {
    const authorizationHeader = req.headers.authorization;
    if (
      !authorizationHeader ||
      req.headers.authorization?.indexOf("Bearer") === -1
    ) {
      return next(ApiError.UnauthorizedError());
    }

    const accessToken = authorizationHeader.split(" ")[1];
    if (!accessToken) {
      return next(ApiError.UnauthorizedError());
    }

    const userData = validateAccessToken(accessToken);
    if (!userData) {
      return next(ApiError.UnauthorizedError());
    }

    const user = await getUserById(userData.user_id);
    if (!user) {
      return next(ApiError.UnauthorizedError());
    }

    req.user = user;
    next();
  } catch (e) {
    return next(ApiError.UnauthorizedError());
  }
};
