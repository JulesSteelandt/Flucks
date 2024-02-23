import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import userRoutes from "./routes/user.routes";
import diffusionRoute from "./routes/diffusion.route";
import geolocalisationRoute from "./routes/geolocalisation.route";
import accueilRoutes from "./routes/accueil.routes";

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors()); // Activez le middleware cors

// Routes
app.use("/users", userRoutes);
app.use("/diffusions", diffusionRoute);
app.use("/geolocalisation", geolocalisationRoute);
app.use("/", accueilRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
