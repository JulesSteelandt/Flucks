const db = require("../config/db");

class Like {
  static async likeDiffusion(email: string, diffusionId?: string) {
    try {
      const like = await db("Like").insert({
        diffusion: diffusionId,
        utilisateur: email,
      });
      return like;
    } catch (error) {
      console.error("Erreur lors de l'ajout du like:", error);
      throw error;
    }
  }

  static async dislikeDiffusion(email: string, diffusionId?: string) {
    try {
      const dislike = await db("Like")
        .where({ diffusion: diffusionId, utilisateur: email })
        .del();
      return dislike;
    } catch (error) {
      console.error("Erreur lors de la suppression du like:", error);
      throw error;
    }
  }
}

export default Like;
