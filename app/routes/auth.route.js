import { Router } from "express";

import { validate } from "../middlewares/validate.middleware.js";

import { loginUser, signupUser } from "../controllers/auth.controller.js";

import {
  loginUserSchema,
  signupUserSchema,
} from "../validations/schemas/auth.schema.js";

const router = Router();

router.post("/signup", validate(signupUserSchema), signupUser);
router.post("/login", validate(loginUserSchema), loginUser);

export default router;
