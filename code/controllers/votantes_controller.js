const Votante = require('../models/Votante');
const Candidato = require("../models/Candidato")

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
    const { name } = req.body;
    const candidatoVotante = await Candidato.findOne({ where: { name } });

        if (candidatoVotante) {
            return res.status(400).json({ error: 'No puedes registrarte como votante si eres candidato' });
        }
    const votanteExistente = Votante.findOne({where : {name}})
    if(votanteExistente){
        return res.status(400).json({ error: 'No puedes registrarte como votante mas de una vez' });
    }
    const votante = await Votante.create(req.body);
    res.status(201).json(votante);
};

exports.deleteVotante = async (req, res) => {
    await Votante.destroy({ where: { id: req.params.id } });
    res.json({ message: 'Votante eliminado' });
};
