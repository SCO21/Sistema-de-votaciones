const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');


const Votante = sequelize.define('Votante',{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type : DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull : false,
        unique: true,
    },
    has_voted: {
        type: DataTypes.BOOLEAN,
        defaultValue : false,
    },
},  {
    tableName: 'Votante'  
});

module.exports = Votante;