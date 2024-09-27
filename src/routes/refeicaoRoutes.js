const express = require('express');
const refeicaoController = require('../controllers/refeicaoController');
const autenticarToken = require('../middlewares/authMiddleware');
const router = express.Router();

router.get('/refeicoes', autenticarToken, refeicaoController.listarRefeicoes);
router.post('/refeicoes', autenticarToken, refeicaoController.criarRefeicao);
router.get('/refeicoes/:id', autenticarToken, refeicaoController.buscarRefeicao);
router.put('/refeicoes/:id', autenticarToken, refeicaoController.atualizarRefeicao);
router.delete('/refeicoes/:id', autenticarToken, refeicaoController.deletarRefeicao);

module.exports = router;
