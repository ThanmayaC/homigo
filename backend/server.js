const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const preferencesRoute = require("./routes/preferences");

const app = express();

// DB
connectDB();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/preferences", preferencesRoute);
app.use("/api/announcements", require("./routes/announcements"));
app.use("/api/matching", require("./routes/matching"));
app.use("/api/system", require("./routes/system"));

app.get("/", (req, res) => {
  res.send("Homigo Backend Running 🚀");
});

app.listen(5000, () => console.log("Server running on 5000"));