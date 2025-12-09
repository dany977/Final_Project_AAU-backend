

import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config(); // <-- IMPORTANT: load .env first !!!

// Make sure DATABASE_URL exists
if (!process.env.DATABASE_URL) {
  console.error("❌ ERROR: DATABASE_URL is NOT defined in .env");
  process.exit(1);
}

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres",
  protocol: "postgres",
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

// Import models
import UserModel from "./User.js";
import FarmModel from "./Farm.js";
import AnimalModel from "./Animal.js";

// Init models
export const User = UserModel(sequelize);
export const Farm = FarmModel(sequelize);
export const Animal = AnimalModel(sequelize);

// Relations
User.hasMany(Farm, { foreignKey: "userId", onDelete: "CASCADE" });
Farm.belongsTo(User, { foreignKey: "userId" });

User.hasMany(Animal, { foreignKey: "userId", onDelete: "CASCADE" });
Animal.belongsTo(User, { foreignKey: "userId" });

Farm.hasMany(Animal, { foreignKey: "farmId", onDelete: "CASCADE" });
Animal.belongsTo(Farm, { foreignKey: "farmId" });

export { sequelize };
