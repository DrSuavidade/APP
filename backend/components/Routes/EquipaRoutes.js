const express = require('express');
const Equipa = require('../Models/Equipa');
const router = express.Router();

// Adicionar Equipa
router.post('/equipa', async (req, res) => {
  try {
    const { nome, escalao, id_clube } = req.body;
    const equipa = new Equipa({ nome, escalao, id_clube });
    await equipa.save();
    res.status(201).json(equipa);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao adicionar equipa' });
  }
});

// Editar Equipa
router.put('/equipa/:id', async (req, res) => {
  try {
    const { nome, escalao, id_clube } = req.body;
    const equipa = await Equipa.findByIdAndUpdate(req.params.id, { nome, escalao, id_clube }, { new: true });
    res.status(200).json(equipa);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao editar equipa' });
  }
});

// Remover Equipa
router.delete('/equipa/:id', async (req, res) => {
  try {
    await Equipa.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Equipa removida com sucesso' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao remover equipa' });
  }
});

module.exports = router;
