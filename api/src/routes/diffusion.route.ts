// user.routes.ts

import express from "express";
import {
  getDiffusion,
  getDiffusionById,
} from "../controllers/diffusion.controller";

const router = express.Router();

router.get("/", getDiffusion);
router.get("/:id", getDiffusionById);
router.post("/create", createDiffusion);

export default router; // Exportez le routeur par défaut
