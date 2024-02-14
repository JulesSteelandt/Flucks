import { Request, Response } from "express";
import Geolocalisation from "../models/Geolocalisation";
export const getGeolocalisation = async (req: Request, res: Response) => {
  try {
    const data = await Geolocalisation.getGeolocalisation(); // Utilisation de la méthode getGeolocalisation

    const elementsARetourner = data.map((element: any) => ({
      id: element.id,
      geolocalisation: {
        latitude: element.latitude,
        longitude: element.longitude,
      }, // Correction ici
      diffusionId: element.diffusionId,
    }));

    return res.status(200).json({ data: elementsARetourner });
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des données de géolocalisation:",
      error,
    );
    return res.status(500).json({
      message: "Erreur lors de la récupération des données de géolocalisation.",
    });
  }
};
