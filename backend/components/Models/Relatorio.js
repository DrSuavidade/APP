const mongoose = require('mongoose');

const RelatorioSchema = new mongoose.Schema({
  ID_RELATORIOS: { type: Number, unique: true }, // Custom ID
  TECNICA: { type: Number, required: true },
  VELOCIDADE: { type: Number, required: true },
  COMPETITIVA: { type: Number, required: true },
  INTELIGENCIA: { type: Number, required: true },
  ALTURA: { type: String, required: true },
  MORFOLOGIA: { type: String, required: true },
  COMENTARIO: { type: String },
  STATUS: { type: String, required: true },
  ID_USER: { type: Number, required: true, ref: 'USER' }, // Reference to User's custom ID
  ID_JOGADORES: { type: Number, ref: 'JOGADORES' }, // Reference to Jogadores' custom ID
  COMENTARIO_ADM: { type: String }, // Added field
  DATA: { type: Date, required: true },
  NOTA: { type: Number }, // Added field
}, { collection: 'RELATORIOS', versionKey: false });

module.exports = mongoose.model('RELATORIOS', RelatorioSchema);
