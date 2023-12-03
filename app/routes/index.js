import { Router } from "express";

import authRouter from "./auth.route.js";
import userRouter from "./user.route.js";

const appRouter = Router();

appRouter.use("/users", userRouter);
appRouter.use("/auth", authRouter);

export default appRouter;
