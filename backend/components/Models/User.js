const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  id_tipo: { type: mongoose.Schema.Types.ObjectId, ref: 'Tipoutilizador' },
});

module.exports = mongoose.model('User', UserSchema);

