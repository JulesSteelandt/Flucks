const db = require("../config/db");

class Abonnement {
  static async getAbonnementCount(email: string) {
    try {
      const count = await db("Abonnement")
        .where("abonneur", email)
        .count("* as abonnementCount")
        .first();
      return count ? count.abonnementCount : 0;
    } catch (error) {
      console.error(
        "Erreur lors de la récupération du nombre d'abonnements :",
        error,
      );
      throw error;
    }
  }

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

  static async isFollowing(emailAbonneur: string, emailAbonne: string) {
    const abonnement = await db("Abonnement")
      .where({ abonneur: emailAbonneur, abonne: emailAbonne })
      .first();
    return !!abonnement;
  }

  static async getAbonnements(emailAbonne: string) {
    return db("Abonnement").where({ abonne: emailAbonne });
  }
}

export default Abonnement;
