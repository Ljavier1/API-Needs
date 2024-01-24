import selectTaskByIdModel from "../../models/tasks/selectTaskByIdModel.js";
import insertCommentModel from "../../models/tasks/insertCommentModel.js";
import selectAllCommentsByIdModel from "../../models/tasks/selectAllCommentsByIdModel.js";


const commentsTaskController = async (req, res, next) => {
  try {
    const { taskId } = req.params;
    const { content } = req.body;
    const task = await selectTaskByIdModel(taskId);
    const userId = req.user.id;
    const solution = await insertCommentModel(content, taskId, req.user.id);

    // Todos los comentarios
    const comments = await selectAllCommentsByIdModel(taskId);

    // Nuevos comentarios
    const newComments = comments.filter(comment => comment.createdAt > solution.createdAt);

    res.send({
      status: "ok",
      data: {
        task,
        newComments,
      },
    });
  } catch (error) {
    next(error);
  }
};

export default commentsTaskController;

