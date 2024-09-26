const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function criarUsuario(nome, email, senha) {
  return await prisma.usuario.create({
    data: { nome, email, senha }
  });
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
  listarTodosUsuarios, 
  recuperarMetricasUsuario,
};
