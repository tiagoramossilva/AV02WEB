const refeicaoService = require('../services/refeicaoService');

async function criarRefeicao(req, res) {
  try {
    const { nome, descricao, dateTime, diet, usuarioId } = req.body;
    console.log('Requisição para criar refeição:', req.body);  

    const novaRefeicao = await refeicaoService.criarRefeicao(nome, descricao, dateTime, diet, usuarioId);
    
    console.log('Refeição criada:', novaRefeicao); 

    res.status(201).json(novaRefeicao);
  } catch (error) {
    console.error('Erro ao criar refeição:', error);  
    res.status(500).json({ error: 'Erro ao criar refeição', details: error.message });
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
