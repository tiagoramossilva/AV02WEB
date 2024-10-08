const userService = require('../services/userService');

async function criarUsuario(req, res) {
  try {
    const { nome, email, senha } = req.body;
    const novoUsuario = await userService.criarUsuario(nome, email, senha);
    res.status(201).json(novoUsuario);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar usuário' });
  }
}

async function recuperarMetricas(req, res) {
  try {
    const { usuarioId } = req.params;
    const metricas = await userService.recuperarMetricasUsuario(usuarioId);
    res.status(200).json(metricas);
  } catch (error) {
    console.error('Erro ao recuperar métricas:', error);  
    res.status(500).json({ error: `Erro ao recuperar métricas: ${error.message}` });
  }
}


async function listarUsuarios(req, res) {
  try {
    const usuarios = await userService.listarTodosUsuarios();
    res.status(200).json(usuarios);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao listar usuários' });
  }
}

module.exports = {
  criarUsuario,
  recuperarMetricas,
  listarUsuarios, 
};
