// user.routes.ts

import express from "express";
import {
  addCommentaire,
  changeDiffusionInformations,
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
import { checkDiffusionPublic } from "../middlewares/checkDiffusionPublic";

const router = express.Router();

router.get("/", getDiffusion);
router.get("/:id", checkDiffusionIdExist, getDiffusionById);
router.patch(
  "/:id",
  checkToken,
  checkDiffusionIdExist,
  checkDiffusionCreateur,
  changeDiffusionInformations,
);
router.post("/create", checkToken, createDiffusion);
router.post(
  "/like/:id",
  checkToken,
  checkDiffusionIdExist,
  checkDiffusionPublic,
  likeDiffusion,
);
router.post(
  "/commentaire/:id",
  checkToken,
  checkDiffusionIdExist,
  checkDiffusionPublic,
  addCommentaire,
);
router.patch(
  "/public/:id",
  checkToken,
  checkDiffusionIdExist,
  checkDiffusionCreateur,
  setPublic,
);
router.patch(
  "/stop/:id",
  checkToken,
  checkDiffusionIdExist,
  checkDiffusionCreateur,
  stopLive,
);
router.delete(
  "/delete/:id",
  checkToken,
  checkDiffusionIdExist,
  checkDiffusionCreateur,
  deleteDiffusion,
);

export default router;
