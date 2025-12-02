// models/User.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      maxlength: 100,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phoneNumber: {
      type: String,
      maxlength: 20,
    },

    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["admin", "support", "user"],
      default: "user",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Tạo model từ schema
const User = mongoose.model("User", userSchema);

module.exports = User;
