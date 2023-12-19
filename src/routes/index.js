import express from "express";
import userRouter from "./userRouter.js";
import tasksRouter from "./tasksRouter.js";

const router = express.Router();

router.use(userRouter, tasksRouter);

export default router;
