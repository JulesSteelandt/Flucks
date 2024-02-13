const db = require("../config/db");

class Diffusion {
  static async getAllDiffusions() {
    try {
      const diffusions = await db("Diffusion")
        .select("Diffusion.*", "Utilisateur.pseudo as createurPseudo")
        .leftJoin("Utilisateur", "Diffusion.createur", "Utilisateur.email");
      return diffusions;
    } catch (error) {
      console.error("Erreur lors de la récupération des diffusions:", error);
      throw error;
    }
  }

  static async getById(diffusionId: string) {
    try {
      const diffusion = await db("Diffusion")
        .select("Diffusion.*", "Utilisateur.pseudo as createurPseudo")
        .leftJoin("Utilisateur", "Diffusion.createur", "Utilisateur.email")
        .where("Diffusion.id", diffusionId)
        .first();
      return diffusion;
    } catch (error) {
      console.error(
        "Erreur lors de la récupération de la diffusion par ID",
        error,
      );
      throw error;
    }
  }
}

export default Diffusion;
