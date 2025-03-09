const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const { authenticateToken } = require("./userAuth");
const crypto = require("crypto");
const nodemailer = require("nodemailer");

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

    // Create new user. (Password will be hashed by the pre-save hook.)
    const newUser = new User({
      username,
      email,
      password, 
      address,
      phone,
    });
    await newUser.save();

    // Generate a JWT token for immediate authentication.
    const token = jwt.sign(
      { id: newUser._id, role: newUser.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // Return token, role, and a success message.
    return res.status(201).json({ 
      message: "User created successfully", 
      token, 
      role: newUser.role,
      // Optionally, send user details (omit sensitive fields like password)
      user: {
        id: newUser._id,
        username: newUser.username,
        email: newUser.email,
        address: newUser.address,
        phone: newUser.phone,
        role: newUser.role
      }
    });
  } catch (error) {
    console.error("Signup error:", error);
    return res.status(500).json({ message: "Error signing up", error: error.message });
  }
});


// Login route
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    console.log("Login attempt:", username);

    const existingUser = await User.findOne({ username });
    if (!existingUser) {
      console.log("User not found");
      return res.status(401).json({ message: "Invalid credentials" });
    }

    console.log("Stored hash:", existingUser.password);
    console.log("Provided password:", password);

    // Compare the provided password with the stored hash
    const isMatch = await existingUser.comparePassword(password);
    console.log("Password match:", isMatch);

    if (isMatch) {
      const authClaims = {
        id: existingUser._id,
        role: existingUser.role,
      };

      const token = jwt.sign(authClaims, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });
      return res.status(200).json({
        message: "Login successful",
        id: existingUser._id,
        role: existingUser.role,
        token,
      });
    } else {
      return res.status(401).json({ message: "Invalid credentials" });
    }
  } catch (error) {
    console.error("Login error:", error);
    return res
      .status(500)
      .json({ message: "Error logging in", error: error.message });
  }
});


// Forgot Password route (using email only)
// Forgot Password route (Email-only)
router.post("/forgot-password", async (req, res) => {
  try {
    const { email } = req.body; // Email sent from frontend
    const user = await User.findOne({ email });
    // For security, always return a generic message.
    if (!user) {
      return res.status(200).json({ message: "If this email is registered, a reset link will be sent." });
    }

    // Generate a secure reset token
    const resetToken = crypto.randomBytes(20).toString("hex");
    // Set token expiration (1 hour)
    user.resetToken = resetToken;
    user.resetTokenExpiration = Date.now() + 3600000; // 1 hour in milliseconds
    await user.save();

    // Create the reset link for your frontend reset password page
    const resetLink = `http://localhost:3000/reset-password?token=${resetToken}&email=${user.email}`;

    // Configure Nodemailer transporter using environment variables
    const transporter = nodemailer.createTransport({
      service: "gmail", // Using Gmail; adjust if needed.
      auth: {
        user: process.env.EMAIL_USER, // Fixed sender email from .env
        pass: process.env.EMAIL_PASS, // Fixed sender password from .env
      },
    });

    // Prepare email options: fixed sender and dynamic recipient
    const mailOptions = {
      from: `"YourApp Support" <${process.env.EMAIL_USER}>`,
      to: user.email,
      subject: "Password Reset Request",
      text: `Hello ${user.username},

We received a request to reset your password. Please click the link below to reset your password:
${resetLink}

This link will expire in 1 hour.

If you did not request this, please ignore this email.`,
    };

    // Send the email with the reset link
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email:", error);
        return res.status(500).json({ message: "Error sending reset email" });
      } else {
        return res.status(200).json({ message: "If this email is registered, a reset link will be sent." });
      }
    });
  } catch (error) {
    console.error("Forgot password error:", error);
    return res.status(500).json({ message: "Error processing request", error: error.message });
  }
});

// Reset Password route (Email-only)
router.post("/reset-password", async (req, res) => {
  try {
    const { email, token, newPassword } = req.body;
    // Find user by email with valid token
    const user = await User.findOne({
      email,
      resetToken: token,
      resetTokenExpiration: { $gt: Date.now() }
    });
    if (!user) {
      return res.status(400).json({ message: "Invalid token or token has expired" });
    }

    // Update the password (the pre-save hook in the model will hash the new password)
    user.password = newPassword;
    user.resetToken = undefined;
    user.resetTokenExpiration = undefined;
    await user.save();

    // Optionally, send a confirmation email here
    return res.status(200).json({ message: "Password reset successfully" });
  } catch (error) {
    console.error("Reset password error:", error);
    return res.status(500).json({ message: "Error resetting password", error: error.message });
  }
});




// Get user details
router.get("/user-details", authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    return res.status(200).json({ message: "User details fetched successfully", user });
  } catch (error) {
    return res.status(500).json({ message: "Error fetching user details", error: error.message });
  }
});

// Update address
router.put("/update-address", authenticateToken, async (req, res) => {
  try {
    const { address } = req.body;
    await User.findByIdAndUpdate(req.user.id, { address });
    return res.status(200).json({ message: "Address updated successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Error updating address", error: error.message });
  }
});

module.exports = router;
