// server.ts

import express from "express";
import bodyParser from "body-parser";
import userRoutes from "./routes/user.routes"; // Importez le routeur par défaut

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// Routes
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Utilisation des routes de l'utilisateur
app.use("/users", userRoutes); // Utilisez le routeur par défaut

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
