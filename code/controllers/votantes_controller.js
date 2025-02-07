const Votante = require('../models/Votante');
const Candidato = require("../models/Candidato")
const jwt = require('jsonwebtoken');
const secretKey = process.env.JWT_SECRET
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
    

    const votanteExistente = await Votante.findOne({where : {name}})
    if(votanteExistente){
        return res.status(400).json({ error: 'No puedes registrarte como votante mas de una vez' });
    }

    const votante = await Votante.create(req.body);
    
    
    const token = jwt.sign(
        { id: votante.id, name: votante.name, email: votante.email },
        secretKey,
        { expiresIn: '1h' }
    );
    res.status(201).json({ votante, token });

};

exports.deleteVotante = async (req, res) => {
    await Votante.destroy({ where: { id: req.params.id } });
    res.json({ message: 'Votante eliminado' });
};
