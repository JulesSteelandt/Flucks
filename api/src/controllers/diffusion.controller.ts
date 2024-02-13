import { Request, Response } from "express";
import Diffusion from "../models/Diffusion";

export const getDiffusion = async (req: Request, res: Response) => {
  try {
    const diff = await Diffusion.getAllDiffusions();
    return res.status(200).json({ diff });
  } catch (error) {
    console.error("Erreur lors du retour des diffusions:", error);
    return res.status(500).json({
      message: "Erreur lors du retour des diffusions:",
    });
  }
};
