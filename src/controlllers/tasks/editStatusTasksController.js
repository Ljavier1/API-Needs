import selectTaskByIdModel from "../../models/tasks/selectTaskByIdModel.js";
import updateTaskStatus from "../../models/tasks/updateTaskStatus.js";

const editStatusTaskController = async (req, res, next) => {
  try {
    const { taskId } = req.params; // Get taskId from params
    const { completed } = req.body;

    const task = await selectTaskByIdModel(taskId);
    if (!task) {
      return res.status(404).send({ message: "Task not found" });
    }

    await updateTaskStatus(completed, taskId);

    res.send({
      status: "ok",
      message: "Updated task",
    });
  } catch (error) {
    next(error);
  }
};

export default editStatusTaskController;
