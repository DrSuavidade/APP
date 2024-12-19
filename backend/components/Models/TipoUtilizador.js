const mongoose = require('mongoose');

const TipoUtilizadorSchema = new mongoose.Schema({
  id_tipo: { type: Number, unique: true }, // Custom ID
  permissoes: { type: String, required: true },
}, { collection: 'tipoutilizador', versionKey: false });

module.exports = mongoose.model('tipoutilizador', TipoUtilizadorSchema);
