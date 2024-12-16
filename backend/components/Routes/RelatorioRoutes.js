const express = require('express');
const Relatorio = require('../Models/Relatorio');
const router = express.Router();

// Adicionar Relatório
router.post('/relatorio', async (req, res) => {
  try {
    const { tecnica, velocidade, competitiva, inteligencia, altura, morfoligia, comentario, status, id_user, id_jogadores, data } = req.body;
    const relatorio = new Relatorio({ tecnica, velocidade, competitiva, inteligencia, altura, morfoligia, comentario, status, id_user, id_jogadores, data });
    await relatorio.save();
    res.status(201).json(relatorio);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao adicionar relatório' });
  }
});

module.exports = router;
