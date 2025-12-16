import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import db from "./models/index.js";

import authRoutes from "./routes/authRoutes.js";
import farmRoutes from "./routes/farmRoutes.js";
import animalRoutes from "./routes/animalRoutes.js";

dotenv.config();

const app = express();

app.use(cors({
  origin: "https://final-aau-frontends.vercel.app",
  credentials: true
}));

app.use(express.json());

// 🔴 THESE LINES ARE REQUIRED
app.use("/api/auth", authRoutes);
app.use("/api/farms", farmRoutes);
app.use("/api/animals", animalRoutes);

// health check
app.get("/", (req, res) => {
  res.send("API is running");
});

const PORT = process.env.PORT || 10000;

db.sequelize.sync()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error("DB sync failed:", err);
  });
