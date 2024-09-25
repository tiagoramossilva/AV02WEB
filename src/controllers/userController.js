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
    res.status(500).json({ error: 'Erro ao recuperar métricas' });
  }
}

module.exports = {
  criarUsuario,
  recuperarMetricas,
};
