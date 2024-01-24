import selectUserByEmail from "../../models/users/selectUserByEmail.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { invalidCredentialsError } from "../../service/errorService.js";
const loginUserController = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await selectUserByEmail(email);

    let validPassword;

    if (user) {
      validPassword = await bcrypt.compare(password, user.password);
    }
    if (!user || !validPassword) {
      invalidCredentialsError();
    }

    // generamos el token
    const tokenInfo = {
      id: user.id,
    };
    const token = jwt.sign(tokenInfo, process.env.SECRET, {
      expiresIn: "10d",
    });
    res.send({
      status: "ok",
      data: {
        token: token,
      },
    });
  } catch (error) {
    next(error);
  }
};

export default loginUserController;
