import express from "express";
import {
  createProject,
  getAllProjects,
  getProjectById,
  deleteProjectById,
} from "../controllers/projectController.js";
import { upload } from "../config/cloudinary.js";

const router = express.Router();

router.post("/", upload.single("image"), createProject);

router.get("/", getAllProjects);
router.get("/:id", getProjectById);
router.delete("/:id", deleteProjectById);

export default router;
