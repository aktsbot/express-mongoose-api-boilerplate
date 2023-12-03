import { Router } from "express";

import { validate } from "../middlewares/validate.middleware.js";

import { loginUser } from "../controllers/auth.controller.js";

import { loginUserSchema } from "../validations/schemas/auth.schema.js";

const router = Router();

router.post("/login", validate(loginUserSchema), loginUser);

export default router;
