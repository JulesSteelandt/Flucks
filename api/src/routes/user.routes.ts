// user.routes.ts

import express from "express";
import { signIn } from "../controllers/user.controller";

const router = express.Router();

// Route pour rechercher un utilisateur par e-mail
router.post("/signin", signIn);

export default router; // Exportez le routeur par défaut
