const mongoose = require('mongoose');

const Relationship11Schema = new mongoose.Schema({
  ID_EQUIPA: { type: Number, required: true, ref: 'EQUIPA' }, // Reference to Equipa
  ID_JOGADORES: { type: Number, required: true, ref: 'JOGADORES' }, // Reference to Jogadores
}, { collection: 'RELATIONSHIP_11', versionKey: false });

module.exports = mongoose.model('RELATIONSHIP_11', Relationship11Schema);
