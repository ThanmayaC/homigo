const express = require("express");
const router = express.Router();
const System = require("../models/System");

// GET SETTINGS
router.get("/", async (req, res) => {
  let settings = await System.findOne();

  if (!settings) {
    settings = new System({
      submissionsOpen: true,
      matchingEnabled: true,
      deadline: ""
    });
    await settings.save();
  }

  res.json(settings);
});

// UPDATE SETTINGS
router.post("/", async (req, res) => {
  let settings = await System.findOne();

  if (!settings) {
    settings = new System(req.body);
  } else {
    settings = await System.findOneAndUpdate({}, req.body, { new: true });
  }

  res.json(settings);
});

module.exports = router;