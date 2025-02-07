const sequelize = require("../config/db");
const { DataTypes } = require("sequelize");
const Votante = require("./Votante");
const Candidato = require("./Candidato");

const Voto = sequelize.define('Voto', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    voter_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Votante,
            key: 'id',
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
    },
    candidate_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Candidato,
            key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
    },
},{
    tableName: 'Voto'  
});

// Definir relaciones correctamente
Votante.hasOne(Voto, { foreignKey: "voter_id" });
Voto.belongsTo(Votante, { foreignKey: "voter_id" });

Candidato.hasMany(Voto, { foreignKey: "candidate_id" });
Voto.belongsTo(Candidato, { foreignKey: "candidate_id" });

module.exports = Voto;
