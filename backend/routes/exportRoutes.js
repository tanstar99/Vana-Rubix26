import express from "express";
import { exportPlantsCSV } from "../controllers/exportController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/plants", protect, exportPlantsCSV);

export default router;
