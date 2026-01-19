import express from "express";
import { addNote, getNotes } from "../controllers/noteController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(protect);

router.post("/", addNote);
router.get("/", getNotes);

export default router;
