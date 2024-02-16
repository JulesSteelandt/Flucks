const db = require("../config/db");

class Abonnement {
  static async follow(emailAbonneur: string, emailAbonne: string) {
    try {
      return await db("Abonnement").insert({
        abonneur: emailAbonneur,
        abonne: emailAbonne,
        notification: false,
      });
    } catch (error) {
      console.error("Erreur lors de l'abonnement :", error);
      throw error;
    }
  }

  static async unfollow(emailAbonneur: string, emailAbonne: string) {
    try {
      return await db("Abonnement")
        .where({ abonneur: emailAbonneur, abonne: emailAbonne })
        .del();
    } catch (error) {
      console.error("Erreur lors de la suppression de l'abonnement :", error);
      throw error;
    }
  }
}

export default Abonnement;
