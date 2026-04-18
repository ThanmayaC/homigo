const express = require("express");
const router = express.Router();

// LOGIN
router.post("/login", (req, res) => {
  try {
    const { regNo, password, role } = req.body;

    console.log("Login request:", req.body); // 🔥 debug

    // ADMIN LOGIN
    if (role === "admin") {
      if (regNo === "admin" && password === "admin") {
        return res.json({ role: "admin" });
      } else {
        return res.status(401).json({ error: "Invalid admin credentials" });
      }
    }

    // STUDENT LOGIN
    if (!regNo) {
      return res.status(400).json({ error: "Missing regNo" });
    }

    return res.json({ role: "student", regNo });

  } catch (err) {
    console.error("Auth error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;