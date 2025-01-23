const mongoose = require('mongoose');

const RelacaoSombraSchema = new mongoose.Schema({
  ID_RELACAO: { type: Number, unique: true }, // Custom ID
  ID_JOGADORES: { type: Number, required: true, ref: 'JOGADORES' }, // Reference to Jogadores
  ID_SOMBRA: { type: Number, required: true, ref: 'EQUIPASOMBRA' }, // Reference to EquipaSombra
  ID_POSICAO: { type: Number, required: true, ref: 'POSICAO' }, // Reference to Posicao
}, { collection: 'RELACAOSOMBRA', versionKey: false });

module.exports = mongoose.model('RELACAOSOMBRA', RelacaoSombraSchema);
