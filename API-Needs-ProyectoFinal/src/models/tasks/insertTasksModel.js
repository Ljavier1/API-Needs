import getPool from "../../database/getPool.js";

const insertTasksModel = async (title, description, file_path, user_id) => {
  const pool = await getPool();

  const [result] = await pool.query(
    `
            INSERT INTO tasks (title, description, file_path, user_id)
            VALUES (?,?,?,?)
        `,
    [title, description, file_path, user_id]
  );

  const { insertId } = result;

  return insertId;
};

export default insertTasksModel;
