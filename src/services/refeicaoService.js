const prisma = require('../models/prismaClient');

async function criarRefeicao(nome, descricao, dateTime, diet, usuarioId) {
  return await prisma.refeicao.create({
    data: {
      nome,
      descricao,
      dateTime,
      diet,
      usuarios: { create: { usuarioId } },
    },
  });
}

async function buscarRefeicao(id) {
  return await prisma.refeicao.findUnique({ where: { id } });
}

async function atualizarRefeicao(id, dadosAtualizados) {
  return await prisma.refeicao.update({ where: { id }, data: dadosAtualizados });
}

async function deletarRefeicao(id) {
  return await prisma.refeicao.delete({ where: { id } });
}

module.exports = {
  criarRefeicao,
  buscarRefeicao,
  atualizarRefeicao,
  deletarRefeicao,
};
