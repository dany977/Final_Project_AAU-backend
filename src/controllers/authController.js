import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/index.js";  // FIXED IMPORT

export const register = async (req, res) => {
  try {
    const { firstName, lastName, email, username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: "Username and password required" });
    }

    const exists = await User.findOne({ where: { username } });
    if (exists) return res.status(400).json({ message: "Username already exists" });

    const hashed = await bcrypt.hash(password, 10);

await User.create({
  username,
  passwordHash: hashed,
});


    res.json({ message: "User created successfully" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ where: { username } });
    if (!user) return res.status(400).json({ message: "Invalid username" });

    const match = await bcrypt.compare(password, user.passwordHash);

    if (!match) return res.status(400).json({ message: "Invalid password" });

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.json({
      message: "Login success",
      token,
      user,
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
