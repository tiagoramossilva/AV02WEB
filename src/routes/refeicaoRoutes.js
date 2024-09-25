const express = require('express');
const refeicaoController = require('../controllers/refeicaoController');
const router = express.Router();

router.post('/refeicoes', refeicaoController.criarRefeicao);
router.get('/refeicoes/:id', refeicaoController.buscarRefeicao);
router.put('/refeicoes/:id', refeicaoController.atualizarRefeicao);
router.delete('/refeicoes/:id', refeicaoController.deletarRefeicao);

module.exports = router;
