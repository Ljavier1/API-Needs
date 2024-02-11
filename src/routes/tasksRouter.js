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

import validation from "../middlewares/joiValidation.js";
import {
  newTaskSchema,
  newSolutionSchema,
  newCommentSchema,
} from "../schemas/task/index.js";

router.post(
  "/tasks",
  validation(newTaskSchema),
  authUserController,
  newTaskController
);
router.get("/tasks", listTasksController);
router.get("/tasks/:taskId", taskExistController, getTaskController);
router.post(
  "/tasks/:taskId/solutions",
  validation(newSolutionSchema),
  authUserController,
  taskExistController,
  solutionsEntryController
);
router.post(
  "/tasks/:taskId/comments",
  validation(newCommentSchema),
  authUserController,
  taskExistController,
  commentsTaskController
);
router.post("/tasks/status", authUserController, editStatusTaskController);
export default router;
