// import express from "express";
// import { register, login } from "../controllers/authController.js";

// const router = express.Router();

// // Auth routes
// router.post("/register", register);
// router.post("/login", login);

// export default router;



import express from "express";
import { register, login } from "../controllers/authController.js";

const router = express.Router();

// Register
router.post("/register", register);

// Login
router.post("/login", login);

export default router;
