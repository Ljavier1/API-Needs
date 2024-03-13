import selectAllTasksModel from "../../models/tasks/selectAllTasksModel.js";

const listTasksController = async (req, res, next) => {
  try {
    const tasks = await selectAllTasksModel();

    res.send({
      data: tasks.map(task => ({
        ...task,
        numComments: task.num_comments,
        isResolved: task.is_resolved,
      })),
    });
  } catch (error) {
    next(error);
  }
};

export default listTasksController;
