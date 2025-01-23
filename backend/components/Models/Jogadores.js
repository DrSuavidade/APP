const mongoose = require('mongoose');

const JogadorSchema = new mongoose.Schema({
  ID_JOGADORES: { type: Number, unique: true }, // Custom ID
  NOME: { type: String, required: true },
  DATA_NASC: { type: Date, required: true },
  GENERO: { type: String, required: true }, // Added field
  LINK: { type: String }, // Added field
  NACIONALIDADE: { type: String, required: true },
  DADOS_ENC: { type: String }, // Added field
  NOTA_ADM: { type: Number }, // Added field
  STATUS: { type: String, required: true }, // Added field
}, { collection: 'JOGADORES', versionKey: false });

module.exports = mongoose.model('JOGADORES', JogadorSchema);
