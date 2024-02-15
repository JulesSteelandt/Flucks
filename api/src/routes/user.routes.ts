// user.routes.ts

import express from "express";
import { getUserByEmail } from "../controllers/user.controller";

const router = express.Router();

// Route pour rechercher un utilisateur par e-mail
router.get("/:email", getUserByEmail);

export default router; // Exportez le routeur par défaut
