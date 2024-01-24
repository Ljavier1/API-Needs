import selectTaskByIdModel from "../../models/tasks/selectTaskByIdModel.js";

const getTaskController = async (req, res, next) => {
  try {
    const { taskId } = req.params;

    const task = await selectTaskByIdModel(taskId);

    res.send({
      status: "ok",
      data: task,
    });
  } catch (error) {
    next(error);
  }
};

export default getTaskController;
