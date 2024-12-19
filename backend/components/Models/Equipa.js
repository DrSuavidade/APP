const mongoose = require('mongoose');

const EquipaSchema = new mongoose.Schema({
  id_equipa: { type: Number, unique: true }, // Custom ID
  nome: { type: String, required: true },
  escalao: { type: String, required: true },
  id_clube: { type: Number, required: true, ref: 'clube' }, // Link to Clube's custom ID
}, { collection: 'equipa', versionKey: false });

module.exports = mongoose.model('equipa', EquipaSchema);
