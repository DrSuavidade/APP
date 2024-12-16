const mongoose = require('mongoose');

const JogadorSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  data_nasc: { type: Date, required: true },
  nacionalidade: { type: String, required: true },
  id_equipa: { type: mongoose.Schema.Types.ObjectId, ref: 'Equipa', required: true },
});

module.exports = mongoose.model('Jogador', JogadorSchema);
