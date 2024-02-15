// user.routes.ts

import express from "express";
import {
  createDiffusion,
  getDiffusion,
  getDiffusionById, likeDiffusion,
} from '../controllers/diffusion.controller';
import { checkToken } from "../middlewares/checkToken";

const router = express.Router();

router.get("/", getDiffusion);
router.get("/:id", getDiffusionById);
router.post("/create", checkToken, createDiffusion);
router.post("/like", checkToken, likeDiffusion);

export default router; // Exportez le routeur par défaut
