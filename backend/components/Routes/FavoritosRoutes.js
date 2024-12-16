const express = require('express');
const Favorito = require('../Models/Favoritos');
const router = express.Router();

// Adicionar Favorito
router.post('/favoritos', async (req, res) => {
  try {
    const { id_clube, id_user } = req.body;
    const favorito = new Favorito({ id_clube, id_user });
    await favorito.save();
    res.status(201).json(favorito);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao adicionar favorito' });
  }
});

module.exports = router;
