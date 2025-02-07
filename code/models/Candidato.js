const sequelize = require("../config/db");
const {DataTypes} = require("sequelize")

const Candidato = sequelize.define('Candidato',{
    id: {
        type: DataTypes.INTEGER,
        primaryKey : true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull : false,
    },
    party: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    votes: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
    }
},{
    tableName: 'Candidato'  
});



module.exports = Candidato;