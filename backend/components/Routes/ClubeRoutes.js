const express = require('express');
const Clube = require('../Models/Clube');
const router = express.Router();

// Adicionar Clube
router.post('/clube', async (req, res) => {
  try {
    const { nome, abreviatura } = req.body;
    const clube = new Clube({ nome, abreviatura });
    await clube.save();
    res.status(201).json(clube);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao adicionar clube' });
  }
});

// Editar Clube
router.put('/clube/:id', async (req, res) => {
  try {
    const { nome, abreviatura } = req.body;
    const clube = await Clube.findByIdAndUpdate(req.params.id, { nome, abreviatura }, { new: true });
    res.status(200).json(clube);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao editar clube' });
  }
});

// Remover Clube
router.delete('/clube/:id', async (req, res) => {
  try {
    await Clube.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Clube removido com sucesso' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao remover clube' });
  }
});

module.exports = router;
