const mongoose = require('mongoose');

const PosicaoSchema = new mongoose.Schema({
  id_posicao: { type: Number, unique: true }, // Custom ID  
  nome: { type: String, required: true },
}, { collection: 'posicao', versionKey: false });

module.exports = mongoose.model('posicao', PosicaoSchema);
