import express from "express";
import {
  register,
  login,
  getAllUsers,
} from "../controllers/userController.js";
import { verifyToken } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Route to register a new user
router.post("/register", register);

// Route to login a user
router.post("/login", login);

// Route to get all users (protected)
router.get("/", getAllUsers);



export default router;
