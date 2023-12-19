import selectUserByEmail from "../../models/users/selectUserByEmail.js";
import updateTaskStatus from "../../models/tasks/updateTaskStatus.js";

const editStatusTaskController = async (req, res, next) => {
  try {
    const user = selectUserByEmail(req.user.id);
    const { completed } = req.body;
    await updateTaskStatus(completed, req.user.id);

    res.send({
      status: "ok",
      message: "Updated task",
    });
  } catch (error) {
    next(error);
  }
};

export default editStatusTaskController;
