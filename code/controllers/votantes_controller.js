const Votante = require('../models/Votante');

exports.getAllVotantes = async (req, res) => {
    const votantes = await Votante.findAll();
    res.json(votantes);
};

exports.getVotanteById = async (req, res) => {
    const votante = await Votante.findByPk(req.params.id);
    if (!votante) return res.status(404).json({ error: 'Votante no encontrado' });
    res.json(votante);
};

exports.createVotante = async (req, res) => {
    const votante = await Votante.create(req.body);
    res.status(201).json(votante);
};

exports.deleteVotante = async (req, res) => {
    await Votante.destroy({ where: { id: req.params.id } });
    res.json({ message: 'Votante eliminado' });
};
