const mongoose = require('mongoose');

const EventoSchema = new mongoose.Schema({
  id_eventos: { type: Number, unique: true }, // Custom ID
  data: { type: Date, required: true },
  hora: { type: String, required: true },
  equipa_casa: { type: String, required: true },
  visitante: { type: String, required: true },
  local: { type: String, required: true },
  id_relatorio: { type: Number, required: true, ref: 'relatorios' }, // Reference to Relatorio's custom ID
}, { collection: 'eventos', versionKey: false });

module.exports = mongoose.model('eventos', EventoSchema);
