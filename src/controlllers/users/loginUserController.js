import selectUserByEmail from "../../models/users/selectUserByEmail.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { invalidCredentialsError } from "../../service/errorService.js";

const loginUserController = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await selectUserByEmail(email);

    if (!user) {
      invalidCredentialsError();
    }

    // Verificar la contraseña
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      invalidCredentialsError();
    }

    const tokenInfo = {
      id: user.id,
    };
    const token = jwt.sign(tokenInfo, process.env.SECRET, {
      expiresIn: "10d",
    });

    const responseData = {
      token: token,
      email: user.email,
      bio: user.bio,
      foto: user.foto,
    };

    res.send({
      status: "ok",
      data: responseData,
    });
  } catch (error) {
    next(error);
  }
};

export default loginUserController;
