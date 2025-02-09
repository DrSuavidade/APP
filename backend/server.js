// backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

require('dotenv').config();

app.use(cors());
app.use(express.json());


app.use((req, res, next) => {
  console.log('Body recebido no middleware:', req.body);
  next();
});

app.use('/api', require('./components/Routes/UserRoutes'));


const PORT = process.env.PORT || 3000;

// Conexão ao MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Conectado ao MongoDB'))
  .catch(err => console.error('Erro ao conectar ao MongoDB:', err));

// Teste de Rota
app.get('/', (req, res) => {
  res.send('API Backend está funcionando');
});

const path = require("path");

// Serve React frontend
app.use(express.static(path.join(__dirname, "../frontend/build"))); // Adjust if needed

// Handle React routes (prevents 404 on refresh)
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/build", "index.html")); // Adjust if needed
});


// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});


