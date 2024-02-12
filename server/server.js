import app from './app.js';

app.listen(process.env.PORT, () => {
  console.log(`🦉 Serveur prêt sur le port ${process.env.PORT}`);
})