const db = require("../config/db");

class Geolocalisation {
  static async getGeolocalisationByDirect() {
    try {
      const geolocalisations = await db("Geolocalisation")
        .join("Diffusion", "Geolocalisation.id", "Diffusion.geolocalisationId")
        .where("Diffusion.direct", true)
        .select(
          "Geolocalisation.*",
          "Diffusion.id as diffusionId",
          "Diffusion.titre",
          "Diffusion.urgence",
        );

      return geolocalisations;
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des géolocalisations:",
        error,
      );
      throw error;
    }
  }

  static async createGeolocalisation(latitude: number, longitude: number) {
    try {
      const [id] = await db("Geolocalisation")
        .insert({ latitude, longitude })
        .returning("id");
      return id;
    } catch (error) {
      console.error(
        "Erreur lors de la création de la géolocalisation :",
        error,
      );
      throw error;
    }
  }

  static async deleteGeolocalisationByDiffusion(diffusionId?: string) {
    try {
      const geolocalisation = await db("Geolocalisation")
        .select("Geolocalisation.id")
        .join("Diffusion", "Geolocalisation.id", "Diffusion.geolocalisationId")
        .where("Diffusion.id", diffusionId)
        .first();

      if (geolocalisation) {
        await db("Geolocalisation").where("id", geolocalisation.id).del();
      }
    } catch (error) {
      console.error(
        "Erreur lors de la suppression de la géolocalisation :",
        error,
      );
      throw error;
    }
  }
}

export default Geolocalisation;
