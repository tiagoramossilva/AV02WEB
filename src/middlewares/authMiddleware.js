const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT_SECRET || 'your_jwt_secret';  

function autenticarToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];  // Pega apenas o token, sem o "Bearer"
  
  if (!token) return res.status(403).json({ error: 'Token não fornecido' });

  jwt.verify(token, jwtSecret, (err, usuario) => {
    if (err) return res.status(403).json({ error: 'Token inválido' });

    req.usuarioId = usuario.usuarioId;  // Adiciona o id do usuário à requisição
    next();
  });
}

module.exports = autenticarToken;
