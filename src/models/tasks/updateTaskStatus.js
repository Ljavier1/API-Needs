import getPool from "../../database/getPool.js";

const updateTaskStatus = async (completed, userId) => {
  const pool = await getPool();

  await pool.query(
    `
            UPDATE tasks
            SET completed = ?
            WHERE id = ?
        `,
    [completed, userId]
  );
};

export default updateTaskStatus;
