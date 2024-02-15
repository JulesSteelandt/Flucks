// checkToken.js
import { Request, Response } from "express";
import Diffusion from "../models/Diffusion";

const JwtManager = require("../config/JwtManager");

export const checkDiffusionIdExist = (
  req: Request,
  res: Response,
  next: any,
) => {
  const { diffusionId } = req.body;
  const diff = Diffusion.diffusionExists(diffusionId);
  if (!diff) {
    return res.status(400).json({ message: "Id de diffusion manquant." });
  }
  next();
};
