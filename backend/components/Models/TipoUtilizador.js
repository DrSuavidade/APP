const mongoose = require('mongoose');

const TipoUtilizadorSchema = new mongoose.Schema({
  permissoes: { type: String, required: true },
});

module.exports = mongoose.model('Tipoutilizador', TipoUtilizadorSchema);
