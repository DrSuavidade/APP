const mongoose = require('mongoose');

const EquipaSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  escalao: { type: String, required: true },
  id_clube: { type: mongoose.Schema.Types.ObjectId, ref: 'Clube', required: true },
});

module.exports = mongoose.model('Equipa', EquipaSchema);
