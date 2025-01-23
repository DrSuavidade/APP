const Jogadores = require('../Models/Jogadores');
const Jogador = require('../Models/Jogadores');
const Relatorio = require('../Models/Relatorio');

const jogadoresController = {};

// Add a new player
jogadoresController.addJogador = async (req, res) => {
    const { NOME, DATA_NASC, GENERO, LINK, NACIONALIDADE, DADOS_ENC, NOTA_ADM, STATUS } = req.body;

    try {
        // Fetch the highest current id_jogadores in the collection
        const maxJogador = await Jogadores.findOne().sort({ ID_JOGADORES: -1 }).select('id_jogadores');
        const ID_JOGADOR = maxJogador ? maxJogador.ID_JOGADORES + 1 : 1; // Increment the max id_jogadores by 1 or set to 1 if none exists

        // Create a new jogador document with the calculated id_jogadores
        const jogador = new Jogador({ NOME, DATA_NASC, GENERO, LINK, NACIONALIDADE, DADOS_ENC, NOTA_ADM, STATUS, ID_JOGADOR });
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
    const jogadores = await Jogador.find().populate('ID_JOGADORES');
    res.status(200).json(jogadores);
  } catch (error) {
    console.error('Erro ao listar jogadores:', error);
    res.status(500).json({ error: 'Erro ao listar jogadores' });
  }
};

// Edit a player by id_jogador
jogadoresController.editJogador = async (req, res) => {
  const { ID_JOGADORES } = req.params;
  const { NOME, DATA_NASC, GENERO, LINK, NACIONALIDADE, DADOS_ENC, NOTA_ADM, STATUS } = req.body;

  try {
    const jogador = await Jogadores.findOne({ ID_JOGADORES });
    if (!jogador) {
      return res.status(404).json({ message: 'Jogador não encontrado' });
    }

    if (NOME) jogador.NOME = NOME;
    if (DATA_NASC) jogador.DATA_NASC = DATA_NASC;
    if (GENERO) jogador.GENERO = GENERO;
    if (LINK) jogador.LINK = LINK;
    if (NACIONALIDADE) jogador.NACIONALIDADE = NACIONALIDADE;
    if (DADOS_ENC) jogador.DADOS_ENC = DADOS_ENC;
    if (NOTA_ADM) jogador.NOTA_ADM = NOTA_ADM;
    if (STATUS) jogador.STATUS = STATUS;

    const updatedJogador = await jogador.save();
    res.status(200).json({ message: 'Jogador atualizado com sucesso!', jogador: updatedJogador });
  } catch (error) {
    console.error('Erro ao atualizar jogador:', error);
    res.status(500).json({ error: 'Erro ao atualizar jogador' });
  }
};

// Delete a player by id_jogador
jogadoresController.deleteJogador = async (req, res) => {
  const { ID_JOGADORES } = req.params;

  try {
    const deletedJogador = await Jogador.findOneAndDelete({ ID_JOGADORES });
    if (!deletedJogador) {
      return res.status(404).json({ message: 'Jogador não encontrado' });
    }

    res.status(200).json({ message: 'Jogador deletado com sucesso!', jogador: deletedJogador });
  } catch (error) {
    console.error('Erro ao deletar jogador:', error);
    res.status(500).json({ error: 'Erro ao deletar jogador' });
  }
};

// Fetch players related to a specific user
jogadoresController.getPlayersByUser = async (req, res) => {
  const { id_user } = req.params;

  try {
    // Get all relatorios by id_user
    const relatorios = await Relatorio.find({ id_user }).select('id_jogadores');
    const jogadorIds = relatorios.map((relatorio) => relatorio.id_jogadores);

    if (!jogadorIds.length) {
      return res.status(404).json({ message: 'No players found for this user' });
    }

    // Get jogadores by their IDs
    const jogadores = await Jogador.find({ id_jogadores: { $in: jogadorIds } });

    res.status(200).json(jogadores);
  } catch (error) {
    console.error('Error fetching players:', error);
    res.status(500).json({ error: 'Failed to fetch players' });
  }
};


module.exports = jogadoresController;
