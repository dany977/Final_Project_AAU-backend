import { Sequelize } from "sequelize";

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

import UserModel from "./User.js";
import FarmModel from "./Farm.js";
import AnimalModel from "./Animal.js";

// init models
export const User = UserModel(sequelize);
export const Farm = FarmModel(sequelize);
export const Animal = AnimalModel(sequelize);

// relations
User.hasMany(Farm, { foreignKey: "userId", onDelete: "CASCADE" });
Farm.belongsTo(User, { foreignKey: "userId" });

User.hasMany(Animal, { foreignKey: "userId", onDelete: "CASCADE" });
Animal.belongsTo(User, { foreignKey: "userId" });

Farm.hasMany(Animal, { foreignKey: "farmId", onDelete: "CASCADE" });
Animal.belongsTo(Farm, { foreignKey: "farmId" });

// final export
export { sequelize };
