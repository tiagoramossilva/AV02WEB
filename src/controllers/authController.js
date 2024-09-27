const userService = require('../services/userService');

async function login(req, res) {
  try {
    const { email, senha } = req.body;
    const { token, usuario } = await userService.autenticarUsuario(email, senha);
    res.status(200).json({ token, usuario });
  } catch (error) {
    res.status(401).json({ error: 'Credenciais inválidas' });
  }
}

module.exports = { login };
