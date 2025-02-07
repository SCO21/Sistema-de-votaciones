const express = require("express");
require('dotenv').config();
const sequelize =  require("./config/db")
const Votante = require("./models/Votante")
const Candidato = require("./models/Candidato")
const Voto = require("./models/Voto")
const app = express();

const votantesRoutes = require('./routes/votantes.routes');
const candidatosRoutes = require('./routes/candidatos.routes');
const votosRoutes = require('./routes/votos.routes');

app.use(express.json());

app.use('/', votantesRoutes);  
app.use('/', candidatosRoutes); 
app.use('/', votosRoutes);

app.listen(process.env.SERVER_PORT|| 3000)


sequelize.sync({  alter: true }) 
  .then(() => console.log('Base de datos sincronizada correctamente'))
  .catch((error) => console.error('Error al sincronizar la base de datos:', error));
