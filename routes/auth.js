const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();
const User = require("../models/User");

// Sign up or login
router.post("/google", async (req, res) => {
  const { email, name, picture } = req.body;

  try {
    let user = await User.findOne({ email });
    if (!user) {
      user = new User({ email, name, picture });
      await user.save();
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.json({ token, user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
