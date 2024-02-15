import { Request, Response } from "express";
import Diffusion from "../models/Diffusion";
import Tag from "../models/Tag";
import Geolocalisation from "../models/Geolocalisation";
import Like from "../models/Like";
const uuid4 = require("uuid4");

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

    if (!titre || direct === null || urgence === null) {
      return res.status(400).json({
        message: "Une des informations est manquante",
      });
    }

    let user;

    if (req.user !== undefined) {
      user = req.user;
    } else {
      return res.status(403).json({ message: "Token invalide." });
    }

    const id = uuid4();

    let isPublic: boolean = false;
    if (direct) {
      isPublic = !isPublic;
    }

    let geolocalisationId = null;
    if (geolocalisation) {
      geolocalisationId = await Geolocalisation.createGeolocalisation(
        geolocalisation.latitude,
        geolocalisation.longitude,
      );
    }

    await Diffusion.createDiffusion({
      id,
      direct,
      titre,
      vue: 0,
      description,
      public: isPublic,
      createur: user.email,
      geolocalisationId: geolocalisationId.id,
      urgence,
    });

    if (tags) {
      for (const tag of tags) {
        await Tag.createTags(id, tag);
      }
    }

    return res
      .status(201)
      .json({ data: { diffusionId: id, message: "Diffusion créée." } });
  } catch (error) {
    console.error("Erreur lors de la création de la diffusion:", error);
    return res.status(500).json({
      message: "Erreur lors de la création de la diffusion.",
    });
  }
};

export const likeDiffusion = async (req: Request, res: Response) => {
  try {
    const { isLike } = req.body;

    if (isLike === null || isLike === undefined) {
      return res.status(400).json({
        message: "il manque l'information sur le like",
      });
    }

    let user;

    if (req.user !== undefined) {
      user = req.user;
    } else {
      return res.status(403).json({ message: "Token invalide." });
    }

    if (isLike) {
      await Like.dislikeDiffusion(user.email, req.idDiffusion);
      return res.status(400).json({ message: "Like supprimé." });
    } else {
      await Like.likeDiffusion(user.email, req.idDiffusion);
      return res.status(200).json({ message: "Like ajouté." });
    }
  } catch (error) {
    console.error("Erreur lors de l'ajout du like:", error);
    return res.status(500).json({
      message: "Erreur lors de l'ajout du like.",
    });
  }
};
