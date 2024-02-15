const db = require("../config/db");

class Diffusion {
  static async getAllDiffusions() {
    try {
      const diffusions = await db("Diffusion")
        .select("Diffusion.*", "Utilisateur.pseudo as createurPseudo")
        .leftJoin("Utilisateur", "Diffusion.createur", "Utilisateur.email");

      const tags = await db("Tag").where(
        "diffusion_id",
        "in",
        diffusions.map((diffusion: any) => diffusion.id),
      );

      diffusions.forEach((diffusion: any) => {
        const tagsForDiffusion = tags
          .filter((tag: any) => tag.diffusion_id === diffusion.id)
          .map((tag: any) => tag.tag);

        diffusion.tags = tagsForDiffusion.length > 0 ? tagsForDiffusion : null;
      });

      return diffusions;
    } catch (error) {
      console.error("Erreur lors de la récupération des diffusions:", error);
      throw error;
    }
  }

  static async getById(diffusionId: string) {
    try {
      const diffusion = await db("Diffusion")
        .select(
          "Diffusion.*",
          "Utilisateur.pseudo as createurPseudo",
          "Utilisateur.email as createurEmail",
          "Geolocalisation.longitude as longitude",
          "Geolocalisation.latitude as latitude",
        )
        .leftJoin("Utilisateur", "Diffusion.createur", "Utilisateur.email")
        .leftJoin(
          "Geolocalisation",
          "Diffusion.geolocalisationId",
          "Geolocalisation.id",
        )
        .where("Diffusion.id", diffusionId)
        .first();

      // Sélectionner le nombre de likes
      const likeCount = await db("Like")
        .count("id as likeCount")
        .where("diffusion", diffusionId)
        .first();
      diffusion.likeCount = likeCount ? likeCount.likeCount : 0;

      const abonnementCount = await db("Abonnement")
        .count("abonneur as abonnementCount")
        .where("abonneur", diffusion.createurEmail)
        .first();
      diffusion.abonnementCount = abonnementCount
        ? abonnementCount.abonnementCount
        : 0;

      // Sélectionner les commentaires
      const commentaires = await db("Commentaire")
        .select("Commentaire.*", "Utilisateur.pseudo as pseudo")
        .leftJoin("Utilisateur", "Commentaire.utilisateur", "Utilisateur.email")
        .where("diffusion", diffusionId);
      diffusion.commentaires = commentaires || [];

      return diffusion;
    } catch (error) {
      console.error(
        "Erreur lors de la récupération de la diffusion par ID",
        error,
      );
      throw error;
    }
  }

  static async createDiffusion(diffusion: Diffusion) {
    try {
      const [id] = await db("Diffusion").insert(diffusion).returning("id");
      return id;
    } catch (error) {
      console.error("Erreur lors de la création de la diffusion:", error);
      throw error;
    }
  }

  static async diffusionExists(diffusionId: string) {
    const diffusion = await db("Diffusion").where({ id: diffusionId }).first();
    return !!diffusion;
  }
}

export default Diffusion;
