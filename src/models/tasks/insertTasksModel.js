import getPool from "../../database/getPool.js";

const insertTasksModel = async (title, description, file_path, user_id) => {
  const pool = await getPool();

  const [result] = await pool.query(
    `
      INSERT INTO tasks (title, description, file_path, user_id, created_at)
      VALUES (?,?,?,?, NOW())   -- Utilizamos NOW() para obtener el timestamp actual en MySQL
    `,
    [title, description, file_path, user_id]
  );

  const { insertId } = result;

  // Renombramos photoId a taskId para hacerlo más claro
  return { taskId: insertId, photoId: insertId }; // Devolvemos el ID del task y el ID de la foto
};

export default insertTasksModel;
