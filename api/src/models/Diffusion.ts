const db = require("../config/db");

class Diffusion {
  static async getAllDiffusions() {
    try {
      const diffusions = await db("Diffusion")
        .select("Diffusion.*", "Utilisateur.pseudo as createurPseudo")
        .leftJoin("Utilisateur", "Diffusion.createur", "Utilisateur.email")
        .where("public", true);

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

  static async getById(diffusionId?: string) {
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

  static async getDiffusionByCreateur(diffusionId?: string, email?: string) {
    const diffusion = await db("Diffusion")
      .where({ id: diffusionId, createur: email })
      .first();
    return !!diffusion;
  }

  static async setPublic(diffusionId?: string) {
    try {
      await db("Diffusion").where({ id: diffusionId }).update({ public: true });
    } catch (error) {
      console.error("Erreur lors de la mise à jour de la diffusion:", error);
      throw error;
    }
  }

  static async stopLive(diffusionId?: string) {
    try {
      await db("Diffusion")
        .where({ id: diffusionId })
        .update({ direct: false, public: false, urgence: false });
    } catch (error) {
      console.error("Erreur lors de la mise à jour de la diffusion:", error);
      throw error;
    }
  }

  static async deleteDiffusion(diffusionId?: string) {
    try {
      await db("Diffusion").where({ id: diffusionId }).del();
    } catch (error) {
      console.error("Erreur lors de la suppression de la diffusion:", error);
      throw error;
    }
  }

  static async getVideosByUser(email: string) {
    return db("Diffusion").where({ createur: email });
  }

  static async changeDiffusionInformation(
    diffusionId: string | undefined,
    value: { [p: string]: string },
  ) {
    return db("Diffusion").where({ id: diffusionId }).update(value);
  }
}

export default Diffusion;
