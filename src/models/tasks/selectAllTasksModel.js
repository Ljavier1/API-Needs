import getPool from "../../database/getPool.js";

const selectAllTasksModel = async () => {
  const pool = await getPool();

  const [tasks] = await pool.query(
    `
        SELECT t.id, t.title, t.description, u.name, t.file_path, t.created_at,
               COUNT(c.id) AS num_comments,
               CASE WHEN t.completed = true OR (SELECT COUNT(*) FROM solutions WHERE task_id = t.id) > 0 THEN true ELSE false END AS is_resolved
        FROM tasks t
        LEFT JOIN comments c ON c.task_id = t.id
        INNER JOIN users u ON u.id = t.user_id
        GROUP BY t.id
        ORDER BY t.created_at DESC
    `
    );

  return tasks;
};

export default selectAllTasksModel;
