import { Request, Response } from "express";
import Utilisateur from "../models/Utilisateur";
import bcrypt from "bcryptjs";
const JwtManager = require("../config/JwtManager");

export const signIn = async (req: Request, res: Response) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Basic ")) {
    return res
      .status(400)
      .json({ message: "En-tête d'authentification Basic manquant" });
  }

  const encodedCredentials = authHeader.split(" ")[1];
  const decodedCredentials = Buffer.from(encodedCredentials, "base64").toString(
    "utf-8",
  );
  const [email, password] = decodedCredentials.split(":");

  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "L'email et le mot de passe sont obligatoires." });
  }

  try {
    const user = await Utilisateur.getUserByEmail(email);
    if (!user) {
      return res.status(404).json({ message: "L'utilisateur n'existe pas" });
    }

    const result = await bcrypt.compare(password, user.motDePasse);

    if (result === true) {
      const token = JwtManager.create(user);

      return res.status(200).json({ token });
    } else {
      return res.status(400).json({ message: "Mot de passe incorrect" });
    }
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

export const signUp = async (req: Request, res: Response) => {
  const { pseudo, email, password } = req.body;

  if (!pseudo || !email || !password) {
    return res.status(400).json({
      message: "Le pseudo, l'email et le mot de passe sont obligatoires.",
    });
  }

  try {
    const user = await Utilisateur.doesUserExist(email);
    if (user) {
      return res.status(400).json({ message: "L'utilisateur existe déjà" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = await Utilisateur.createUser(pseudo, email, hashedPassword);

    return res.status(201).json({ data: newUser });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

export const validate = async (req: Request, res: Response) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(400).json({ message: "Token manquant" });
  }

  const bearer = "Bearer ";
  if (token.startsWith(bearer)) {
    const tokenWithoutBearer = token.slice(bearer.length);

    try {
      const data = await JwtManager.validate(tokenWithoutBearer);

      return res.status(200).json({ data });
    } catch (error) {
      return res.status(401).json({ message: error });
    }
  } else {
    return res.status(401).json({ message: "Format de token non valide" });
  }
};
