const knex = require("knex");
import config from "./config";

const db = knex({
  client: "pg",
  connection: {
    host: config.database.host, // L'hôte de la base de données
    port: config.database.port, // Le port de la base de données
    user: config.database.user, // Le nom d'utilisateur MySQL
    password: config.database.password, // Le mot de passe MySQL
    database: config.database.database, // Le nom de la base de données
  },
});

module.exports = db;
