import dotenv from "dotenv";
import mysql from "mysql2/promise";
import { getPoolError } from "../service/errorService.js";

dotenv.config();
const { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME } = process.env;

let pool;

const getPool = async () => {
  try {
    if (!pool) {
      pool = mysql.createPool({
        connectionLimit: 10,
        host: DB_HOST,
        user: DB_USER,
        password: DB_PASSWORD,
        database: DB_NAME,
        timezone: "Z",
      });
    }
    return pool;
  } catch (error) {
    poolError();
  }
};

export default getPool;
