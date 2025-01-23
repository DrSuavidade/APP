const mongoose = require('mongoose');

const PosicaoSchema = new mongoose.Schema({
  ID_POSICAO: { type: Number, unique: true }, // Custom ID
  NOME: { type: String, required: true },
}, { collection: 'POSICAO', versionKey: false });

module.exports = mongoose.model('POSICAO', PosicaoSchema);
