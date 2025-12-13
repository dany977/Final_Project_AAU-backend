import express from "express";
import db from "../models/index.js";
import { authenticate, isAdmin } from "../utils/authMiddleware.js";

const router = express.Router();
const { User } = db;

router.get("/users", authenticate, isAdmin, async (req, res) => {
  const users = await User.findAll({
    attributes: ["id", "name", "email", "role", "createdAt"],
  });
  res.json(users);
});

router.put("/make-admin/:id", authenticate, isAdmin, async (req, res) => {
  await User.update(
    { role: "admin" },
    { where: { id: req.params.id } }
  );

  res.json({ message: "User promoted to admin" });
});

export default router;
