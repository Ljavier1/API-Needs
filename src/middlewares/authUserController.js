import jwt from "jsonwebtoken";
import {
  invalidCredentialsError,
  notAuthorizationError,
} from "../service/errorService.js";

const authUserController = (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) {
      notAuthorizationError();
    }
    let tokenInfo;
    try {
      tokenInfo = jwt.verify(authorization, process.env.SECRET);
    } catch (error) {
      invalidCredentialsError();
      next(error);
    }
    req.user = tokenInfo;

    next();
  } catch (error) {
    next(error);
  }
};

export default authUserController;
