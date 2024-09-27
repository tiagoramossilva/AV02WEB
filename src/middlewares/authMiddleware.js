const jwt = require('jsonwebtoken');
const jwtSecret = 'your_jwt_secret';  // Use uma variável de ambiente para um segredo mais seguro

function autenticarToken(req, res, next) {
  const token = req.headers['authorization'];
  if (!token) return res.status(403).json({ error: 'Token não fornecido' });

  jwt.verify(token, jwtSecret, (err, usuario) => {
    if (err) return res.status(403).json({ error: 'Token inválido' });

    req.usuarioId = usuario.usuarioId;  // Adiciona o id do usuário à requisição
    next();
  });
}

module.exports = autenticarToken;
