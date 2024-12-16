const mongoose = require('mongoose');

const ClubeSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  abreviatura: { type: String, required: true },
});

module.exports = mongoose.model('Clube', ClubeSchema);

