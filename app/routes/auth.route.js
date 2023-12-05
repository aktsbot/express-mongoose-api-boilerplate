import { Router } from "express";

import { validate } from "../middlewares/validate.middleware.js";
import { requireUser } from "../middlewares/auth.middleware.js";

import {
  loginUser,
  signupUser,
  getUserInfo,
  makeNewTokens,
  updatePassword,
  forgotPassword,
} from "../controllers/auth.controller.js";

import {
  loginUserSchema,
  signupUserSchema,
  makeNewTokensSchema,
  updatePasswordSchema,
  forgotPasswordSchema,
} from "../validations/schemas/auth.schema.js";

const router = Router();

router.post("/signup", validate(signupUserSchema), signupUser);
router.post("/login", validate(loginUserSchema), loginUser);
router.get("/user-info", requireUser, getUserInfo);
router.post("/token", validate(makeNewTokensSchema), makeNewTokens);
router.put(
  "/password",
  requireUser,
  validate(updatePasswordSchema),
  updatePassword,
);
router.post("/forgot-password", validate(forgotPasswordSchema), forgotPassword);

export default router;
