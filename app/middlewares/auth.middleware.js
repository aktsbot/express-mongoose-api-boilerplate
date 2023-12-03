import { verifyJWT } from "../jwt.js";
import logger from "../logger.js";
import Session from "../models/session.model.js";

export const deserializeUser = (req, res, next) => {
  const accessToken = (req.headers.authorization || "").replace(
    /^Bearer\s/,
    "",
  );

  if (!accessToken) {
    return next();
  }

  const decoded = verifyJWT({
    token: accessToken,
    tokenType: "accessTokenPublicKey",
  });

  if (decoded) {
    res.locals.session = decoded;
  }

  return next();
};

export const requireUser = async (req, res, next) => {
  logger.debug(res.locals);

  const session = res.locals.session;

  if (!session) {
    return next({
      status: 403,
      message: "Login required for accessing resource",
    });
  }

  try {
    const sessionInfo = await Session.findOne({
      uuid: session.session,
      isValid: true,
    })
      .populate("user", "email fullName uuid")
      .lean();

    if (!sessionInfo) {
      return next({
        status: 403,
        message: "Session has expired or is no longer valid",
      });
    }

    res.locals.user = sessionInfo.user;

    return next();
  } catch (error) {
    next(error);
  }
};