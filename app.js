const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./src/routes/userRoutes');
const refeicaoRoutes = require('./src/routes/refeicaoRoutes');
const authRoutes = require('./src/routes/authRoutes');  // Importa as rotas de autenticação

const app = express();
app.use(bodyParser.json());

app.use('/api', userRoutes);
app.use('/api', refeicaoRoutes);
app.use('/api', authRoutes);  // Usa as rotas de autenticação

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});

module.exports = app;
