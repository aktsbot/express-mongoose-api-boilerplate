import joi from "joi";

export const loginUserSchema = joi
  .object()
  .keys({
    body: joi.object().keys({
      email: joi.string().email().required(),
      password: joi.string().required(),
    }),
  })
  .unknown(true);
