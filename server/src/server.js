import app from './app.js';
import apiRouter from "./routes/apiRouter.js";

app.listen(process.env.PORT, () => {
  console.log(`🦉 Serveur prêt sur le port ${process.env.PORT}`);
})