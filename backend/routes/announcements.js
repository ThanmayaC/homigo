const express = require("express");
const router = express.Router();
const Announcement = require("../models/Announcement");

// GET
router.get("/", async (req, res) => {
  const data = await Announcement.find().sort({ _id: -1 });
  res.json(data);
});

// POST (admin)
router.post("/", async (req, res) => {
  const { text } = req.body;

  const newItem = new Announcement({
    text,
    time: new Date().toLocaleString()
  });

  await newItem.save();
  res.json(newItem);
});

module.exports = router;