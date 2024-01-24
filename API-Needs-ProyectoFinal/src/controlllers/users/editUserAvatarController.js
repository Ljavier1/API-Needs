import selectUserByEmail from "../../models/users/selectUserByEmail.js";
import updateUserAvatarModel from "../../models/users/updateUserAvatarModel.js";

import {
  deletePhotoService,
  savePhotoService,
} from "../../service/photoService.js";

const editUserAvatarController = async (req, res, next) => {
  try {
    // console.log(req.files.avatar);
    const user = selectUserByEmail(req.user.id);

    if (user.photo) await deletePhotoService(user.photo);

    const avatarName = await savePhotoService(req.files.avatar, 100);

    await updateUserAvatarModel(avatarName, req.user.id);

    res.send({
      status: "ok",
      message: "Avatar actualizado",
    });
  } catch (error) {
    next(error);
  }
};

export default editUserAvatarController;
