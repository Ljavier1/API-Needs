import selectTaskByIdModel from "../../models/tasks/selectTaskByIdModel.js";
import insertCommentModel from "../../models/tasks/insertCommentModel.js";
const commentsTaskController = async (req, res, next) => {
  try {
    const { taskId } = req.params;
    const { content } = req.body;
    const task = await selectTaskByIdModel(taskId);
    const userId = req.user.id;
    const solutions = await insertCommentModel(content, taskId, req.user.id);

    res.send({
      status: "ok",
      data: {
        content,
        taskId,
        userId,
      },
    });
  } catch (error) {
    next(error);
  }
};

export default commentsTaskController;
