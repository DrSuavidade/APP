const mongoose = require('mongoose');

const RelatorioSchema = new mongoose.Schema({
  id_relatorios: { type: Number, unique: true }, // Custom ID
  tecnica: { type: Number, required: true },
  velocidade: { type: Number, required: true },
  competitiva: { type: Number, required: true },
  inteligencia: { type: Number, required: true },
  altura: { type: Number, required: true },
  morfologia: { type: String, required: true },
  comentario: { type: String },
  status: { type: String, required: true },
  id_user: { type: Number, required: true, ref: 'user' }, // Reference to User's custom ID
  id_jogadores: { type: Number, required: true, ref: 'jogadores' }, // Reference to Jogadores' custom ID
  data: { type: Date, required: true },
}, { collection: 'relatorios', versionKey: false });

module.exports = mongoose.model('relatorios', RelatorioSchema);
