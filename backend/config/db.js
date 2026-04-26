const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb+srv://thanmaya1256:Thanmaya1256@cluster0.fwe2vfi.mongodb.net/homigo");
    console.log("MongoDB Connected (Atlas) ✅");
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

module.exports = connectDB;