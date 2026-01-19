import express from "express";
import {
  addBookmark,
  getBookmarks,
} from "../controllers/bookmarkController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Protected routes (temporarily skip protect to avoid error)
router.use(protect);

router.post("/", addBookmark);
router.get("/", getBookmarks);

export default router;
