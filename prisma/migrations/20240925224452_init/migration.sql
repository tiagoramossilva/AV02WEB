-- CreateTable
CREATE TABLE "Usuario" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Refeicao" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nome" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "dateTime" DATETIME NOT NULL,
    "diet" BOOLEAN NOT NULL
);

-- CreateTable
CREATE TABLE "UsuarioRefeicao" (
    "usuarioId" TEXT NOT NULL,
    "refeicaoId" TEXT NOT NULL,

    PRIMARY KEY ("usuarioId", "refeicaoId"),
    CONSTRAINT "UsuarioRefeicao_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "UsuarioRefeicao_refeicaoId_fkey" FOREIGN KEY ("refeicaoId") REFERENCES "Refeicao" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_email_key" ON "Usuario"("email");
