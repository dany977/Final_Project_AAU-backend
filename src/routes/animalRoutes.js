import express from "express";
import { authMiddleware } from "../utils/authMiddleware.js";
import { createAnimal, getAnimals, updateAnimal, deleteAnimal } from "../controllers/animalController.js";
import db from "../models/index.js";

const { Animal } = db;
const router = express.Router();

// List animals
router.get("/", authMiddleware, getAnimals);

// Create new animal
router.post("/", authMiddleware, createAnimal);

// Update
router.put("/:id", authMiddleware, updateAnimal);

// Delete
router.delete("/:id", authMiddleware, deleteAnimal);

// Get single animal by ID
router.get("/:id", authMiddleware, async (req, res) => {
  try {
    const animal = await Animal.findByPk(req.params.id);

    if (!animal) {
      return res.status(404).json({ message: "Animal not found" });
    }

    return res.json(animal);
  } catch (error) {
    return res.status(500).json({ message: "Server error", error });
  }
});

export default router;
