const express = require("express");
const router = express.Router();

const Student = require("../models/Student");
const Match = require("../models/Match");

// 🔥 import AI
const generateMatches = require("../ai/match");

// RUN MATCHING
router.post("/run", async (req, res) => {
  try {
    const students = await Student.find();

    const finalMatches = generateMatches(students);

    await Match.deleteMany();
    await Match.insertMany(finalMatches);

    res.json({ count: finalMatches.length });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Matching failed" });
  }
});

// GET
router.get("/", async (req, res) => {
  const matches = await Match.find();
  res.json(matches);
});

module.exports = router;