// models/user.js
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true, trim: true, minlength: 3 },
    email: { type: String, required: true, unique: true, trim: true, match: [/.+@.+\..+/, "Please enter a valid email address"] },
    phone: { type: String, required: true, unique: true, trim: true, length: 10 },
    password: { type: String, required: true, minlength: 6 },
    address: { type: String, required: true, trim: true },
    avatar: { type: String, default: "https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png" },
    role: { type: String, default: "user", enum: ["user", "admin"] },
    wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: "Book" }],
    cart: [{ type: mongoose.Schema.Types.ObjectId, ref: "Book" }],
    orders: [{ type: mongoose.Schema.Types.ObjectId, ref: "Order" }],
    // New fields for password reset
    resetToken: { type: String },
    resetTokenExpiration: { type: Date },
  },
  { timestamps: true }
);

// Pre-save hook to hash password if modified or new
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Instance method to compare passwords during authentication
userSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

// Hide password field when converting user document to JSON
userSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

module.exports = mongoose.models.User || mongoose.model("User", userSchema);
