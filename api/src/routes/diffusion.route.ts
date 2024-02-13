// user.routes.ts

import express from "express";
import {
  getDiffusion,
  getDiffusionById,
} from "../controllers/diffusion.controller";

const router = express.Router();

// Route pour rechercher un utilisateur par e-mail
router.get("/", getDiffusion);
router.get("/:id", getDiffusionById);

export default router; // Exportez le routeur par défaut
