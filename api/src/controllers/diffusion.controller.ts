import { Request, Response } from "express";
import Diffusion from "../models/Diffusion";

export const getDiffusion = async (req: Request, res: Response) => {
  try {
    const diff = await Diffusion.getAllDiffusions();
    console.log();
    const elementsARetourner = diff.map((element: any) => ({
      id: element.id,
      titre: element.titre,
      createur: element.createurPseudo,
      direct: element.direct,
      urgence: element.urgence,
    }));
    return res.status(200).json({ data: elementsARetourner });
  } catch (error) {
    console.error("Erreur lors du retour des diffusions:", error);
    return res.status(500).json({
      message: "Erreur lors du retour des diffusions:",
    });
  }
};

export const getDiffusionById = async (req: Request, res: Response) => {
  try {
    const diffusionId = req.params.id;

    const diffusion = await Diffusion.getById(diffusionId);

    if (!diffusion) {
      return res.status(404).json({ message: "Diffusion non trouvée." });
    }

    // Retourner la diffusion
    return res.status(200).json({ diffusion });
  } catch (error) {
    console.error(
      "Erreur lors de la récupération de la diffusion par ID:",
      error,
    );
    return res.status(500).json({
      message: "Erreur lors de la récupération de la diffusion par ID.",
    });
  }
};
