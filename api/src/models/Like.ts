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

  static async deleteLike(diffusionId?: string) {
    try {
      const dislike = await db("Like").where("diffusion", diffusionId).del();
      return dislike;
    } catch (error) {
      console.error("Erreur lors de la suppression des likes:", error);
      throw error;
    }
  }

  static async isLiked(email: string, diffusionId?: string) {
    const like = await db("Like")
      .where({ utilisateur: email, diffusion: diffusionId })
      .first();
    return !!like;
  }

  static async getLikeCount(diffusionId?: string) {
    try {
      const count = await db("Like")
        .where("diffusion", diffusionId)
        .count("* as likeCount")
        .first();
      return count ? count.likeCount : 0;
    } catch (error) {
      console.error(
        "Erreur lors de la récupération du nombre de likes :",
        error,
      );
      throw error;
    }
  }
}

export default Like;
