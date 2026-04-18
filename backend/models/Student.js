const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  regNo: { type: String, required: true, unique: true },
  branch: String,
  diet: String,
  sleep: String,
  cleanliness: String,
  study: String,
  noise: String,
  personality: String,
  studyIntensity: String,
  dealBreaker: String,
  knownPeer: String
});

module.exports = mongoose.model("Student", studentSchema);