import newTaskController from "./newTaskController.js";
import listTasksController from "./listTasksController.js";
import solutionsEntryController from "./solutionsEntryController.js";
import getTaskController from "./getTaskController.js";
import commentsTaskController from "./commentsTaskController.js";
import editStatusTaskController from "./editStatusTasksController.js";

import selectCompletedTasksModel from "./models/tasks/selectCompletedTasksModel.js";
import selectUncompletedTasksModel from "./models/tasks/selectUncompletedTasksModel.js";
import searchTasksModel from "./models/tasks/searchTasksModel.js";
import searchTasksController from "./controllers/tasks/searchTasksController.js"; // Opcional si implementas la búsqueda

export {
  newTaskController,
  listTasksController,
  solutionsEntryController,
  getTaskController,
  commentsTaskController,
  editStatusTaskController,
  searchTasksController,
  searchTasksModel,
  selectUncompletedTasksModel,
  selectCompletedTasksModel
};

