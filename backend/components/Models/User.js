const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  id_user: { type: Number, unique: true }, // Custom ID
  nome: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  id_tipo: { type: Number, required: true, ref: 'tipoutilizador' }, // Reference to TipoUtilizador's custom ID
}, { collection: 'user', versionKey: false });

module.exports = mongoose.model('user', UserSchema);
