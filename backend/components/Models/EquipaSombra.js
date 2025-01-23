const mongoose = require('mongoose');

const EquipaSombraSchema = new mongoose.Schema({
  ID_SOMBRA: { type: Number, unique: true }, // Custom ID
  ID_USER: { type: Number, required: true, ref: 'USER' }, // Reference to User's custom ID
}, { collection: 'EQUIPASOMBRA', versionKey: false });

module.exports = mongoose.model('EQUIPASOMBRA', EquipaSombraSchema);
