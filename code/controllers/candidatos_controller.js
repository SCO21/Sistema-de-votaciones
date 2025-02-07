const Candidato = require('../models/Candidato');

exports.getAllCandidatos = async (req, res) => {
    const candidatos = await Candidato.findAll();
    res.json(candidatos);
};

exports.getCandidatoById = async (req, res) => {
    const candidato = await Candidato.findByPk(req.params.id);
    if (!candidato) return res.status(404).json({ error: 'Candidato no encontrado' });
    res.json(candidato);
};

exports.createCandidato = async (req, res) => {
    const candidato = await Candidato.create(req.body);
    console.log(req.body);
    if (!req.body.name) {
        return res.status(400).json({ error: 'El campo "name" es obligatorio' });
    }
    res.status(201).json(candidato);
};

exports.deleteCandidato = async (req, res) => {
    await Candidato.destroy({ where: { id: req.params.id } });
    res.json({ message: 'Candidato eliminado' });
};

