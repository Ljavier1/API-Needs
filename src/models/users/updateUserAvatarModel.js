import getPool from "../../database/getPool.js";

const updateUserAvatarModel = async (avatarName, userId) => {
  const pool = await getPool();

  await pool.query(
    `
            UPDATE users
            SET photo = ?
            WHERE id = ?
        `,
    [avatarName, userId]
  );
};

export default updateUserAvatarModel;
