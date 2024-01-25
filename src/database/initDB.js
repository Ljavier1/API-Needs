import getPool from "./getPool.js";
import dotenv from "dotenv";

dotenv.config();

const initDB = async () => {
  try {
    let pool = await getPool();

    await pool.query(`USE api_needs`);

    /* CREACION DE TABLAS
    Utilizamos pool.query en vez de connection.query ya que el pool
    está enfocado a la gestión simultánea de muchas solicitudes y es
    el volumen de trabajo para el que deberíamos preparar nuestra app.
    */
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(50) NOT NULL,
        email VARCHAR(50) NOT NULL UNIQUE,
        password VARCHAR(50) NOT NULL,
        bio TEXT,
        photo VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS tasks (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(50) NOT NULL,
        description TEXT VARCHAR (500),
        file_path VARCHAR(255),
        user_id INT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        completed BOOLEAN DEFAULT false,
        FOREIGN KEY (user_id) REFERENCES users(id)
      )
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS solutions (
        id INT AUTO_INCREMENT PRIMARY KEY,
        description TEXT,
        file_path VARCHAR(255),
        task_id INT,
        user_id INT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (task_id) REFERENCES tasks(id),
        FOREIGN KEY (user_id) REFERENCES users(id)
      )
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS comments (
        id INT AUTO_INCREMENT PRIMARY KEY,
        content TEXT,
        task_id INT,
        user_id INT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (task_id) REFERENCES tasks(id),
        FOREIGN KEY (user_id) REFERENCES users(id)
      )
    `);

    // console.log("Tablas creadas.");

    // Cerrar la conexión
  } catch (error) {
    console.error("Error al iniciar base de datos:", error.message);
    process.exit(1);
  }
};

console.log("Base de datos creada");
initDB();
export default initDB;
