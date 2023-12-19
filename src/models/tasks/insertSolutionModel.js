import getPool from "../../database/getPool.js";
import { solutionAlredyExistError } from "../../service/errorService.js";

const insertSolutionModel = async (descriprion, photoName, taskId, userId) => {
  const pool = await getPool();

  const [solution] = await pool.query(
    `
               SELECT id FROM solutions
               WHERE user_id = ? AND task_id = ?
        `,
    [userId, taskId]
  );

  if (solution.length) solutionAlredyExistError();

  await pool.query(
    `
            INSERT INTO solutions (description, file_path, task_id, user_id)
            VALUES (?,?,?,?)
        `,
    [descriprion, photoName, taskId, userId]
  );
};

export default insertSolutionModel;
