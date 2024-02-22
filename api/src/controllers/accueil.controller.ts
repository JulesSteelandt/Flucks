import { Request, Response } from "express";
const expressListEndpoints = require("express-list-endpoints");

export const routeList = (req: Request, res: Response) => {
  const routes = expressListEndpoints(req.app)
    .map((route: any) => `${route.methods.join(", ")} -> ${route.path}`)
    .join("\n\n<br><br>");

  res.send(`Liste des routes :\n<br><br>${routes}`);
};
