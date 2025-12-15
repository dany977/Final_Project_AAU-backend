import express from "express";
import { pool } from "../models/index.js";

const router = express.Router();

router.get("/stats", async (req, res) => {
  try {
    const farms = await pool.query("SELECT COUNT(*) FROM farms");
    const animals = await pool.query("SELECT COUNT(*) FROM animals");
    const users = await pool.query("SELECT COUNT(*) FROM users");

    res.json({
      farms: Number(farms.rows[0].count),
      animals: Number(animals.rows[0].count),
      users: Number(users.rows[0].count),
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
