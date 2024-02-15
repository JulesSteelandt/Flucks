// user.routes.ts

import express from "express";
import { routeList } from "../controllers/accueil.controller";

const router = express.Router();

// Route pour rechercher un utilisateur par e-mail
router.get("/", routeList);

export default router; // Exportez le routeur par défaut
