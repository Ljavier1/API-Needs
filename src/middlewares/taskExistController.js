import getPool from "../database/getPool.js";
import { notFoundError } from "../service/errorService.js";

const taskExistController = async (req, res, next) => {
  try {
    const pool = await getPool();

    const { taskId } = req.params;

    const [task] = await pool.query(
      `
          SELECT id FROM tasks WHERE id = ${taskId}
      `
    );

    if (task.length < 1) notFoundError("entrada");

    next();
  } catch (error) {
    next(error);
  }
};

export default taskExistController;
