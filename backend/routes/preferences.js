const express = require("express");
const router = express.Router();
const Student = require("../models/Student");

// SAVE / UPDATE
router.post("/", async (req, res) => {
  console.log("POST /api/preferences hit");
  try {
    const data = req.body;

    console.log("Incoming:", data); // debug

    if (!data.regNo) {
      return res.status(400).json({ error: "regNo missing" });
    }

    let student = await Student.findOne({ regNo: data.regNo });

    if (student) {
      student = await Student.findOneAndUpdate(
        { regNo: data.regNo },
        data,
        { new: true }
      );
    } else {
      student = new Student(data);
      await student.save();
    }

    // 🔥 THIS WAS MISSING
    res.json(student);

  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: err.message });
  }
});

// GET ALL
router.get("/", async (req, res) => {
  const students = await Student.find();
  res.json(students);
});

module.exports = router;