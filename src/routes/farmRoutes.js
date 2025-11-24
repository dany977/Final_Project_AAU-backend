
import express from "express";
import { authMiddleware } from "../utils/authMiddleware.js";
import { createFarm, getFarms, getAllFarmsNoFilter } from "../controllers/farmController.js";
import { Farm } from "../models/index.js";

const router = express.Router();

router.get("/", authMiddleware, getFarms);
router.get("/all", getAllFarmsNoFilter); 
router.post("/", authMiddleware, createFarm);

router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const farm = await Farm.findByPk(req.params.id);
    if (!farm) return res.status(404).json({ message: "Farm not found" });
    if (farm.userId !== req.user.id) return res.status(403).json({ message: "Unauthorized" });
    await farm.update(req.body);
    res.json({ message: "Farm updated", farm });
  } catch (err) {
    console.error("Update farm error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const farm = await Farm.findByPk(req.params.id);
    if (!farm) return res.status(404).json({ message: "Farm not found" });
    if (farm.userId !== req.user.id) return res.status(403).json({ message: "Unauthorized" });
    await farm.destroy();
    res.json({ message: "Farm deleted" });
  } catch (err) {
    console.error("Delete farm error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
