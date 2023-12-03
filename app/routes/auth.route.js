import { Router } from "express";

import { validate } from "../middlewares/validate.middleware.js";
import { requireUser } from "../middlewares/auth.middleware.js";

import {
  loginUser,
  signupUser,
  getUserInfo,
  makeNewTokens,
} from "../controllers/auth.controller.js";

import {
  loginUserSchema,
  signupUserSchema,
  makeNewTokensSchema,
} from "../validations/schemas/auth.schema.js";

const router = Router();

router.post("/signup", validate(signupUserSchema), signupUser);
router.post("/login", validate(loginUserSchema), loginUser);
router.get("/user-info", requireUser, getUserInfo);
router.post("/token", validate(makeNewTokensSchema), makeNewTokens);

export default router;
