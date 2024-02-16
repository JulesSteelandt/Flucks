const db = require("../config/db");

class Commentaire {
  static async getCommentaireByDiffusion(diffusionId?: string) {
    try {
      return await db("Commentaire")
        .where("diffusion", diffusionId)
        .select("Commentaire.*", "Utilisateur.pseudo as pseudo")
        .leftJoin(
          "Utilisateur",
          "Commentaire.utilisateur",
          "Utilisateur.email",
        );
    } catch (error) {
      console.error("Erreur lors de la récupération des commentaires:", error);
      throw error;
    }
  }
}

export default Commentaire;
