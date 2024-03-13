import getPool from "./getPool.js";
import dotenv from "dotenv";
import fs from 'fs/promises';
import path from 'path';

dotenv.config();

const initDB = async () => {

  let pool;

  try {
     pool = await getPool();

     const uploadsDir = path.join(process.cwd(), process.env.UPLOADS_DIR);
    const uploadedFiles = await fs.readdir(uploadsDir);

    const [users] = await pool.query('SELECT photo FROM users');
    const dbFiles = users.map(user => user.photo);

    const filesToDelete = uploadedFiles.filter(file => !dbFiles.includes(file));
    await Promise.all(filesToDelete.map(file => fs.unlink(path.join(uploadsDir, file))));

    console.log('Borrado de archivos no referenciados completado.');

     await pool.query(
      'DROP TABLE IF EXISTS users, tasks, solutions, comments'
  );

  console.log('Creando tablas...');

    // Tabla de usuarios
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        bio TEXT,
        photo VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Tabla de tareas
    await pool.query(`
      CREATE TABLE IF NOT EXISTS tasks (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        file_path VARCHAR(255),
        user_id INT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        completed BOOLEAN DEFAULT false,
        FOREIGN KEY (user_id) REFERENCES users(id)
      )
    `);

    // Tabla de soluciones
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

    // Tabla de comentarios
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

    console.log("Tablas creadas.");

  } catch (error) {
    console.error("Error al iniciar base de datos:", error.message);
    process.exit(1);
  }

  finally {
    // Cerramos el proceso.
    process.exit(0);
}
};

initDB();

export default initDB;
