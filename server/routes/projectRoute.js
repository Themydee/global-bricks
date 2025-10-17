import express from "express";
import {
  createProject,
  getAllProjects,
  getProjectById,
  deleteProjectById,
} from "../controllers/projectController.js";
import { uploadProjectImage } from "../config/cloudinary.js";

const router = express.Router();

// Public routes
router.get("/", getAllProjects);
router.get("/:id", getProjectById);

// Protected/Admin routes (you can add auth middleware later)
router.post("/", uploadProjectImage.single("image"), createProject);
router.delete("/:id", deleteProjectById);


export default router;
