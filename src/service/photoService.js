import fs from "fs/promises";
import path from "path";
import sharp from "sharp";
import { v4 as uuid } from "uuid";
import dotenv from "dotenv";

import { deleteFileError, saveFileError } from "./errorService.js";

dotenv.config();

const { UPLOADS_DIR } = process.env;

export const savePhotoService = async (photoFile, width) => {
  try {
    const imgDir = path.join(process.cwd(), `./${UPLOADS_DIR}/avatar`);
    try {
      await fs.access(imgDir);
    } catch {
      await fs.mkdir(imgDir, { recursive: true });
    }

    const imgName = `${uuid()}.jpg`;
    const imgPath = path.join(imgDir, imgName);

    await sharp(photoFile.path).resize(width).toFile(imgPath);

    return imgName;
  } catch (error) {
    saveFileError();
  }
};

export const deletePhotoService = async (imgName) => {
  try {
    const imgPath = path.join(
      process.cwd(),
      `./${UPLOADS_DIR}/avatar`,
      imgName
    );

    try {
      await fs.access(imgPath);
      await fs.unlink(imgPath);
    } catch {
      return;
    }
  } catch (error) {
    deleteFileError();
  }
};
