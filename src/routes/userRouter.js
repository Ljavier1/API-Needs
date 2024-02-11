import express from "express";

const router = express.Router();
import authUserController from "../middlewares/authUserController.js";

import userExistController from "../middlewares/userExistController.js";

import validation from "../middlewares/joiValidation.js";
import { registerSchema, logInSchema } from "../schemas/user/index.js";

import {
  newUserController,
  loginUserController,
  editUserAvatarController,
} from "../controlllers/users/index.js";
import getUserById from "../controlllers/tasks/getUserController.js";

//   USUARIO ANONIMO    //

// registrarte como usuario
router.post("/users/register", validation(registerSchema), newUserController);
// login usuario
router.post("/users/login", validation(logInSchema), loginUserController);

//   USUARIO LOGIN   //

// cambiar avatar
router.post("/users/avatar", authUserController, editUserAvatarController);

// perfil de usuario
router.get("/user/:userId", userExistController, getUserById);

export default router;
