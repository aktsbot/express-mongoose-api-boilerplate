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

// the .unknown allows us to proceed if we dont have query or params
// defined in the schema
export const signupUserSchema = joi
  .object()
  .keys({
    body: joi.object().keys({
      email: joi.string().email().required(),
      password: joi.string().required(),
      fullName: joi.string().required(),
    }),
  })
  .unknown(true);

export const makeNewTokensSchema = joi
  .object()
  .keys({
    body: joi.object().keys({
      refreshToken: joi.string().required(),
    }),
  })
  .unknown(true);
