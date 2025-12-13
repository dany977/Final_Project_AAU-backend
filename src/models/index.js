import { Sequelize } from "sequelize";
import UserModel from "./User.js";

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "postgres",
    logging: false,
  }
);

const User = UserModel(sequelize);

const db = {
  sequelize,
  Sequelize,
  User,
};

export default db;
