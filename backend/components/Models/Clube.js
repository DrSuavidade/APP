const mongoose = require('mongoose');

const ClubeSchema = new mongoose.Schema({
  ID_CLUBE: { type: Number, unique: true }, // Custom ID
  NOME: { type: String, required: true },
  ABREVIATURA: { type: String, required: true },
}, { collection: 'CLUBE', versionKey: false });

module.exports = mongoose.model('CLUBE', ClubeSchema);
