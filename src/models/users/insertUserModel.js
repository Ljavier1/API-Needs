import bcrypt from "bcrypt";
import getPool from "../../database/getPool.js";
import {
  userAlReadyRegistratedError,
  emailAlReadyRegistratedError,
} from "../../service/errorService.js";

const insertUserModel = async (name, email, password, bio) => {
  const pool = await getPool();

  // Verificar si el usuario ya está registrado por nombre
  let [user] = await pool.query(
    `
        SELECT id FROM users WHERE name = ?
    `,
    [name]
  );
  if (user.length) {
    userAlReadyRegistratedError();
  }

  // Verificar si el usuario ya está registrado por correo electrónico
  [user] = await pool.query(
    `
        SELECT id FROM users WHERE email = ?
    `,
    [email]
  );
  if (user.length) {
    emailAlReadyRegistratedError();
  }

  // Hashear la contraseña antes de insertar el nuevo usuario en la base de datos
  const hashedPassword = await bcrypt.hash(password, 10);
  await pool.query(
    `
        INSERT INTO users (name, email, password, bio)
        VALUES (?,?,?,?)
    `,
    [name, email, hashedPassword, bio]
  );
};

export default insertUserModel;
