import getPool from "../../database/getPool.js";

const selectAllTasksModel = async () => {
  const pool = await getPool();

  const [tasks] = await pool.query(
    `
            SELECT t.id, t.title, t.description, u.name, t.file_path, t.created_at
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
