
const Candidato = require('../models/Candidato');
const Votante = require("../models/Votante")
const jwt = require('jsonwebtoken');
const secretKey = process.env.JWT_SECRET
const { where, Op } = require("sequelize");

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
    const {name} = req.body

    const candidatoExistente = await Candidato.findOne({
        where: {
            name: { [Op.iLike]: name } 
        }
    });
    if (candidatoExistente) {
        return res.status(400).json({ error: 'No puedes registrarte como candidato mas de una vez' });
    }

    const votanteCandidato = await Votante.findOne({
        where: {
            name: { [Op.iLike]: name } 
        }
    });
    if (votanteCandidato) {
        return res.status(400).json({ error: 'No puedes registrarte como candidato si eres votante' });
    }

    const candidato = await Candidato.create(req.body);
    if (!req.body.name) {
        return res.status(400).json({ error: 'El campo "name" es obligatorio' });
    }
     const token = jwt.sign(
            { id: candidato.id, name: candidato.name, email: candidato.email },
            secretKey,
            { expiresIn: '1h' }
        );
    res.status(201).json({ candidato, token });
};

exports.deleteCandidato = async (req, res) => {
    await Candidato.destroy({ where: { id: req.params.id } });
    res.json({ message: 'Candidato eliminado' });
};


