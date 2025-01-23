const mongoose = require('mongoose');

const FavoritoSchema = new mongoose.Schema({
  ID_CLUBE: { type: Number, required: true, ref: 'CLUBE' }, // Reference to Clube's custom ID
  ID_USER: { type: Number, required: true, ref: 'USER' }, // Reference to User's custom ID
}, { collection: 'FAVORITOS', versionKey: false });

module.exports = mongoose.model('FAVORITOS', FavoritoSchema);
