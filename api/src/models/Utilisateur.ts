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
    try {
      const user = await db("Utilisateur").where({ email }).first();
      return user;
    } catch (error) {
      throw error;
    }
  }

  static async getUserByUsername(username: string) {
    try {
      const user = await db("Utilisateur").where({ username }).first();
      return user;
    } catch (error) {
      throw error;
    }
  }

  static async doesUserExist(email: string) {
    try {
      const user = await db("Utilisateur").where({ email }).first();
      return user ? true : false;
    } catch (error) {
      throw error;
    }
  }
}

export default Utilisateur;
