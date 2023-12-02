import { Router } from "express";

import { validate } from "../middlewares/validate.middleware.js";

import { createUser } from "../controllers/user.controller.js";

import { createUserSchema } from "../validations/schemas/user.schema.js";

const router = Router();

router.post("/", validate(createUserSchema), createUser);

export default router;
