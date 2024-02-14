// user.routes.ts

import express from "express";
import { signIn, signUp, validate } from "../controllers/user.controller";

const router = express.Router();

// Route pour rechercher un utilisateur par e-mail
router.post("/signin", signIn);
router.get("/validate", validate);
router.post("/signup", signUp);

export default router; // Exportez le routeur par défaut
