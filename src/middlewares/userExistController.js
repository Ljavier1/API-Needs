import getPool from "../database/getPool.js";
import { notFoundError } from "../service/errorService.js";

const userExistController = async (req, res, next) => {
  try {
    const pool = await getPool();

    const { userId } = req.params;

    const [user] = await pool.query(
      `
          SELECT id FROM users WHERE id = ${userId}
      `
    );

    if (user.length < 1) notFoundError("entrada");

    next();
  } catch (error) {
    next(error);
  }
};

export default userExistController;
