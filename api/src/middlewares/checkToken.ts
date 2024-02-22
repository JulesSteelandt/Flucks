// checkToken.js
import { NextFunction, Request, Response } from "express";

const JwtManager = require("../config/JwtManager");

export const checkToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization;
  if (!token) {
    return res
      .status(401)
      .json({ message: "Pas de token fourni. Authentification refusée." });
  }

  const bearer = "Bearer ";
  if (token.startsWith(bearer)) {
    const tokenWithoutBearer = token.slice(bearer.length);
    try {
      req.user = JwtManager.validate(tokenWithoutBearer);
      next();
    } catch (error) {
      console.error(error);
      res.status(403).json({ message: "Token invalide." });
    }
  } else {
    return res.status(401).json({ message: "Token invalide." });
  }
};
