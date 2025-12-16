import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import { sequelize } from "./models/index.js";

dotenv.config();

const app = express();

app.use(cors({
  origin: "https://final-aau-frontends.vercel.app",
  credentials: true,
}));
await sequelize.sync({ force: true });

app.use(express.json());

app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 10000;


sequelize.authenticate()
  .then(() => {
    console.log("DB connected");
    return sequelize.sync();
  })
  .then(() => {
    app.listen(PORT, () =>
      console.log(`Server running on port ${PORT}`)
    );
  })
  .catch(console.error);
