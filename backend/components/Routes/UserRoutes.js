const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../Models/User');
const router = express.Router();

// Registrar Usuário
router.post('/register', async (req, res) => {
    //console.log('Requisição recebida:', req.body); // Log do corpo da requisição
    const { nome, email, password, id_tipo } = req.body;
  
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      console.log('Senha criptografada:', hashedPassword);
  
      const user = new User({ nome, email, password: hashedPassword, id_tipo });
      await user.save();
  
      console.log('Usuário salvo:', user);
      res.status(201).json({ message: 'Usuário criado com sucesso!', user });
    } catch (error) {
      console.error('Erro ao criar usuário:', error);
      res.status(500).json({ error: 'Erro ao criar usuário' });
    }
  });

// Login do Usuário
router.post('/login', async (req, res) => {
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
});

module.exports = router;
