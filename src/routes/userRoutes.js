const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();

router.post('/usuarios', userController.criarUsuario);
router.get('/usuarios/:usuarioId/metricas', userController.recuperarMetricas);

module.exports = router;
