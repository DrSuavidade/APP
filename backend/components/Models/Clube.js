const mongoose = require('mongoose');

const ClubeSchema = new mongoose.Schema({
  id_clube: { type: Number, unique: true }, // Custom ID
  nome: { type: String, required: true },
  abreviatura: { type: String, required: true },
}, { collection: 'clube', versionKey: false });

module.exports = mongoose.model('clube', ClubeSchema);
