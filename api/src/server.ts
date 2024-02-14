import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import userRoutes from "./routes/user.routes";
import diffusionRoute from "./routes/diffusion.route";
import geolocalisationRoute from "./routes/geolocalisation.route";

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors()); // Activez le middleware cors

// Routes
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/users", userRoutes);
app.use("/diffusions", diffusionRoute);
app.use("/geolocalisation", geolocalisationRoute);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
