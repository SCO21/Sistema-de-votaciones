const express = require('express');
const router = express.Router();
const votosControllers = require("../controllers/votos_controller");
const authMiddleware = require("../middlewares/autenticacion")

router.get('/votes',authMiddleware, votosControllers.getAllVotos);
router.post('/votes',authMiddleware, votosControllers.createVoto);
router.get('/votes/statistics',authMiddleware, votosControllers.getStatistics)

module.exports = router