const express = require('express');
const router = express.Router();
const votosControllers = require("../controllers/votos_controller");

router.get('/votes', votosControllers.getAllVotos);
router.post('/votes', votosControllers.createVoto);
router.post('/votes/statistics', votosControllers.getStatistics)

module.exports = router