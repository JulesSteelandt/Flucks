// user.routes.ts

import express from "express";
import { getGeolocalisation } from "../controllers/geolocalisation.controller";

const router = express.Router();

// Route pour rechercher un utilisateur par e-mail
router.get("/", getGeolocalisation);

export default router; // Exportez le routeur par défaut
