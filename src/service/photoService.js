import fs from "fs/promises";
import path from "path";
import sharp from "sharp";
import { v4 as uuid } from "uuid";
import dotenv from "dotenv";

import { deleteFileError, saveFileError } from "./errorService.js";

dotenv.config();

const { UPLOADS_DIR } = process.env;

export const savePhotoService = async (photo, width) => {
  try {
    const imgDir = path.join(process.cwd(), `./src/${UPLOADS_DIR}/jpg/avatar`);
    try {
      await fs.access(imgDir);
    } catch {
      // console.log("Pasa por aqui");
      await fs.mkdir(imgDir, { recursive: true });
    }

    const sharpImg = sharp(photo.data);

    sharpImg.resize(width);

    const imgName = uuid();

    const imgPath = path.join(imgDir, imgName);

    await sharpImg.toFile(imgPath);

    // Guardar el nombre del avatar generado en la base de datos
    const user = await selectUserByEmail(req.user.id);

    if (user.photo) await deletePhotoService(user.photo);

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

    await updateUserAvatarModel(imgName, req.user.id);

    return imgName;
  } catch (error) {
    saveFileError();
  }
};

export const deletePhotoService = async (imgName) => {
  try {
    const imgPath = path.join(
      process.cwd(),
      `./src/${UPLOADS_DIR}/jpg/avatar`,
      imgName
    );

    try {
      await fs.access(imgPath);
    } catch {
      return;
    }

    await fs.unlink(imgPath);
  } catch (error) {
    deleteFileError();
  }
};
