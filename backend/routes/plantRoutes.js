import express from "express";
import {
  getAllPlants,
  getPlantById,
  searchPlants,
} from "../controllers/plantController.js";


const router = express.Router();

router.get("/", getAllPlants);
router.get("/search", searchPlants);
router.get("/:id", getPlantById);

export default router;
