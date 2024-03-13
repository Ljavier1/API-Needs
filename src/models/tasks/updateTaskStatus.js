import getPool from "../../database/getPool.js";

const updateTaskStatus = async (taskId, completed) => {
  const pool = await getPool();

  await pool.query(
    `
      UPDATE tasks
      SET completed = ?
      WHERE id = ?
    `,
    [completed, taskId]
  );
};

export default updateTaskStatus;

