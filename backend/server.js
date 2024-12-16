// backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

require('dotenv').config();

app.use(cors());
app.use(express.json());

app.use('/api/users', require('./components/Routes/UserRoutes'));
app.use('/api', require('./components/Routes/TipoUtilizadorRoutes'));
app.use('/api', require('./components/Routes/ClubeRoutes'));
app.use('/api', require('./components/Routes/EquipaRoutes'));
app.use('/api', require('./components/Routes/JogadoresRoutes'));
app.use('/api', require('./components/Routes/EventosRoutes'));
app.use('/api', require('./components/Routes/RelatorioRoutes'));
app.use('/api', require('./components/Routes/FavoritosRoutes'));




const PORT = process.env.PORT || 3000;

// Conexão ao MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Conectado ao MongoDB'))
  .catch(err => console.error('Erro ao conectar ao MongoDB:', err));

// Teste de Rota
app.get('/', (req, res) => {
  res.send('API Backend está funcionando');
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
