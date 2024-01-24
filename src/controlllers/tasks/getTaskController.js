import selectTaskByIdModel from "../../models/tasks/selectTaskByIdModel.js";
import selectAllCommentsByIdModel from "../../models/tasks/selectAllCommentsByIdModel.js";

const getTaskController = async (req, res, next) => {
  try {
    const { taskId } = req.params;

    const task = await selectTaskByIdModel(taskId);

    // Número de comentarios
    const commentsCount = await selectAllCommentsByIdModel(taskId);

    // Comprueba si la tarea está resuelta
    const isResolved = task.completed || task.hasSolution;

    // Actualiza la tarea
    task.commentsCount = commentsCount.length;
    task.isResolved = isResolved;

    res.send({
      status: "ok",
      data: task,
    });
  } catch (error) {
    next(error);
  }
};

export default getTaskController;
