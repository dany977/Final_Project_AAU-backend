import express from "express";
import { Farm, Animal, User } from "../models/index.js";
import { authMiddleware } from "../utils/authMiddleware.js";

const router = express.Router();

router.get("/stats", authMiddleware, async (req, res) => {
  try {
    const farms = await Farm.count({ where: { userId: req.user.idhai } });
    const animals = await Animal.count({ where: { userId: req.user.id } });
    const users = await User.count();

    res.json({ farms, animals, users });
  } catch (err) {
    console.error("Dashboard stats error:", err);
    res.status(500).json({ message: "Failed to load stats" });
  }
});

export default router;
