import joi from "joi";

// the .unknown allows us to proceed if we dont have query or params
// defined in the schema
export const createUserSchema = joi
  .object()
  .keys({
    body: joi.object().keys({
      email: joi.string().email().required(),
      password: joi.string().required(),
      fullName: joi.string().required(),
    }),
  })
  .unknown(true);
