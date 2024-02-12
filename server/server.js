import app from './app.js';

app.listen(process.env.PORT, () => {
  console.log(`🦉 Serveur prêt sur le port ${process.env.PORT}`);
})

app.use("/routes", apiRouter)

app.get("/", (req, res) => res.send("Hello depuis la racine"))