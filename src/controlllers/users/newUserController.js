import insertUserModel from "../../models/users/insertUserModel.js";
const newUserController = async (req, res, next) => {
  try {
    const { name, email, password, bio, photo } = req.body;
    // console.log("Received data:", { name, email, password, bio, photo });
    const user = await insertUserModel(name, email, password, bio, photo);

    user.createdAt = user.createdAt; // Devolver el timestamp de creación

    res.send({
      status: "OK",
      message: "Usuario registrado",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

export default newUserController;

