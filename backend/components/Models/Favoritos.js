const mongoose = require('mongoose');

const FavoritoSchema = new mongoose.Schema({
  id_clube: { type: mongoose.Schema.Types.ObjectId, ref: 'Clube', required: true },
  id_user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
});

module.exports = mongoose.model('Favorito', FavoritoSchema);
