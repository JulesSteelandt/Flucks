// user.routes.ts

import express from "express";
import {
  addCommentaire,
  createDiffusion,
  deleteDiffusion,
  getDiffusion,
  getDiffusionById,
  likeDiffusion,
  setPublic,
  stopLive,
} from "../controllers/diffusion.controller";
import { checkToken } from "../middlewares/checkToken";
import { checkDiffusionIdExist } from "../middlewares/checkDiffusionIdExist";
import { checkDiffusionCreateur } from "../middlewares/checkDiffusionCreateur";

const router = express.Router();

router.get("/", getDiffusion);
router.get("/:id", getDiffusionById);
router.post("/create", checkToken, createDiffusion);
router.post("/like", checkToken, checkDiffusionIdExist, likeDiffusion);
router.post("/commentaire", checkToken, checkDiffusionIdExist, addCommentaire);
router.patch(
  "/public",
  checkToken,
  checkDiffusionIdExist,
  checkDiffusionCreateur,
  setPublic,
);
router.patch(
  "/stop",
  checkToken,
  checkDiffusionIdExist,
  checkDiffusionCreateur,
  stopLive,
);
router.delete(
  "/delete",
  checkToken,
  checkDiffusionIdExist,
  checkDiffusionCreateur,
  deleteDiffusion,
);

export default router;
