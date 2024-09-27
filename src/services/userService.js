const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const saltRounds = 10;
const jwtSecret = 'your_jwt_secret'; 

async function criarUsuario(nome, email, senha) {
  const hashedSenha = await bcrypt.hash(senha, saltRounds);
  return await prisma.usuario.create({
    data: { nome, email, senha: hashedSenha }
  });
}

async function autenticarUsuario(email, senha) {
  const usuario = await prisma.usuario.findUnique({ where: { email } });
  if (!usuario) throw new Error('Usuário não encontrado');
  
  const senhaValida = await bcrypt.compare(senha, usuario.senha);
  if (!senhaValida) throw new Error('Senha inválida');

  // Gerar token JWT
  const token = jwt.sign({ usuarioId: usuario.id }, jwtSecret, { expiresIn: '1h' });

  return { token, usuario };
}

async function listarTodosUsuarios() {
  return await prisma.usuario.findMany(); 
}

async function recuperarMetricasUsuario(usuarioId) {
  const totalRefeicoes = await prisma.refeicao.count({
    where: { usuario: { some: { usuarioId } } },
  });

  const totalRefeicoesDieta = await prisma.refeicao.count({
    where: { usuario: { some: { usuarioId } }, diet: true },
  });

  const totalRefeicoesForaDieta = totalRefeicoes - totalRefeicoesDieta;

  const refeicoesUsuario = await prisma.refeicao.findMany({
    where: { usuario: { some: { usuarioId } } },
    orderBy: { dateTime: 'asc' },
  });

  let melhorSequencia = 0;
  let sequenciaAtual = 0;

  for (const refeicao of refeicoesUsuario) {
    if (refeicao.diet) {
      sequenciaAtual++;
      melhorSequencia = Math.max(melhorSequencia, sequenciaAtual);
    } else {
      sequenciaAtual = 0;
    }
  }

  return { totalRefeicoes, totalRefeicoesDieta, totalRefeicoesForaDieta, melhorSequencia };
}

module.exports = {
  criarUsuario,
  autenticarUsuario,
  listarTodosUsuarios, 
  recuperarMetricasUsuario,
};
