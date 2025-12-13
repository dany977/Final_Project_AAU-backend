import express from "express";
import db from "../models/index.js";
import { authMiddleware } from "../utils/authMiddleware.js";
import { adminMiddleware } from "../utils/adminMiddleware.js";

const router = express.Router();
const { User } = db;

router.get("/users", authMiddleware, adminMiddleware, async (req, res) => {
  const users = await User.findAll({
    attributes: { exclude: ["password"] },
  });
  res.json(users);
});

router.put("/users/:id/role", authMiddleware, adminMiddleware, async (req, res) => {
  const { role } = req.body;

  const user = await User.findByPk(req.params.id);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  user.role = role;
  await user.save();

  res.json({ message: "Role updated successfully" });
});

export default router;
