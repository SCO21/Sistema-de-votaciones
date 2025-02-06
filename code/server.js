const express = require("express");
require('dotenv').config();
const sequelize =  require("./config/db")

const app = express();


//puerto
app.listen(process.env.server_port|| 3000)

//routes
app.get('/', function(req,res) {
    res.send('Working');
});

sequelize.sync({ force: false, alter: true })
  .then(() => {
    console.log('Base de datos sincronizada');
  })
  .catch((error) => {
    console.error('Error al sincronizar la base de datos:', error);
  });
