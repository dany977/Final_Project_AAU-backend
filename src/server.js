import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import farmRoutes from "./routes/farmRoutes.js";
import animalRoutes from "./routes/animalRoutes.js";
import { sequelize } from "./models/index.js";
import { setupSwagger } from "./swagger.js";

dotenv.config();

const app = express();

import cors from "cors";

app.use(cors({
  origin: "https://final-aau-frontends.vercel.app",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));


app.use(express.json());
app.use(cookieParser());

setupSwagger(app);

app.use("/api/auth", authRoutes);
app.use("/api/farms", farmRoutes);
app.use("/api/animals", animalRoutes);

const PORT = process.env.PORT || 7000;

(async () => {
  try {
    await sequelize.sync({ alter: true });
    console.log("DB synced");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (err) {
    console.error("DB sync error:", err);
    process.exit(1);
  }
})();
