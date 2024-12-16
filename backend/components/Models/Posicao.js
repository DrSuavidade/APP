const mongoose = require('mongoose');

const PosicaoSchema = new mongoose.Schema({
  nome: { type: String, required: true },
});

module.exports = mongoose.model('Posicao', PosicaoSchema);
