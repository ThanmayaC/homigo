const mongoose = require("mongoose");

const systemSchema = new mongoose.Schema({
  submissionsOpen: Boolean,
  matchingEnabled: Boolean,
  deadline: String
});

module.exports = mongoose.model("System", systemSchema);