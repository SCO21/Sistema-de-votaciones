const Voto = require('../models/Voto');
const Votante = require('../models/Votante');
const sequelize = require("../config/db")


exports.getAllVotos = async (req, res) => {
    const votos = await Voto.findAll();
    res.json(votos);
};
exports.createVoto = async (req, res) => {
    const { voter_id, candidate_id } = req.body;

    const votante = await Votante.findByPk(voter_id);
    if (!votante) return res.status(404).json({ error: 'Votante no encontrado' });

    if (votante.has_voted) return res.status(400).json({ error: 'El votante ya ha votado' });

    await Voto.create({ voter_id, candidate_id });
    await Votante.update({ has_voted: true }, { where: { id: voter_id } });

    res.status(201).json({ message: 'Voto registrado correctamente' });
};

exports.getStatistics = async (req, res) => {
    const totalVotos = await Voto.count();
    const votosPorCandidato = await Voto.findAll({
        attributes: ['candidate_id', [sequelize.fn('COUNT', 'candidate_id'), 'total']],
        group: ['candidate_id']
    });

    res.json({ totalVotos, votosPorCandidato });
};
