import express from "express";
import { registerUser } from "../controller/auth.controller.js";
import { loginUser, getCurrentUser } from "../controller/auth.controller.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

// POST register
router.post("/register", registerUser);

// POST login
router.post("/login", loginUser);

// POST logout
// router.post("/logout", logoutUser);

// GET middleware
router.get('/me', authMiddleware, getCurrentUser);

export default router;