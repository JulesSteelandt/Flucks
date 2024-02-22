// user.routes.ts

import express from "express";
import {
  follow,
  getAbonnements,
  signIn,
  signUp,
  video,
  videoById,
} from "../controllers/user.controller";
import { checkToken } from "../middlewares/checkToken";
import { checkDiffusionCreateur } from "../middlewares/checkDiffusionCreateur";
import { checkDiffusionIdExist } from "../middlewares/checkDiffusionIdExist";

const router = express.Router();

router.post("/signin", signIn);
router.post("/signup", signUp);
router.post("/follow", checkToken, follow);
router.get("/video", checkToken, video);
router.get(
  "/video/:id",
  checkToken,
  checkDiffusionIdExist,
  checkDiffusionCreateur,
  videoById,
);
router.get("/abonnement", checkToken, getAbonnements);

export default router;
