
import { Farm } from "../models/index.js";

export const createFarm = async (req, res) => {
  try {
    const { name, location, description } = req.body;
    if (!name || !location) return res.status(400).json({ message: "Name and location required" });

    // use authenticated user id
    const farm = await Farm.create({
      name,
      location,
      description,
      userId: req.user.id,
    });

    res.status(201).json({ message: "Farm created", farm });
  } catch (err) {
    console.error("Create Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

export const getFarms = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;
    const result = await Farm.findAndCountAll({
      where: { userId: req.user.id },
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [["id", "ASC"]],
    });

    res.json({
      farms: result.rows,
      total: result.count,
      page: Number(page),
      totalPages: Math.ceil(result.count / limit),
    });
  } catch (err) {
    console.error("Fetch Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};


export const getAllFarmsNoFilter = async (req, res) => {
  try {
    const farms = await Farm.findAll({ order: [["id", "ASC"]] });
    res.json(farms);
  } catch (err) {
    console.error("Fetch all farms:", err);
    res.status(500).json({ message: "Server error" });
  }
};
