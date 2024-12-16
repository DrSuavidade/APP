const express = require('express');
const Jogador = require('../Models/Jogadores');
const router = express.Router();

// Adicionar Jogador
router.post('/jogador', async (req, res) => {
  try {
    const { nome, data_nasc, nacionalidade, id_equipa } = req.body;
    const jogador = new Jogador({ nome, data_nasc, nacionalidade, id_equipa });
    await jogador.save();
    res.status(201).json(jogador);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao adicionar jogador' });
  }
});

// Editar Jogador
router.put('/jogador/:id', async (req, res) => {
  try {
    const { nome, data_nasc, nacionalidade, id_equipa } = req.body;
    const jogador = await Jogador.findByIdAndUpdate(req.params.id, { nome, data_nasc, nacionalidade, id_equipa }, { new: true });
    res.status(200).json(jogador);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao editar jogador' });
  }
});

// Remover Jogador
router.delete('/jogador/:id', async (req, res) => {
  try {
    await Jogador.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Jogador removido com sucesso' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao remover jogador' });
  }
});

module.exports = router;
