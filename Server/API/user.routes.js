import express from "express";
import { body, validationResult } from "express-validator";
import User from "./user.modal.js";
const router = express.Router();

// Add a user with validation
router.post(
  "/add",
  [
    body("name").notEmpty().withMessage("Name is required"),
    body("email").isEmail().withMessage("Valid email is required"),
    body("role").notEmpty().withMessage("Role is required"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const { name, email, role } = req.body;
      const user = new User({ name, email, role });
      await user.save();
      // Emit socket event
      const io = req.app.get("io");
      io.emit("userAdded", { name, email, role });
      res.status(201).json({ message: "User added successfully", user });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
);

// Get all users
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
