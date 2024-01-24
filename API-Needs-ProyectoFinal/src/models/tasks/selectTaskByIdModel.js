import getPool from "../../database/getPool.js";

const selectTaskByIdModel = async (taskId) => {
  const pool = await getPool();

  const [task] = await pool.query(
    `
                SELECT t.id, t.title, t.description, u.name, t.user_id, t.file_path, t.created_at
                FROM tasks t
                LEFT JOIN comments c ON c.task_id = t.id
                INNER JOIN users u ON u.id = t.user_id
                WHERE t.id = ${taskId}
                GROUP BY t.id
                ORDER BY t.created_at DESC
            `
  );
  return task[0];
};

export default selectTaskByIdModel;
