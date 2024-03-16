import { ApiError } from "../exceptions/api.error.js";

export default (req, res, next) => {
  try {
    const user = req.user;
    if (!user) {
      return next(ApiError.UnauthorizedError());
    }

    next();
  } catch (e) {
    next(e);
  }
};
