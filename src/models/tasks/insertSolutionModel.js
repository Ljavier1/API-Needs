import getPool from "../../database/getPool.js";
import { solutionAlreadyExistError } from "../../service/errorService.js";

const insertSolutionModel = async (description, photoName, taskId, userId) => {
  const pool = await getPool();

  const [solution] = await pool.query(
    `
               SELECT id FROM solutions
               WHERE user_id = ? AND task_id = ?
        `,
    [userId, taskId]
  );

  if (solution.length > 5) solutionAlreadyExistError();

  await pool.query(
    `
            INSERT INTO solutions (description, file_path, task_id, user_id)
            VALUES (?,?,?,?)
        `,
    [description, photoName, taskId, userId]
  );
};

export default insertSolutionModel;
