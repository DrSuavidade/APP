const User = require('../Models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userController = {};

userController.registar = async (req, res) => {
  const { nome, email, password, id_tipo } = req.body;

  try {
    // Find the highest current id_user in the collection
    const maxUser = await User.findOne().sort({ id_user: -1 }).select('id_user');
    
    // Calculate the new id_user, start from 1 if no users exist
    const id_user = maxUser ? maxUser.id_user + 1 : 1;

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the new user with the incremented id_user (do not set _id manually)
    const user = new User({ 
      nome, 
      email, 
      password: hashedPassword, 
      id_tipo, 
      id_user 
    });

    // Save the user
    await user.save();

    res.status(201).json({ message: 'Usuário criado com sucesso!', user });
  } catch (error) {
    console.error('Erro ao criar usuário:', error);
    res.status(500).json({ error: 'Erro ao criar usuário' });
  }
};

userController.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: 'Usuário não encontrado' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ error: 'Credenciais inválidas' });

    const token = jwt.sign({ id: user._id }, 'SECRET_KEY', { expiresIn: '1h' });
    res.status(200).json({ token, user });
  } catch (error) {
    res.status(500).json({ error: 'Erro no login do usuário' });
  }
};

userController.editUser = async (req, res) => {
  const { id_user } = req.params;
  const { nome, email, password, id_tipo } = req.body;

  try {
    const user = await User.findOne({ id_user });
    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    if (nome) user.nome = nome;
    if (email) user.email = email;
    if (password) user.password = await bcrypt.hash(password, 10);
    if (id_tipo) user.id_tipo = id_tipo;

    const updatedUser = await user.save();
    res.status(200).json({ message: 'Usuário atualizado com sucesso!', user: updatedUser });
  } catch (error) {
    console.error('Erro ao atualizar usuário:', error);
    res.status(500).json({ error: 'Erro ao atualizar usuário' });
  }
};

userController.deleteUser = async (req, res) => {
  const { id_user } = req.params;

  try {
    const deletedUser = await User.findOneAndDelete({ id_user });
    if (!deletedUser) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    res.status(200).json({ message: 'Usuário deletado com sucesso!', user: deletedUser });
  } catch (error) {
    console.error('Erro ao deletar usuário:', error);
    res.status(500).json({ error: 'Erro ao deletar usuário' });
  }
};

module.exports = userController;
