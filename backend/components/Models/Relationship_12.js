const mongoose = require('mongoose');

const Relationship12Schema = new mongoose.Schema({
  ID_JOGADORES: { type: Number, required: true, ref: 'JOGADORES' }, // Reference to Jogadores
  ID_EVENTOS: { type: Number, required: true, ref: 'EVENTOS' }, // Reference to Eventos
}, { collection: 'RELATIONSHIP_12', versionKey: false });

module.exports = mongoose.model('RELATIONSHIP_12', Relationship12Schema);
