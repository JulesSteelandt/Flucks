import { Request, Response } from "express";
import Utilisateur from "../models/Utilisateur";

export const getUserByEmail = async (req: Request, res: Response) => {
  const email = req.params.email;

  try {
    const user = await Utilisateur.getUserByEmail(email);
    if (user) {
      // Si un utilisateur est trouvé, retournez-le
      return res.status(200).json({ user });
    } else {
      // Si aucun utilisateur correspondant n'est trouvé, retournez une réponse avec un message approprié
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }
  } catch (error) {
    // En cas d'erreur, retournez une réponse avec le code d'erreur approprié et un message d'erreur
    console.error(
      "Erreur lors de la recherche de l'utilisateur par e-mail:",
      error,
    );
    return res
      .status(500)
      .json({
        message: "Erreur serveur lors de la recherche de l'utilisateur",
      });
  }
};
