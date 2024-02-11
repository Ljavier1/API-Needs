import selectUserById from "../../models/users/selectUserById.js";

const getUserById = async (req, res, next) => {
  try {
    const { userId } = req.params;

    const user = await selectUserById(userId);

    res.send({
      status: "ok",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

export default getUserById;
