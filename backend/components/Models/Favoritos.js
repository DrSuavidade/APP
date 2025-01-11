const mongoose = require('mongoose');

const FavoritoSchema = new mongoose.Schema({
  id_favoritos: { type: Number, unique: true }, // Custom ID  
  id_clube: { type: Number, required: true, ref: 'clube' }, // Link to Clube's custom ID
  id_user: { type: Number, required: true, ref: 'user' }, // Link to User's custom ID
}, { collection: 'favoritos', versionKey: false });

module.exports = mongoose.model('favoritos', FavoritoSchema);
