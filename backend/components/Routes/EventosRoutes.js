const express = require('express');
const Evento = require('../Models/Eventos');
const router = express.Router();

// Adicionar Evento
router.post('/evento', async (req, res) => {
  try {
    const { data, hora, equipa_casa, visitante, local, id_relatorio } = req.body;
    const evento = new Evento({ data, hora, equipa_casa, visitante, local, id_relatorio });
    await evento.save();
    res.status(201).json(evento);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao adicionar evento' });
  }
});

module.exports = router;
