const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const { authenticateToken } = require("./userAuth");

// Signup route
router.post("/signup", async (req, res) => {
  try {
    const { username, email, password, address, phone } = req.body;

    if (username.length < 3) {
      return res.status(400).json({ message: "Username must be at least 3 characters long" });
    }
    if (!email.includes("@")) {
      return res.status(400).json({ message: "Invalid email address" });
    }
    if (password.length <= 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters long" });
    }
    if (phone.length !== 10 || isNaN(phone)) {
      return res.status(400).json({ message: "Phone number must be exactly 10 digits and numeric" });
    }

    const duplicateUser = await User.findOne({ $or: [{ username }, { email }, { phone }] });
    if (duplicateUser) {
      if (duplicateUser.username === username) {
        return res.status(400).json({ message: "Username already exists" });
      }
      if (duplicateUser.email === email) {
        return res.status(400).json({ message: "Email already exists" });
      }
      if (duplicateUser.phone === phone) {
        return res.status(400).json({ message: "Phone number already exists" });
      }
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      address,
      phone,
    });
    await newUser.save();

    return res.status(200).json({ message: "User created successfully", user: newUser });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error signing up", error: error.message });
  }
});

// Login route
router.post("/login", async (req, res) => {
  try {
    const { identifier, password, rememberMe } = req.body;
    if (!identifier || !password) {
      return res.status(400).json({ message: "Please provide identifier and password" });
    }
    const trimmedIdentifier = identifier.trim();
    const isNumeric = /^\d+$/.test(trimmedIdentifier);
    // Assuming phone is stored as a string:
    const query = isNumeric ? { phone: trimmedIdentifier } : { email: trimmedIdentifier };

    const existingUser = await User.findOne(query);
    if (!existingUser) {
      return res.status(400).json({ message: "Invalid email or phone number" });
    }
    const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid password" });
    }
    const expiresIn = rememberMe ? "30d" : "1d";
    const token = jwt.sign({ id: existingUser._id, role: existingUser.role }, process.env.JWT_SECRET, { expiresIn });
    return res.status(200).json({ message: "Login successful", token, user: existingUser });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error logging in", error: error.message });
  }
});

// Get user details
router.get("/user-details", authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const data = await User.findById(userId).select("-password");
    return res.status(200).json({ message: "User details fetched successfully", user: data });
  } catch (error) {
    return res.status(500).json({ message: "Error fetching user details", error: error.message });
  }
});

// Update address
router.put("/update-address", authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const { address } = req.body;
    await User.findByIdAndUpdate(userId, { address });
    return res.status(200).json({ message: "Address updated successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Error updating address", error: error.message });
  }
});

module.exports = router;
