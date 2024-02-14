const db = require("../config/db");

class Utilisateur {
  static async createUser(username: string, email: string, password: string) {
    try {
      const newUser = await db("Utilisateur").insert({
        username,
        email,
        password,
      });
      return newUser;
    } catch (error) {
      throw error;
    }
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
