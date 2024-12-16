const mongoose = require('mongoose');

const EventoSchema = new mongoose.Schema({
  data: { type: Date, required: true },
  hora: { type: String, required: true },
  equipa_casa: { type: String, required: true },
  visitante: { type: String, required: true },
  local: { type: String, required: true },
  id_relatorio: { type: mongoose.Schema.Types.ObjectId, ref: 'Relatorio' },
});

module.exports = mongoose.model('Evento', EventoSchema);
