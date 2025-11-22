
import { DataTypes } from "sequelize";

export default (sequelize) => {
  const Farm = sequelize.define("Farm", {
    name: { type: DataTypes.STRING, allowNull: false },
    location: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT, allowNull: true },
    userId: { type: DataTypes.INTEGER, allowNull: false },
  });

  return Farm;
};
