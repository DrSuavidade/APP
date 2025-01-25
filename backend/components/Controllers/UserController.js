const User = require('../Models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userController = {};
/*
userController.registar = async (req, res) => {
  const { NOME, EMAIL, PASSWORD, ID_TIPO } = req.body;

  try {
    // Find the highest current id_user in the collection
    const maxUser = await User.findOne().sort({ ID_USER: -1 }).select('ID_USER');
    
    // Calculate the new id_user, start from 1 if no users exist
    const ID_USER = maxUser ? maxUser.ID_USER + 1 : 1;

    // Hash the password
    const hashedPassword = await bcrypt.hash(PASSWORD, 10);

    // Create the new user with the incremented id_user (do not set _id manually)
    const user = new User({ 
      NOME, 
      EMAIL, 
      PASSWORD: hashedPassword, 
      ID_TIPO, 
      ID_USER 
    });

    // Save the user
    await user.save();

    res.status(201).json({ message: 'Usuário criado com sucesso!', user });
  } catch (error) {
    console.error('Erro ao criar usuário:', error);
    res.status(500).json({ error: 'Erro ao criar usuário' });
  }
};*/

userController.registar = async (req, res) => {
  const { ID_TIPO, NOME, EMAIL, PASSWORD } = req.body;

  try {
      // Verifica se o EMAIL já existe
      const existingEmail = await User.findOne({ EMAIL });
      if (existingEmail) {
          return res.status(400).json({ message: 'E-mail já registrado.' });
      }

      // Busca o maior ID_USER existente
      const lastUser = await User.findOne().sort({ ID_USER: -1 }); // Ordena pelo maior ID_USER
      const newId = lastUser ? lastUser.ID_USER + 1 : 1; // Incrementa ou começa com 1

      // Gera o hash da senha
      const hashedPassword = await bcrypt.hash(PASSWORD, 10);

      // Cria o novo usuário
      const newUser = new User({
          ID_USER: newId,
          ID_TIPO,
          NOME,
          EMAIL,
          PASSWORD: hashedPassword
      });

      // Salva o novo usuário no banco
      await newUser.save();

      res.status(201).json({
          message: 'Usuário registrado com sucesso!',
          user: {
              ID_USER: newUser.ID_USER,
              ID_TIPO: newUser.ID_TIPO,
              NOME: newUser.NOME,
              EMAIL: newUser.EMAIL
          }
      });
  } catch (error) {
      console.error('Erro ao registrar usuário:', error);
      res.status(500).json({ message: 'Erro no servidor.' });
  }
};

userController.registoweb = async (req, res) => {
  const { NOME, EMAIL, PASSWORD } = req.body;

  try {
    // Verifica se o EMAIL já existe
    const existingEmail = await User.findOne({ EMAIL });
    if (existingEmail) {
      return res.status(400).json({ message: 'E-mail já registrado.' });
    }

    // Busca o maior ID_USER existente
    const lastUser = await User.findOne().sort({ ID_USER: -1 }); // Ordena pelo maior ID_USER
    const newId = lastUser ? lastUser.ID_USER + 1 : 1; // Incrementa ou começa com 1

    // Gera o hash da senha
    const hashedPassword = await bcrypt.hash(PASSWORD, 10);

    // Cria o novo usuário com ID_TIPO fixo como 1
    const newUser = new User({
      ID_USER: newId,
      ID_TIPO: 1, // Valor fixo
      NOME,
      EMAIL,
      PASSWORD: hashedPassword,
    });

    // Salva o novo usuário no banco
    await newUser.save();

    res.status(201).json({
      message: 'Usuário registrado com sucesso!',
      user: {
        ID_USER: newUser.ID_USER,
        ID_TIPO: newUser.ID_TIPO,
        NOME: newUser.NOME,
        EMAIL: newUser.EMAIL,
      },
    });
  } catch (error) {
    console.error('Erro ao registrar usuário:', error);
    res.status(500).json({ message: 'Erro no servidor.' });
  }
};
/*
userController.login = async (req, res) => {
  const { EMAIL, PASSWORD } = req.body;

  try {
    const user = await User.findOne({ EMAIL });
    if (!user) return res.status(404).json({ error: 'Usuário não encontrado' });

    const isMatch = await bcrypt.compare(PASSWORD, user.PASSWORD);
    if (!isMatch) return res.status(401).json({ error: 'Credenciais inválidas' });

    const token = jwt.sign({ id: user._id }, 'SECRET_KEY', { expiresIn: '1h' });
    res.status(200).json({ token, user });
  } catch (error) {
    res.status(500).json({ error: 'Erro no login do usuário' });
  }
};*/

userController.login = async (req, res) => {
  console.log("Iniciando processo de login...");
  const { EMAIL, PASSWORD } = req.body;

  try {
    // Check if EMAIL and PASSWORD are provided
    if (!EMAIL || !PASSWORD) {
      console.log("E-mail ou senha não fornecidos.");
      return res.status(400).json({ message: 'E-mail e Password são obrigatórios.' });
    }

    // Fetch user from the database
    const user = await User.findOne({ EMAIL });
    console.log("Usuário encontrado:", user);

    // If user doesn't exist
    if (!user) {
      console.log("E-mail não encontrado.");
      return res.status(401).json({ message: 'E-mail ou Password inválidos.' });
    }

    // Check if PASSWORD is valid
    const isPasswordValid = await bcrypt.compare(PASSWORD, user.PASSWORD);
    if (!isPasswordValid) {
      console.log("Password inválida.");
      return res.status(401).json({ message: 'E-mail ou Password inválidos.' });
    }

    console.log("Login bem-sucedido. Gerando token...");

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, ID_USER: user.ID_USER, ID_TIPO: user.ID_TIPO },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    // Return token and user information in the response
    return res.status(200).json({
      token,
      USER: {
        ID_USER: user.ID_USER,
        NOME: user.NOME,
        EMAIL: user.EMAIL,
        ID_TIPO: user.ID_TIPO,
      },
      message: 'Login realizado com sucesso.'
    });
  } catch (error) {
    console.error('Erro no processo de login:', error);
    return res.status(500).json({ message: 'Erro no servidor.' });
  }
};




userController.editUser = async (req, res) => {
  const { ID_USER } = req.params;
  const { NOME, EMAIL, PASSWORD, ID_TIPO } = req.body;

  try {
    const user = await User.findOne({ ID_USER });
    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    if (NOME) user.NOME = NOME;
    if (EMAIL) user.EMAIL = EMAIL;
    if (PASSWORD) user.PASSWORD = await bcrypt.hash(PASSWORD, 10);
    if (ID_TIPO) user.ID_TIPO = ID_TIPO;

    const updatedUser = await user.save();
    res.status(200).json({ message: 'Usuário atualizado com sucesso!', user: updatedUser });
  } catch (error) {
    console.error('Erro ao atualizar usuário:', error);
    res.status(500).json({ error: 'Erro ao atualizar usuário' });
  }
};

userController.deleteUser = async (req, res) => {
  const { ID_USER } = req.params;

  try {
    const deletedUser = await User.findOneAndDelete({ ID_USER });
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
