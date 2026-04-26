const express = require("express");
const router = express.Router();
const Student = require("../models/Student");

// ✅ SUBMIT PREFERENCES
router.post("/", async (req, res) => {
  try {
    const { regNo, diet, sleep, cleanliness, study, noise, personality, knownPeer } = req.body;

    let student = await Student.findOne({ regNo });

    if (!student) {
      student = new Student({ regNo });
    }

    student.diet = diet;
    student.sleep = sleep;
    student.cleanliness = cleanliness;
    student.study = study;
    student.noise = noise;
    student.personality = personality;
    student.knownPeer = knownPeer;

    await student.save();

    res.json({ message: "Preferences saved" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// ✅ GET ALL SUBMITTED STUDENTS (🔥 THIS IS WHAT YOU WANT)
router.get("/submitted", async (req, res) => {
  try {
    const students = await Student.find({
      diet: { $exists: true, $ne: "" }
    }).select("regNo diet sleep cleanliness study noise personality knownPeer");

    res.json(students);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;