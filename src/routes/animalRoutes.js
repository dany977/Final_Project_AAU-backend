
import express from "express";
import { authMiddleware } from "../utils/authMiddleware.js";
import { createAnimal, getAnimals, updateAnimal, deleteAnimal } from "../controllers/animalController.js";

const router = express.Router();

router.get("/", authMiddleware, getAnimals);
router.post("/", authMiddleware, createAnimal);
router.put("/:id", authMiddleware, updateAnimal);
router.delete("/:id", authMiddleware, deleteAnimal);

export default router;
