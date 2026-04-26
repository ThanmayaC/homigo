const express = require("express");
const router = express.Router();
const Student = require("../models/Student");


// 🔥 RUN MATCHING
router.post("/run", async (req, res) => {
  try {
    const students = await Student.find();

    let matches = [];

    for (let i = 0; i < students.length; i++) {
      for (let j = i + 1; j < students.length; j++) {

        // PRIORITY: known peer
        if (
          students[i].knownPeer &&
          students[i].knownPeer === students[j].regNo
        ) {
          matches.push({
            student1: students[i].regNo,
            student2: students[j].regNo,
            score: 999
          });
          continue;
        }

        let score = 0;

        if (students[i].diet === students[j].diet) score++;
        if (students[i].sleep === students[j].sleep) score++;
        if (students[i].cleanliness === students[j].cleanliness) score++;
        if (students[i].study === students[j].study) score++;
        if (students[i].noise === students[j].noise) score++;

        matches.push({
          student1: students[i].regNo,
          student2: students[j].regNo,
          score
        });
      }
    }

    // SORT
    matches.sort((a, b) => b.score - a.score);

    let used = new Set();
    let finalMatches = [];

    for (let m of matches) {
      if (!used.has(m.student1) && !used.has(m.student2)) {
        finalMatches.push(m);
        used.add(m.student1);
        used.add(m.student2);
      }
    }

    // FIND UNMATCHED
    let unmatched = students
      .map(s => s.regNo)
      .filter(reg => !used.has(reg));

    // CLEAR MATCH FIELD
    await Student.updateMany({}, { $unset: { matchedWith: "" } });

    // SAVE MATCHES
    for (let m of finalMatches) {
      await Student.updateOne(
        { regNo: m.student1 },
        { matchedWith: m.student2 }
      );

      await Student.updateOne(
        { regNo: m.student2 },
        { matchedWith: m.student1 }
      );
    }

    // SAVE UNMATCHED
    for (let reg of unmatched) {
      await Student.updateOne(
        { regNo: reg },
        { matchedWith: null }
      );
    }

    res.json({
      message: "Matching complete",
      unmatched
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// 🔥 GET ALL MATCHES (IMPORTANT: ABOVE /:regNo)
router.get("/all", async (req, res) => {
  try {
    const students = await Student.find();

    let matches = [];
    let unmatched = [];
    let visited = new Set();

    for (let s of students) {
      if (visited.has(s.regNo)) continue;

      if (s.matchedWith) {
        matches.push({
          student1: s.regNo,
          student2: s.matchedWith
        });

        visited.add(s.regNo);
        visited.add(s.matchedWith);
      } else {
        unmatched.push(s.regNo);
      }
    }

    res.json({ matches, unmatched });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// 🔥 GET MATCH FOR USER
router.get("/:regNo", async (req, res) => {
  try {
    const student = await Student.findOne({ regNo: req.params.regNo });

    if (!student || !student.matchedWith) {
      return res.json(null);
    }

    const partner = await Student.findOne({
      regNo: student.matchedWith
    });

    res.json({
      you: student.regNo,
      roommate: partner?.regNo || "Not found"
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;