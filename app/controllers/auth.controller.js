import logger from "../logger.js";

import { makeToken } from "../jwt.js";

import User from "../models/user.model.js";
import Session from "../models/session.model.js";

export const loginUser = async (req, res, next) => {
  try {
    const errorMessage = "Invalid email or password";

    const { body } = req.xop;
    const userPresent = await User.findOne(
      { email: body.email },
      { _id: 1, password: 1, email: 1, fullName: 1 },
    );

    if (!userPresent) {
      return next({
        status: 401,
        message: errorMessage,
      });
    }

    const isPasswordValid = userPresent.isValidPassword(body.password);

    logger.debug(`password valid ${isPasswordValid}`);

    if (!isPasswordValid) {
      return next({
        status: 401,
        message: errorMessage,
      });
    }

    const session = await new Session({
      user: userPresent._id,
      isValid: true,
    }).save();

    // token - {session: 'uuid'}
    const tokenPayload = {
      session: session.uuid,
    };

    const accessToken = makeToken({
      payload: tokenPayload,
      type: "accessToken",
    });
    const refreshToken = makeToken({
      payload: tokenPayload,
      type: "refreshToken",
    });

    return res.json({
      accessToken,
      refreshToken,
    });
  } catch (error) {
    next(error);
  }
};
