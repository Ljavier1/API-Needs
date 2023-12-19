import express from "express";

const router = express.Router();

import {
  authUserController,
  taskExistController,
} from "../middlewares/index.js";
import {
  newTaskController,
  listTasksController,
  solutionsEntryController,
  getTaskController,
  commentsTaskController,
  editStatusTaskController,
} from "../controlllers/tasks/index.js";

router.post("/tasks", authUserController, newTaskController);
router.get("/tasks", listTasksController);
router.get("/tasks/:taskId", taskExistController, getTaskController);
router.post(
  "/tasks/:taskId/solutions",
  authUserController,
  taskExistController,
  solutionsEntryController
);
router.post(
  "/tasks/:taskId/comments",
  authUserController,
  taskExistController,
  commentsTaskController
);
router.post("/tasks/status", authUserController, editStatusTaskController);
export default router;
