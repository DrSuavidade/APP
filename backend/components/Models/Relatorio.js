const mongoose = require('mongoose');

const RelatorioSchema = new mongoose.Schema({
  tecnica: { type: Number, required: true },
  velocidade: { type: Number, required: true },
  competitiva: { type: Number, required: true },
  inteligencia: { type: Number, required: true },
  altura: { type: Number, required: true },
  morfoligia: { type: String, required: true },
  comentario: { type: String },
  status: { type: String, required: true },
  id_user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  id_jogadores: { type: mongoose.Schema.Types.ObjectId, ref: 'Jogador', required: true },
  data: { type: Date, required: true },
});

module.exports = mongoose.model('Relatorio', RelatorioSchema);
