const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  regNo: { type: String, required: true, unique: true },

  diet: String,
  sleep: String,
  cleanliness: String,
  study: String,
  noise: String,
  personality: String,

  knownPeer: String,
  matchedWith: String
});

module.exports = mongoose.model("Student", studentSchema);