import express from "express";

const router = express.Router();

import {
  authUserController,
  taskExistController,
} from "../middlewares/index.js";
import {
  newTaskController,
  listTasksController,
  solutionEntryController,
  getTaskController,
  commentTaskController,
  editStatusTaskController,
} from "../controlllers/tasks/index.js";

router.post("/tasks", authUserController, newTaskController);
router.get("/tasks", listTasksController);
router.get("/tasks/:taskId", taskExistController, getTaskController);
router.post(
  "/tasks/:taskId/solutions",
  authUserController,
  taskExistController,
  solutionEntryController
);
router.post(
  "/tasks/:taskId/comments",
  authUserController,
  taskExistController,
  commentTaskController
);
router.post("/tasks/status", authUserController, editStatusTaskController);
export default router;
