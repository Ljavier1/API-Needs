import getPool from "../../database/getPool.js";

const selectAllCommentsByIdModel = async (taskId) => {
  const pool = await getPool();

  const [comments] = await pool.query(
    `
            SELECT c.id, c.content, c.created_at, u.name AS user_name
            FROM comments c
            LEFT JOIN users u ON u.id = c.user_id
            WHERE c.task_id = ?
            ORDER BY c.created_at DESC
        `,
    [taskId]
  );

  return comments;
};

export default selectAllCommentsByIdModel;