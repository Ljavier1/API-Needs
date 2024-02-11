import getPool from "../../database/getPool.js";

const selectUserById = async (id) => {
  const pool = await getPool();
  const [user] = await pool.query(
    `
            SELECT name, photo, bio, email
            FROM users
            WHERE id = ?
        `,
    [id]
  );
  return user[0];
};

export default selectUserById;
