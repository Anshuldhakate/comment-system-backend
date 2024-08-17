const express = require("express");
const router = express.Router();
const Comment = require("../models/Comment");

// Get all comments with pagination
router.get("/", async (req, res) => {
  const { page = 1, limit = 8, sort = "latest" } = req.query;
  const sortOption = sort === "popularity" ? { reactions: -1 } : { createdAt: -1 };
  try {
    const comments = await Comment.find()
      .sort(sortOption)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();
    const count = await Comment.countDocuments();
    res.json({
      comments,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add a new comment
router.post("/", async (req, res) => {
  const { userId, userName, userPhoto, text, fileUrl } = req.body;
  const newComment = new Comment({ userId, userName, userPhoto, text, fileUrl });
  try {
    const savedComment = await newComment.save();
    res.status(201).json(savedComment);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
