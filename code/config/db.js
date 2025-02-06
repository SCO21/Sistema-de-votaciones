const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      dialect: 'postgres',
      logging: false,  
    }
);

sequelize.sync({ force: false, alter: true })
  .then(() => {
    console.log('Base de datos sincronizada correctamente');
    return sequelize.getQueryInterface().showAllTables();
  })
  .then((tables) => {
    console.log('Tablas en la base de datos:', tables);
  })
  .catch((error) => {
    console.error('Error al sincronizar la base de datos:', error);
  });

module.exports = sequelize;
