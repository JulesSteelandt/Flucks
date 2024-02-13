// user.routes.ts

import express from "express";
import { getDiffusion } from "../controllers/diffusion.controller";

const router = express.Router();

// Route pour rechercher un utilisateur par e-mail
router.get("/", getDiffusion);

export default router; // Exportez le routeur par défaut
