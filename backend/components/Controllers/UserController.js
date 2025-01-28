const nodemailer = require('nodemailer');
const User = require('../Models/User');
const TipoUtilizador = require('../Models/TipoUtilizador');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');


const userController = {};

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

//LOGIN
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

userController.recuperarSenha = async (req, res) => {
  const { EMAIL } = req.body;

  try {
    if (!EMAIL) {
      return res.status(400).json({ message: 'O e-mail é obrigatório.' });
    }

    const user = await User.findOne({ EMAIL });

    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado.' });
    }

    // Generate temporary password
    const tempPassword = crypto.randomBytes(4).toString('hex');

    // Hash the temporary password
    const hashedPassword = await bcrypt.hash(tempPassword, 10);

    // Update the user's password in the database
    user.PASSWORD = hashedPassword;
    await user.save();

    // Configure nodemailer with Brevo
    const transporter = nodemailer.createTransport({
      host: 'smtp-relay.brevo.com',
      port: 587,
      auth: {
        user: '848042002@smtp-brevo.com',
        pass: 'pLNFrCIawq32T89g',
      },
    });

    // Email content
    const mailOptions = {
      from: '"Viseu Scouts" <viseuscouts@gmail.com>',
      to: EMAIL,
      subject: 'Recuperação de Senha',
      text: `Sua nova senha temporária é: ${tempPassword}. Por favor, altere-a assim que possível.`,
      html: `<p>Sua nova senha temporária é: <strong>${tempPassword}</strong>.</p>
             <p>Por favor, altere-a assim que possível.</p>`,
    };

    // Send the email
    transporter.sendMail(mailOptions, (err) => {
      if (err) {
        return res.status(500).json({ message: 'Erro ao enviar e-mail.', error: err.message });
      }

      res.status(200).json({ message: 'E-mail enviado com sucesso!' });
    });
  } catch (error) {
    console.error('Erro na recuperação de senha:', error);
    res.status(500).json({ message: 'Erro no servidor.', details: error.message });
  }
};

userController.getUserById = async (req, res) => {
  const { ID_USER } = req.params;

  try {
    // Find the user by ID_USER
    const user = await User.findOne({ ID_USER });

    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado.' });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error('Erro ao buscar usuário:', error);
    res.status(500).json({ message: 'Erro no servidor ao buscar usuário.' });
  }
};


//LISTAR
userController.lastTenUsers = async (req, res) => {
  try {
    // Buscar os 10 últimos usuários
    const users = await User.find({})
      .sort({ ID_USER: -1 })
      .limit(10)
      .select("NOME ID_TIPO");

    // Buscar os nomes dos tipos de utilizadores
    const tipoUtilizadores = await TipoUtilizador.find().select("ID_TIPO PERMISSOES");

    // Mapear os tipos de utilizadores para um objeto para acesso rápido
    const tipoUtilizadorMap = tipoUtilizadores.reduce((map, tipo) => {
      map[tipo.ID_TIPO] = tipo.PERMISSOES;
      return map;
    }, {});

    // Substituir o ID_TIPO pelo nome do tipo
    const usersWithTipo = users.map((user) => ({
      ...user._doc,
      ID_TIPO: tipoUtilizadorMap[user.ID_TIPO] || "Tipo não encontrado",
    }));

    res.status(200).json(usersWithTipo);
  } catch (error) {
    console.error("Erro ao listar os últimos 10 utilizadores:", error);
    res.status(500).json({ error: "Erro ao buscar utilizadores." });
  }
};



//EDIT
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
