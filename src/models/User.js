import { DataTypes } from "sequelize";

export default (sequelize) => {
  const User = sequelize.define("User", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },

    firstName: { type: DataTypes.STRING },
    lastName: { type: DataTypes.STRING },
    email: { type: DataTypes.STRING },

    username: { type: DataTypes.STRING, allowNull: false, unique: true },

    // FIXED: must match controller
    passwordHash: { type: DataTypes.STRING, allowNull: false },
  }, {
    tableName: "users",
  });

  return User;
};
