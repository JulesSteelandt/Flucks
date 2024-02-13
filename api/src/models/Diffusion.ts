const db = require("../config/db");

class Diffusion {
  static async getAllDiffusions() {
    try {
      const diffusions = await db("Diffusion").select();
      return diffusions;
    } catch (error) {
      console.error("Erreur lors de la récupération des diffusions:", error);
      throw error;
    }
  }
}

export default Diffusion;
