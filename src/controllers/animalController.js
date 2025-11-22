// src/controllers/animalController.js
import { Animal, Farm } from "../models/index.js";

export const createAnimal = async (req, res) => {
  try {
    const {
      animalId,
      species,
      breed,
      farmId,
      farm, 
      owner,
      birthDate,
      sex,
      name,
      color,
      productionPurpose,
      locationStatus,
    } = req.body;

    if (!animalId || !species || !farmId) {
      return res.status(400).json({ message: "animalId, species and farmId are required" });
    }

    // Optional: verify farm belongs to this user (security)
    const farmRecord = await Farm.findOne({ where: { id: farmId, userId: req.user.id } });
    if (!farmRecord) return res.status(403).json({ message: "Invalid farm or not authorized" });

    const animal = await Animal.create({
  animalId,
  species,
  breed,
  farm: farm || farmRecord.name,
  farmId,              
  owner,
  birthDate,
  sex,
  name,
  color,
  productionPurpose,
  locationStatus,
  userId: req.user.id   
});


    res.status(201).json({ animal });
  } catch (err) {
    console.error("Animal Create Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

export const getAnimals = async (req, res) => {
  try {
    const { farmId } = req.query;

    const where = {};
    if (farmId) where.farmId = farmId;

    const animals = await Animal.findAll({ where });

    res.json({ animals });   
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateAnimal = async (req, res) => {
  try {
    const { id } = req.params;
    const animal = await Animal.findOne({ where: { id, userId: req.user.id } });
    if (!animal) return res.status(404).json({ message: "Animal not found" });

    await animal.update(req.body);
    res.json({ animal });
  } catch (err) {
    console.error("Animal Update Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteAnimal = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Animal.destroy({ where: { id, userId: req.user.id } });
    if (!deleted) return res.status(404).json({ message: "Animal not found" });
    res.json({ message: "Animal deleted" });
  } catch (err) {
    console.error("Animal Delete Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
