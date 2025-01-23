const mongoose = require('mongoose');

const EventoSchema = new mongoose.Schema({
  ID_EVENTOS: { type: Number, unique: true }, // Custom ID
  DATA: { type: Date, required: true },
  HORA: { type: String, required: true },
  EQUIPA_CASA: { type: String, required: true },
  VISITANTE: { type: String, required: true },
  LOCAL: { type: String, required: true },
  ID_USER: { type: Number, required: true, ref: 'USER' }, // Reference to User's custom ID
}, { collection: 'EVENTOS', versionKey: false });

module.exports = mongoose.model('EVENTOS', EventoSchema);
