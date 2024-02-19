// user.routes.ts

import express from "express";
import {
  follow,
  getAbonnements,
  signIn,
  signUp,
  video,
} from "../controllers/user.controller";
import { checkToken } from "../middlewares/checkToken";

const router = express.Router();

router.post("/signin", signIn);
router.post("/signup", signUp);
router.post("/follow", checkToken, follow);
router.get("/video", checkToken, video);
router.get("/abonnement", checkToken, getAbonnements);

export default router;
