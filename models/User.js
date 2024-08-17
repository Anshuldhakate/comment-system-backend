const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  picture: { type: String }, // Store the user's Google profile picture URL
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("User", userSchema);
