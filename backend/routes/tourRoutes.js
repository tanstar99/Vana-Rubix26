import express from "express";
import {
  getAllTours,
  getTourById,
  getToursByTheme,
  createTour,
} from "../controllers/tourController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Public routes
router.get("/", getAllTours);
router.get("/theme/:theme", getToursByTheme);
router.get("/:id", getTourById);

// Admin route (later add role check)
router.post("/", protect, createTour);

export default router;
