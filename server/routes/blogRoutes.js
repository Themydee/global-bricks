// routes/blogRoutes.js
import express from "express";
import {
  createBlog,
  getAllBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
} from "../controllers/blogController.js";
import { uploadBlogImage } from "../config/cloudinary.js";

const router = express.Router();

// Public routes
router.get("/", getAllBlogs);
router.get("/:id", getBlogById);

// Protected routes with Cloudinary upload middleware
router.post("/", uploadBlogImage.single("image"), createBlog);
router.put("/:id", uploadBlogImage.single("image"), updateBlog);
router.delete("/:id", deleteBlog);

export default router;
