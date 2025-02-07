const express = require('express');
const router = express.Router();
const candidatesController = require('../controllers/candidatos_controller');

router.post('/candidates', candidatesController.createCandidato);
router.get('/candidates', candidatesController.getAllCandidatos);
router.get('/candidates/:id', candidatesController.getCandidatoById);
router.delete('/candidates/:id', candidatesController.deleteCandidato);

module.exports = router;
