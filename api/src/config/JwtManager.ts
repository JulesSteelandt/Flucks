const jwt = require("jsonwebtoken");
import config from "./config";

class JwtManager {
  /**
   * Crée un jwt à partir d'infos utilisateur : username et email
   *
   * @param {Object} user un objet contenant le username et l'email de l'utilisateur
   * @returns {string} un token jwt sous forme de string
   */
  static create(user) {
    const payload = {
      iss: "pizza-shop.auth.db",
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + parseInt(config.jwt.expiresIn),
      upr: {
        username: user.username,
        email: user.email,
      },
    };

    return jwt.sign(payload, config.jwt.secret, { algorithm: "HS512" });
  }

  /**
   * Valide un jwt et retourne son payload
   *
   * @param {string} token le token jwt sous forme de string
   * @returns {Object} le payload du jwt sous forme d'objet JavaScript
   * @throws {Error} si le token est expiré, invalide ou indéchiffrable
   */
  static validate(token) {
    try {
      return jwt.verify(token, config.jwt.secret);
    } catch (err) {
      if (err instanceof jwt.TokenExpiredError) {
        throw new Error("Expired JWT");
      } else if (err instanceof jwt.JsonWebTokenError) {
        throw new Error("Invalid JWT");
      } else {
        throw new Error("Unprocessable JWT");
      }
    }
  }
}

module.exports = JwtManager;
