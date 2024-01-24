import fs from "fs/promises";
import path from "path";
import { v4 as uuid } from "uuid";
import dotenv from "dotenv";
import { saveFileError } from "./errorService.js";

dotenv.config();

const { UPLOADS_DIR } = process.env;

export const fileService = async (file) => {
  try {
    const uploadDir = path.join(process.cwd(), `./src/${UPLOADS_DIR}/`);

    try {
      await fs.access(uploadDir);
    } catch {
      await fs.mkdir(uploadDir);
    }

    const fileExt = path.extname(file.name);

    const fileDir = path.join(uploadDir, fileExt.replace(".", ""));

    try {
      await fs.access(fileDir);
    } catch {
      await fs.mkdir(fileDir, { recursive: true });
    }

    const fileName = `${uuid()}${fileExt}`;

    const filePath = path.join(fileDir, fileName);

    await file.mv(filePath);

    return `/${fileExt.replace(".", "")}/${fileName}`;
  } catch (error) {
    saveFileError();
  }
};
