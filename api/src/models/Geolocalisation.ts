const db = require("../config/db");

class Geolocalisation {
  static async getGeolocalisation() {
    try {
      const geolocalisation =
        await db("Geolocalisation").select("Geolocalisation.*");

      const diffusions = await db("Diffusion").whereIn(
        "geolocalisationId",
        geolocalisation.map((loc) => loc.id),
      );

      diffusions.forEach((diffusion) => {
        const localForDiffusion = geolocalisation.find(
          (loc) => loc.id === diffusion.geolocalisationId,
        );

        diffusion.geolocalisation = localForDiffusion || null;
      });

      return geolocalisation;
    } catch (error) {
      console.error(
        "Erreur lors de la récupération de la géolocalisation:",
        error,
      );
      throw error;
    }
  }
}

export default Geolocalisation;
