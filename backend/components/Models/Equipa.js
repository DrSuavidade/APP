const mongoose = require('mongoose');

const EquipaSchema = new mongoose.Schema({
  ID_EQUIPA: { type: Number, unique: true }, // Custom ID
  NOME: { type: String, required: true },
  ESCALAO: { type: String, required: true },
  ID_CLUBE: { type: Number, required: true, ref: 'CLUBE' }, // Reference to Clube's custom ID
}, { collection: 'EQUIPA', versionKey: false });

module.exports = mongoose.model('EQUIPA', EquipaSchema);
