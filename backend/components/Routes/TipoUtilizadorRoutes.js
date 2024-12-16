const express = require('express');
const Tipoutilizador = require('../Models/TipoUtilizador');
const router = express.Router();

// Adicionar Tipo de Usuário
router.post('/tipoutilizador', async (req, res) => {
  try {
    const { permissoes } = req.body;
    const tipo = new Tipoutilizador({ permissoes });
    await tipo.save();
    res.status(201).json(tipo);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao adicionar tipo de usuário' });
  }
});

module.exports = router;
