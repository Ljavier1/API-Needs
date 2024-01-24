import insertUserModel from "../../models/users/insertUserModel.js";
const newUserController = async (req, res, next) => {
  try {
    const { name, email, password, bio, photo } = req.body;
    console.log("Received data:", { name, email, password, bio, photo });
    await insertUserModel(name, email, password, bio, photo);
    res.send({
      status: "OK",
      message: "Usuario registrado",
    });
  } catch (error) {
    next(error);
  }
};

export default newUserController;
