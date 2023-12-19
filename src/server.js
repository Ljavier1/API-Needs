import express from "express";
import morgan from "morgan";
import cors from "cors";
import fileUpload from "express-fileupload";
import dotenv from "dotenv";

import routes from "./routes/index.js";
import { notFoundController, errorController } from "./middlewares/index.js";

const server = express();
dotenv.config();
const { UPLOADS_DIR } = process.env;

server.use(express.json());
server.use(morgan("dev"));
server.use(cors());
server.use(express.static(UPLOADS_DIR));
server.use(fileUpload());

// middleware de rutas
server.use(routes);
// middleware de rutas no encontradas
server.use(notFoundController);
// middleware de manejo de errores
server.use(errorController);
export default server;
