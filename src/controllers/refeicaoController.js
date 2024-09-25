const refeicaoService = require('../services/refeicaoService');

async function criarRefeicao(req, res) {
  try {
    const { nome, descricao, dateTime, diet, usuarioId } = req.body;
    const novaRefeicao = await refeicaoService.criarRefeicao(nome, descricao, dateTime, diet, usuarioId);
    res.status(201).json(novaRefeicao);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar refeição' });
  }
}

async function buscarRefeicao(req, res) {
  try {
    const { id } = req.params;
    const refeicao = await refeicaoService.buscarRefeicao(id);
    res.status(200).json(refeicao);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar refeição' });
  }
}

async function atualizarRefeicao(req, res) {
  try {
    const { id } = req.params;
    const dadosAtualizados = req.body;
    const refeicaoAtualizada = await refeicaoService.atualizarRefeicao(id, dadosAtualizados);
    res.status(200).json(refeicaoAtualizada);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar refeição' });
  }
}

async function deletarRefeicao(req, res) {
  try {
    const { id } = req.params;
    await refeicaoService.deletarRefeicao(id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Erro ao deletar refeição' });
  }
}

module.exports = {
  criarRefeicao,
  buscarRefeicao,
  atualizarRefeicao,
  deletarRefeicao,
};
