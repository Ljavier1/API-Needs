import getPool from "../../database/getPool.js";

const selectUserByEmail = async (email) => {
  const pool = await getPool();
  const [user] = await pool.query(
    `
            SELECT id, password
            FROM users
            WHERE email = ?
        `,
    [email]
  );
  return user[0];
};

export default selectUserByEmail;
