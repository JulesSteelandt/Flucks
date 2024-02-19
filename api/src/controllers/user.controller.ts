import { Request, Response } from "express";
import Utilisateur from "../models/Utilisateur";
import bcrypt from "bcryptjs";
import Abonnement from "../models/Abonnement";
import Diffusion from "../models/Diffusion";
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

    await Utilisateur.createUser(pseudo, email, hashedPassword);

    return res.status(201).json({ message: "Le compte a bien été crée" });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

export const follow = async (req: Request, res: Response) => {
  const { email, abonne } = req.body;

  if (!email) {
    return res.status(400).json({ message: "L'email est obligatoire." });
  }

  if (abonne === null || abonne === undefined) {
    return res.status(400).json({
      message: "il manque l'information sur l'abonnement",
    });
  }

  try {
    const user = await Utilisateur.getUserByEmail(email);
    if (!user) {
      return res.status(404).json({ message: "L'utilisateur n'existe pas" });
    }

    const follower = (req as any).user;

    if (follower.email === email) {
      return res
        .status(400)
        .json({ message: "Vous ne pouvez pas vous suivre vous-même" });
    }

    if (!abonne) {
      await Abonnement.unfollow(email, follower.email);
      return res
        .status(200)
        .json({ message: "Vous ne suivez plus cet utilisateur" });
    } else {
      await Abonnement.follow(email, follower.email);
      return res.status(200).json({ message: "Vous suivez cet utilisateur" });
    }
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

export const video = async (req: Request, res: Response) => {
  const user = (req as any).user;
  const data = await Diffusion.getVideosByUser(user.email);

  return res.status(200).json({ data });
};

export const videoById = async (req: Request, res: Response) => {
  const data = await Diffusion.getById((req as any).idDiffusion);
  return res.status(200).json({ data });
};

export const getAbonnements = async (req: Request, res: Response) => {
  const user = (req as any).user;
  const data = await Abonnement.getAbonnements(user.email);
  console.log(data);
  if (data.length === 0) {
    return res.status(200).json({ data: { message: "aucun abonnement" } });
  }
  return res.status(200).json({ data });
};
