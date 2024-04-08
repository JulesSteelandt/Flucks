import { Request, Response } from "express";
import Diffusion from "../models/Diffusion";
import Tag from "../models/Tag";
import Geolocalisation from "../models/Geolocalisation";
import Like from "../models/Like";
import Abonnement from "../models/Abonnement";
import Commentaire from "../models/Commentaire";

const JwtManager = require("../config/JwtManager");
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
    const diffusionId = req.idDiffusion;

    const diffusion = await Diffusion.getById(diffusionId);

    if (!diffusion) {
      return res.status(404).json({ message: "Diffusion non trouvée." });
    }

    const like = await Like.getLikeCount(diffusionId);
    const abonne = await Abonnement.getAbonnementCount(diffusion.createurEmail);
    const commentaires =
      await Commentaire.getCommentaireByDiffusion(diffusionId);

    const token = req.headers.authorization;
    let isLike = false;
    let isAbonne = false;
    if (token !== undefined) {
      try {
        const bearer = "Bearer ";
        if (token.startsWith(bearer)) {
          const tokenWithoutBearer = token.slice(bearer.length);
          const user = JwtManager.validate(tokenWithoutBearer);
          isLike = await Like.isLiked(user.email, diffusionId);
          isAbonne = await Abonnement.isFollowing(
            diffusion.createurEmail,
            user.email,
          );
        }
      } catch (error) {
        console.error("Erreur lors de la validation du token:", error);
      }
    }

    const elementsARetourner = {
      id: diffusion.id,
      titre: diffusion.titre,
      description: diffusion.description,
      vue: diffusion.vue,
      createur: {
        pseudo: diffusion.createurPseudo,
        email: diffusion.createurEmail,
        abonnees: abonne,
      },
      direct: diffusion.direct,
      urgence: diffusion.urgence,
      like: like,
      geolocalisation: {
        latitude: diffusion.latitude,
        longitude: diffusion.longitude,
      },
      isLike: isLike,
      isAbonne: isAbonne,
      commentaires:
        commentaires.length > 0
          ? commentaires.map((commentaire: any) => ({
              id: commentaire.id,
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
      geolocalisationId = geolocalisationId.id;
    }

    await Diffusion.createDiffusion({
      id,
      direct,
      titre,
      vue: 0,
      description,
      public: isPublic,
      createur: user.email,
      geolocalisationId,
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
    const { like } = req.body;

    if (like === null || like === undefined) {
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

    if (!like) {
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

export const addCommentaire = async (req: Request, res: Response) => {
  try {
    const { commentaire } = req.body;

    if (commentaire === null || commentaire === undefined) {
      return res.status(400).json({
        message: "il manque l'information sur le commentaire",
      });
    }

    let user;

    if (req.user !== undefined) {
      user = req.user;
    } else {
      return res.status(403).json({ message: "Token invalide." });
    }

    await Commentaire.createCommentaire({
      utilisateur: user.email,
      diffusion: req.idDiffusion,
      commentaire,
    });

    return res.status(200).json({ message: "Commentaire ajouté." });
  } catch (error) {
    console.error("Erreur lors de l'ajout du commentaire:", error);
    return res.status(500).json({
      message: "Erreur lors de l'ajout du commentaire.",
    });
  }
};

export const setPublic = async (req: Request, res: Response) => {
  try {
    await Diffusion.setPublic(req.idDiffusion);
    return res.status(200).json({ message: "Diffusion modifiée." });
  } catch (error) {
    console.error("Erreur lors de la modification de la diffusion:", error);
    return res.status(500).json({
      message: "Erreur lors de la modification de la diffusion.",
    });
  }
};

export const stopLive = async (req: Request, res: Response) => {
  try {
    await Diffusion.stopLive(req.idDiffusion);
    return res.status(200).json({ message: "Diffusion modifiée." });
  } catch (error) {
    console.error("Erreur lors de la modification de la diffusion:", error);
    return res.status(500).json({
      message: "Erreur lors de la modification de la diffusion.",
    });
  }
};

export const deleteDiffusion = async (req: Request, res: Response) => {
  try {
    await Like.deleteLike(req.idDiffusion);
    await Tag.deleteTag(req.idDiffusion);
    await Geolocalisation.deleteGeolocalisationByDiffusion(req.idDiffusion);
    await Diffusion.deleteDiffusion(req.idDiffusion);
    return res.status(200).json({ message: "Diffusion supprimée." });
  } catch (error) {
    console.error("Erreur lors de la suppression de la diffusion:", error);
    return res.status(500).json({
      message: "Erreur lors de la suppression de la diffusion.",
    });
  }
};

export const changeDiffusionInformations = async (
  req: Request,
  res: Response,
) => {
  try {
    const {
      titre,
      description,
    }: {
      titre: string;
      description: string;
    } = req.body;

    const diffusionId = req.idDiffusion;

    const value: { [key: string]: string } = {};

    if (titre) {
      value["titre"] = titre;
    }

    if (description) {
      value["description"] = description;
    }

    if (Object.keys(value).length === 0) {
      return res.status(400).json({
        message: "Aucune information à modifier.",
      });
    }

    await Diffusion.changeDiffusionInformation(diffusionId, value);
    return res.status(200).json({ message: "Diffusion modifiée." });
  } catch (error) {
    console.error("Erreur lors de la modification de la diffusion:", error);
    return res.status(500).json({
      message: "Erreur lors de la modification de la diffusion.",
    });
  }
};
