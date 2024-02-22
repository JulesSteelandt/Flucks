import { Request, Response, NextFunction } from "express";
import Diffusion from "../models/Diffusion";

export const checkDiffusionCreateur = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    let idDiffusion;
    if (req.idDiffusion !== undefined) {
      idDiffusion = req.idDiffusion;
    } else {
      return res.status(403).json({ message: "Id diffusion invalide." });
    }

    let user;
    if (req.user !== undefined) {
      user = req.user;
    } else {
      return res.status(403).json({ message: "Token invalide." });
    }

    const diff = await Diffusion.getDiffusionByCreateur(
      idDiffusion,
      user.email,
    );

    if (!diff) {
      return res.status(400).json({
        message: "cette diffusion n'a pas été créée par cet utilisateur.",
      });
    }
    next();
  } catch (error) {
    return res.status(500).json({
      message:
        "Une erreur s'est produite lors de la vérification du créateur de la diffusion.",
    });
  }
};
