import express from "express";
import { authMiddleware } from "../utils/authMiddleware.js";
import { adminMiddleware } from "../utils/adminMiddleware.js";
import { User } from "../models/index.js";

const router = express.Router();

// Get all users
router.get("/users", authMiddleware, adminMiddleware, async (req, res) => {
  const users = await User.findAll({
    attributes: { exclude: ["password"] },
  });
  res.json(users);
});

// Delete user
router.delete("/users/:id", authMiddleware, adminMiddleware, async (req, res) => {
  await User.destroy({ where: { id: req.params.id } });
  res.json({ message: "User deleted" });
});

// Change role
router.put("/users/:id/role", authMiddleware, adminMiddleware, async (req, res) => {
  const { role } = req.body;
  await User.update({ role }, { where: { id: req.params.id } });
  res.json({ message: "Role updated" });
});

export default router;
