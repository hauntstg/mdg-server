// src/app.js
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const postRoutes = require("./routes/admin/post");

const db = process.env.MONGODB_URI;
const CLIENT_URL = process.env.CLIENT_URL;
const app = express();
app.use(cookieParser());
app.set("trust proxy", 1);
const allowedOrigins = ["http://localhost:5173", CLIENT_URL];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// check db
app.get("/check-health", (req, res, next) => {
  try {
    console.error("GOOD!");
    res.status(200).send("GOOD!");
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Error!");
  }
});

app.use("/admin", postRoutes);
// app.use("/admin", authRoutes);

const PORT = process.env.PORT || 5000;
mongoose
  .connect(db)
  .then(() => {
    console.log("✅ Kết nối MongoDB thành công!");
    app.listen(PORT, () => {
      console.log(`🚀 Server đang chạy tại http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ Lỗi kết nối MongoDB:", err);
  });
