import bcrypt from "bcrypt";
import getPool from "../../database/getPool.js";
import {
  userAlreadyRegistratedError,
  emailAlreadyRegistratedError,
} from "../../service/errorService.js";

const insertUserModel = async (name, email, password, bio, photo) => {
  const pool = await getPool();

  let [user] = await pool.query(
    `
        SELECT id FROM users WHERE name = ?
    `,
    [name]
  );
  if (user.lenght) {
    userAlreadyRegistratedError();
  }
  [user] = await pool.query(
    `
        SELECT id FROM users WHERE email = ?
    `,
    [email]
  );
  if (user.lenght) {
    emailAlreadyRegistratedError();
  }

  [user] = await pool.query(
    `
      SELECT id FROM users WHERE bio = ?
    `,
    [bio]
  );

  [user] = await pool.query(
    `
      SELECT id FROM users WHERE photo = ?
    `,
    [photo]
  );
  const hashedPassword = await bcrypt.hash(password, 10);
  await pool.query(
    `
        INSERT INTO users (name, email, password, bio, photo)
        VALUES (?,?,?,?,?)
    `,
    [name, email, hashedPassword, bio, photo]
  );
};

export default insertUserModel;
