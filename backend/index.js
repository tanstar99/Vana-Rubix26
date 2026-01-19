import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";



dotenv.config({ path: "./.env" });

const app = express();

const PORT = process.env.PORT || 5000;


// -----------------------------
// Middlewares
// -----------------------------
app.use(express.json({ limit: "10mb" })); // support large JSON bodies for media URLs
app.use(cookieParser());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

// Health check
app.get("/", (req, res) => res.json({ message: "Server is working 🚀" }));

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  });
