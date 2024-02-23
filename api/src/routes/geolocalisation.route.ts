// user.routes.ts

import express from "express";
import { getGeolocalisation } from "../controllers/geolocalisation.controller";

const router = express.Router();

router.get("/", getGeolocalisation);

export default router;
