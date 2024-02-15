// user.routes.ts

import express from "express";
import { signIn, signUp } from "../controllers/user.controller";
import { checkToken } from "../middlewares/checkToken";

const router = express.Router();

router.post("/signin", signIn);
router.post("/signup", signUp);
router.post("/follow", checkToken, follow);

export default router;
