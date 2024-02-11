import bcrypt from "bcrypt";
import getPool from "../../database/getPool.js";
import {
  userAlReadyRegistratedError,
  emailAlReadyRegistratedError,
} from "../../service/errorService.js";

const insertUserModel = async (name, email, password, bio) => {
  const pool = await getPool();

  let [user] = await pool.query(
    `
        SELECT id FROM users WHERE name = ?
    `,
    [name]
  );
  if (user.lenght) {
    userAlReadyRegistratedError();
  }
  [user] = await pool.query(
    `
        SELECT id FROM users WHERE email = ?
    `,
    [email]
  );
  if (user.lenght) {
    emailAlReadyRegistratedError();
  }

  [user] = await pool.query(
    `
      SELECT id FROM users WHERE bio = ?
    `,
    [bio]
  );

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
