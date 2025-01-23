const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  ID_USER: { type: Number, unique: true }, // Custom ID
  NOME: { type: String, required: true },
  EMAIL: { type: String, required: true, unique: true },
  PASSWORD: { type: String, required: true },
  ID_TIPO: { type: Number, required: true, ref: 'TIPOUTILIZADOR' }, // Reference to TipoUtilizador's custom ID
}, { collection: 'USER', versionKey: false });

module.exports = mongoose.model('USER', UserSchema);
