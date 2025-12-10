import express from "express";
import { authMiddleware } from "../utils/authMiddleware.js";
import { createAnimal, getAnimals, updateAnimal, deleteAnimal } from "../controllers/animalController.js";
import Animal from "../models/animalModel.js";

const router = express.Router();

router.get("/", authMiddleware, getAnimals);
router.post("/", authMiddleware, createAnimal);

router.get("/:id", authMiddleware, async (req, res) => {
  try {
    const animal = await Animal.findByPk(req.params.id);

    if (!animal) {
      return res.status(404).json({ message: "Animal not found" });
    }

    res.json(animal);

  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

router.put("/:id", authMiddleware, updateAnimal);
router.delete("/:id", authMiddleware, deleteAnimal);

export default router;
