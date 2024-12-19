const mongoose = require('mongoose');

const JogadorSchema = new mongoose.Schema({
  id_jogadores: { type: Number, unique: true }, // Custom ID
  nome: { type: String, required: true },
  data_nasc: { type: Date, required: true },
  nacionalidade: { type: String, required: true },
  id_equipa: { type: Number, required: true, ref: 'equipa' }, // Link to Equipa's custom ID
}, { collection: 'jogadores', versionKey: false });

module.exports = mongoose.model('jogadores', JogadorSchema);
