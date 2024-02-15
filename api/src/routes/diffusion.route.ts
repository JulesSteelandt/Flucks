// user.routes.ts

import express from "express";
import {
  createDiffusion,
  getDiffusion,
  getDiffusionById,
  likeDiffusion,
} from "../controllers/diffusion.controller";
import { checkToken } from "../middlewares/checkToken";
import { checkDiffusionIdExist } from "../middlewares/checkDiffusionIdExist";

const router = express.Router();

router.get("/", getDiffusion);
router.get("/:id", getDiffusionById);
router.post("/create", checkToken, createDiffusion);
router.post("/like", checkToken, checkDiffusionIdExist, likeDiffusion);

export default router;
