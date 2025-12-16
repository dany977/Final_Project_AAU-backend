import express from "express";
import { sequelize } from "../models/index.js";
import { authMiddleware } from "../utils/authMiddleware.js";

const router = express.Router();

router.get("/stats", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;

    const [[{ count: farms }]] = await sequelize.query(
      'SELECT COUNT(*)::int AS count FROM "Farms" WHERE "userId" = :userId',
      { replacements: { userId } }
    );

    const [[{ count: animals }]] = await sequelize.query(
      'SELECT COUNT(*)::int AS count FROM "Animals" WHERE "userId" = :userId',
      { replacements: { userId } }
    );

    const [[{ count: users }]] = await sequelize.query(
      'SELECT COUNT(*)::int AS count FROM "users"'
    );

    res.json({ farms, animals, users });
  } catch (err) {
    console.error("Dashboard stats error:", err);
    res.status(500).json({ message: "Failed to load stats" });
  }
});

export default router;
