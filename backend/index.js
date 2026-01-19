import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";

import plantRoutes from "./routes/plantRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import bookmarkRoutes from "./routes/bookMarkRoutes.js";
import noteRoutes from "./routes/noteRoutes.js";
import exportRoutes from "./routes/exportRoutes.js";


dotenv.config({ path: "./.env" });

const app = express();

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());

// Routes-:
app.use("/api/plants", plantRoutes);
app.use("/api/users", authRoutes);
app.use("/api/bookmarks", bookmarkRoutes);
app.use("/api/notes", noteRoutes);
app.use("/api/export", exportRoutes);


// Connect DB
connectDB();

// Test route
app.get("/", (req, res) => {
  res.send("Virtual Herbal Garden Backend Running");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
