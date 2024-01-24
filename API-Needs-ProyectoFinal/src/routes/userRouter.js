import express from "express";

const router = express.Router();
import authUserController from "../middlewares/authUserController.js";
import {
  newUserController,
  loginUserController,
  editUserAvatarController,
} from "../controllers/users/index.js";

// USUARIO ANONIMO

// registrarte como usuario
router.post("/users/register", newUserController);
// login usuario
router.post("/users/login", loginUserController);

// USUARIO LOGEADO

// cambiar avatar
router.post("/users/avatar", authUserController, editUserAvatarController);

export default router;
