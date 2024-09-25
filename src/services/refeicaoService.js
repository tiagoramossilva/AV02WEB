const prisma = require('../models/prismaClient');

async function criarRefeicao(nome, descricao, dateTime, diet, usuarioId) {
  try {
    const novaRefeicao = await prisma.refeicao.create({
      data: {
        nome,
        descricao,
        dateTime,
        diet,
      },
    });

    await prisma.usuarioRefeicao.create({
      data: {
        usuarioId,
        refeicaoId: novaRefeicao.id, 
      },
    });

    return novaRefeicao;
  } catch (error) {
    console.error('Erro ao criar refeição ou associar usuário:', error);
    throw error; 
  }
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
