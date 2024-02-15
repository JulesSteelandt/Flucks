const db = require("../config/db");

class Utilisateur {
  static async createUser(pseudo: string, email: string, password: string) {
    return db("Utilisateur").insert({
      pseudo,
      email,
      motDePasse: password,
      listeDeProximite: false,
    });
  }
  static async getUserByEmail(email: string) {
    return db("Utilisateur").where({ email }).first();
  }

  static async doesUserExist(email: string) {
    const user = await db("Utilisateur").where({ email }).first();
    return !!user;
  }
}

export default Utilisateur;
