const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const app = express();

// DB
connectDB();

// MIDDLEWARE
app.use(cors());
app.use(express.json());

// ROUTES
app.use("/api/auth", require("./routes/auth"));
app.use("/api/preferences", require("./routes/preferences"));
app.use("/api/matching", require("./routes/matching"));
app.use("/api/system", require("./routes/system"));
app.use("/api/announcements", require("./routes/announcements"));

// SERVER
app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});