const db = require("../config/db");

class Geolocalisation {
  static async getGeolocalisation() {
    try {
      const geolocalisations =
        await db("Geolocalisation").select("Geolocalisation.*");

      // Récupérer les ID des diffusions liées à chaque géolocalisation
      for (const geolocalisation of geolocalisations) {
        const diffusionIds = await db("Diffusion")
          .where("geolocalisationId", geolocalisation.id)
          .pluck("id");

        const diffusionId = diffusionIds.length > 0 ? diffusionIds[0] : null;

        geolocalisation.diffusionId = diffusionId;
      }

      return geolocalisations;
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des géolocalisations:",
        error,
      );
      throw error;
    }
  }
}

export default Geolocalisation;
