const express = require("express");
require('dotenv').config();
const sequelize =  require("./config/db")
const Votante = require("./models/Votante")
const Candidato = require("./models/Candidato")
const Voto = require("./models/Voto")
const app = express();

const votantesRoutes = require('./routes/votantes_routes');
const candidatosRoutes = require('./routes/candidatos_routes');
const votosRoutes = require('./routes/votos_routes');


app.use('/', votantesRoutes);  
app.use('/', candidatosRoutes); 
app.use('/', votosRoutes);

app.listen(process.env.SERVER_PORT|| 5000)


sequelize.sync({ force: false, alter: true })
  .then(() => {
    console.log('Base de datos sincronizada');
  })
  .catch((error) => {
    console.error('Error al sincronizar la base de datos:', error);
  });
