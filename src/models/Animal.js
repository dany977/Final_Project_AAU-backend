
import { DataTypes } from "sequelize";

export default (sequelize) => {
  const Animal = sequelize.define("Animal", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    animalId: { type: DataTypes.STRING, allowNull: false },
    species: { type: DataTypes.STRING, allowNull: false },
    breed: { type: DataTypes.STRING },
    farmId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    owner: { type: DataTypes.STRING },
    birthDate: { type: DataTypes.DATEONLY },
    sex: { type: DataTypes.STRING },
    name: { type: DataTypes.STRING },
    color: { type: DataTypes.STRING },
    productionPurpose: { type: DataTypes.STRING },
    locationStatus: { type: DataTypes.STRING },
    userId: { type: DataTypes.INTEGER, allowNull: false },
  }, {
    tableName: "animals",
  });

  return Animal;
};
