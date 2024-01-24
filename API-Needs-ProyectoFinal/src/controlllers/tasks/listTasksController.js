import selectAllTasksModel from "../../models/tasks/selectAllTasksModel.js";

const listTasksController = async (req, res, next) => {
  try {
    const tasks = await selectAllTasksModel();

    res.send({
      data: tasks,
    });
  } catch (error) {
    next(error);
  }
};

export default listTasksController;
