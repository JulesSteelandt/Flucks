import { Request, Response } from "express";
import Diffusion from "../models/Diffusion";

export const getDiffusion = async (req: Request, res: Response) => {
  try {
    const diff = await Diffusion.getAllDiffusions();

    const elementsARetourner = diff.map((element: any) => ({
      id: element.id,
      titre: element.titre,
      createur: element.createurPseudo,
      direct: element.direct,
      urgence: element.urgence,
      tags: element.tags,
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

    const elementsARetourner = {
      id: diffusion.id,
      titre: diffusion.titre,
      description: diffusion.description,
      vue: diffusion.vue,
      createur: {
        pseudo: diffusion.createurPseudo,
        email: diffusion.createurEmail,
        abonnees: diffusion.abonnementCount,
      },
      direct: diffusion.direct,
      urgence: diffusion.urgence,
      like: diffusion.likeCount,
      geolocalisation: {
        latitude: diffusion.latitude,
        longitude: diffusion.longitude,
      },
      commentaires:
        diffusion.commentaires.length > 0
          ? diffusion.commentaires.map((commentaire: any) => ({
              pseudo: commentaire.pseudo,
              commentaire: commentaire.commentaire,
            }))
          : null,
    };

    // Retourner la diffusion
    return res.status(200).json({ data: elementsARetourner });
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

export const createDiffusion = async (req: Request, res: Response) => {
  try {
    const { titre, description, direct, urgence, tags, geolocalisation } =
      req.body;

    const newDiffusion = await Diffusion.createDiffusion({
      titre,
      description,
      direct,
      urgence,
      tags,
      geolocalisation,
      createur: req.user.email,
    });

    return res.status(201).json({ data: newDiffusion });
  } catch (error) {
    console.error("Erreur lors de la création de la diffusion:", error);
    return res.status(500).json({
      message: "Erreur lors de la création de la diffusion.",
    });
  }
};
