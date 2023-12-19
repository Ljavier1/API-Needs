import getPool from "../../database/getPool.js";

const insertCommentModel = async (content, taskId, userId) => {
  const pool = await getPool();

  await pool.query(
    `
                INSERT INTO comments (content, task_id, user_id)
                VALUES (?,?,?)
            `,
    [content, taskId, userId]
  );
};

export default insertCommentModel;
