import express from "express";
import { authMiddleware } from "../utils/authMiddleware.js";
import {
  createFarm,
  getFarms,
  getAllFarmsNoFilter
} from "../controllers/farmController.js";

const router = express.Router();

router.get("/", authMiddleware, getFarms);
router.get("/all", getAllFarmsNoFilter);
router.post("/", authMiddleware, createFarm);

export default router;
