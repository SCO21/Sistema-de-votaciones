const express = require('express');
const router = express.Router();
const votantesController = require('../controllers/votantes_controller');

router.post('/voters', votantesController.createVotante);
router.get('/voters', votantesController.getAllVotantes);
router.get('/voters/:id', votantesController.getVotanteById);
router.delete('/voters/:id', votantesController.deleteVotante);

module.exports = router;
