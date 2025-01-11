const Jogadores = require('../Models/Jogadores');
const Jogador = require('../Models/Jogadores');

const jogadoresController = {};

// Add a new player
jogadoresController.addJogador = async (req, res) => {
    const { nome, data_nasc, nacionalidade, id_equipa } = req.body;

    try {
        // Fetch the highest current id_jogadores in the collection
        const maxJogador = await Jogadores.findOne().sort({ id_jogadores: -1 }).select('id_jogadores');
        const id_jogadores = maxJogador ? maxJogador.id_jogadores + 1 : 1; // Increment the max id_jogadores by 1 or set to 1 if none exists

        // Create a new jogador document with the calculated id_jogadores
        const jogador = new Jogador({ nome, data_nasc, nacionalidade, id_equipa, id_jogadores });
        await jogador.save();

        res.status(201).json({ message: 'Jogador adicionado com sucesso!', jogador });
    } catch (error) {
        console.error('Erro ao adicionar jogador:', error);
        res.status(500).json({ error: 'Erro ao adicionar jogador' });
    }
};

// List all players
jogadoresController.listJogador = async (req, res) => {
  try {
    const jogadores = await Jogador.find().populate('id_jogadores');
    res.status(200).json(jogadores);
  } catch (error) {
    console.error('Erro ao listar jogadores:', error);
    res.status(500).json({ error: 'Erro ao listar jogadores' });
  }
};

// Edit a player by id_jogador
jogadoresController.editJogador = async (req, res) => {
  const { id_jogadores } = req.params;
  const { nome, data_nasc, nacionalidade, id_equipa } = req.body;

  try {
    const jogador = await Jogadores.findOne({ id_jogadores });
    if (!jogador) {
      return res.status(404).json({ message: 'Jogador não encontrado' });
    }

    if (nome) jogador.nome = nome;
    if (data_nasc) jogador.data_nasc = data_nasc;
    if (nacionalidade) jogador.nacionalidade = nacionalidade;
    if (id_equipa) jogador.id_equipa = id_equipa;

    const updatedJogador = await jogador.save();
    res.status(200).json({ message: 'Jogador atualizado com sucesso!', jogador: updatedJogador });
  } catch (error) {
    console.error('Erro ao atualizar jogador:', error);
    res.status(500).json({ error: 'Erro ao atualizar jogador' });
  }
};

// Delete a player by id_jogador
jogadoresController.deleteJogador = async (req, res) => {
  const { id_jogadores } = req.params;

  try {
    const deletedJogador = await Jogador.findOneAndDelete({ id_jogadores });
    if (!deletedJogador) {
      return res.status(404).json({ message: 'Jogador não encontrado' });
    }

    res.status(200).json({ message: 'Jogador deletado com sucesso!', jogador: deletedJogador });
  } catch (error) {
    console.error('Erro ao deletar jogador:', error);
    res.status(500).json({ error: 'Erro ao deletar jogador' });
  }
};

module.exports = jogadoresController;
