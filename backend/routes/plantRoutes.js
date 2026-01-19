import express from "express";
import {
  getAllPlants,
  getPlantById,
  searchPlants,
  recommendPlants,
  getPlantsByTheme
} from "../controllers/plantController.js";


const router = express.Router();

router.get("/", getAllPlants);
router.get("/search", searchPlants);
router.get("/recommend", recommendPlants); 
router.get("/themes/:theme", getPlantsByTheme); // <-- ADD THIS
router.get("/:id", getPlantById);

export default router;
