const mongoose = require('mongoose');

const TipoUtilizadorSchema = new mongoose.Schema({
  ID_TIPO: { type: Number, unique: true }, // Custom ID
  PERMISSOES: { type: String, required: true },
}, { collection: 'TIPOUTILIZADOR', versionKey: false });

module.exports = mongoose.model('TIPOUTILIZADOR', TipoUtilizadorSchema);
