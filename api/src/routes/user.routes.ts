// user.routes.ts

import express from "express";
import { signIn, signUp } from "../controllers/user.controller";

const router = express.Router();

router.post("/signin", signIn);
router.post("/signup", signUp);
router.post("/follow", signUp);

export default router;
