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
    console.error('Erro ao atualizar refeição:', error); 
    res.status(500).json({ error: 'Erro ao atualizar refeição', details: error.message }); 
  }
}

async function deletarRefeicao(req, res) {
  try {
    const { id } = req.params;
    console.log(`Tentando deletar a refeição com ID: ${id}`); 
    const resultado = await refeicaoService.deletarRefeicao(id);
    console.log('Refeição deletada:', resultado); 
    res.status(204).send();
  } catch (error) {
    console.error('Erro ao deletar refeição:', error); 
    res.status(500).json({ error: 'Erro ao deletar refeição' });
  }
}

async function listarRefeicoes(req, res) {
  try {
    const refeicoes = await refeicaoService.listarRefeicoes();
    res.status(200).json(refeicoes);
  } catch (error) {
    console.error('Erro ao listar refeições:', error);
    res.status(500).json({ error: 'Erro ao listar refeições' });
  }
}

module.exports = {
  criarRefeicao,
  buscarRefeicao,
  atualizarRefeicao,
  deletarRefeicao,
  listarRefeicoes,
};
