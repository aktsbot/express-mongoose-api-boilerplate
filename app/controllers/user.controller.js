import logger from "../logger.js";

import User from "../models/user.model.js";

export const createUser = async (req, res, next) => {
  try {
    const { body } = req.xop;
    const userPresent = await User.findOne({ email: body.email }, { _id: 1 });

    if (userPresent) {
      return next({
        status: 409,
        message: `User with email ${body.email} already exists`,
      });
    }

    const user = await new User({ ...body }).save();

    return res.json({
      user: {
        uuid: user.uuid,
        email: user.email,
      },
    });
  } catch (error) {
    next(error);
  }
};
