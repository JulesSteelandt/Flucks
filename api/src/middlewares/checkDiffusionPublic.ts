import { Request, Response, NextFunction } from "express";
import Diffusion from "../models/Diffusion";

export const checkDiffusionPublic = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const diffusionId = req.idDiffusion;
    const publique = await Diffusion.isPublic(diffusionId);
    if (!publique) {
      return res.status(400).json({
        message: "cette diffusion n'est pas publique.",
      });
    }
    next();
  } catch (error) {
    return res.status(500).json({
      message:
        "Une erreur s'est produite lors de la vérification des droits de la diffusion.",
    });
  }
};
