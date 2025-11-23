
import express from "express";
import { register, login } from "../controllers/authController.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
  expiresIn: "7d",
});

res.json({
  message: "Login success",
  token,
  user,
});
res.json({
  message: "User created successfully",
  token,
  user,
});


export default router;
