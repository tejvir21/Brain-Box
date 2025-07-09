const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const CookieParser = require("cookie-parser");

dotenv.config();

corsOptions = {
  origin: process.env.CORS_ORIGIN || "http://localhost:3000",
  credentials: true,
};

connectDB();

const app = express();
app.use(cors(corsOptions));
app.use(express.json());
// Middleware to parse cookies
app.use(CookieParser());

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/notes", require("./routes/notesRoutes"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
