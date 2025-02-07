const Voto = require('../models/Voto');
const Votante = require('../models/Votante');
const Candidato = require("../models/Candidato")
const sequelize = require("../config/db")


exports.getAllVotos = async (req, res) => {
    const votos = await Voto.findAll();
    res.json(votos);
};
exports.createVoto = async (req, res) => {
    try {
        const { voter_id, candidate_id } = req.body;

        const votante = await Votante.findByPk(voter_id);
        if (!votante) return res.status(404).json({ error: 'Votante no encontrado' });

        if (votante.has_voted) return res.status(400).json({ error: 'El votante ya ha votado' });

        const candidato = await Candidato.findByPk(candidate_id);
        if (!candidato) return res.status(404).json({ error: 'Candidato no encontrado' });

        
        await Voto.create({ voter_id, candidate_id });
        await Votante.update({ has_voted: true }, { where: { id: voter_id } });
        await Candidato.update({ votes: candidato.votes + 1 }, { where: { id: candidate_id } }
        );

        res.status(201).json({ message: 'Voto registrado correctamente' });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al registrar el voto' });
    }
};


exports.getStatistics = async (req, res) => {
    try {
        
        const totalVotos = await Voto.count();

        const votosPorCandidato = await Voto.findAll({
            attributes: [
                'candidate_id',
                [sequelize.fn('COUNT', sequelize.col('candidate_id')), 'total']
            ],
            group: ['candidate_id']
        });

        
        const estadísticas = votosPorCandidato.map(voto => {
            const total = voto.getDataValue('total'); 
            const porcentaje = totalVotos > 0 ? (total / totalVotos) * 100 : 0;

            return {
                candidate_id: voto.candidate_id,
                totalVotos: total,
                porcentaje: porcentaje.toFixed(2) + "%" 
            };
        });

        res.json({ totalVotos, estadísticas });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener estadísticas' });
    }
};
