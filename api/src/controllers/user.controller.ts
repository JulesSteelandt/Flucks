import { Request, Response } from "express";
import Utilisateur from "../models/Utilisateur";
const bcrypt = require("bcrypt");
const JwtManager = require("../config/JwtManager");

export const signIn = async (req: Request, res: Response) => {
  const { email, password } = req.body;

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
      const token = JwtManager.create({
        username: user.username,
        email: user.email,
      });

      return res.status(200).json({ token });
    } else {
      return res.status(400).json({ message: "Mot de passe incorrect" });
    }
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};
