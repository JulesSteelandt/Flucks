import { Request, Response, NextFunction } from "express";
import Diffusion from "../models/Diffusion";

export const checkDiffusionIdExist = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    let { diffusionId } = req.body;
    if (!diffusionId) {
      diffusionId = req.params.id;
      if (!diffusionId) {
        return res
          .status(400)
          .json({ message: "il manque l'id de la diffusion." });
      }
    }

    const diff = await Diffusion.diffusionExists(diffusionId);
    if (!diff) {
      return res
        .status(400)
        .json({ message: "cette id de diffusion n'existe pas." });
    }
    req.idDiffusion = diffusionId;
    next();
  } catch (error) {
    return res.status(500).json({
      message:
        "Une erreur s'est produite lors de la vérification de l'existence de la diffusion.",
    });
  }
};
