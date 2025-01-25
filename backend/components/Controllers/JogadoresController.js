const Jogadores = require('../Models/Jogadores');
const Jogador = require('../Models/Jogadores');
const Relatorio = require('../Models/Relatorio');

const jogadoresController = {};

// Add a new player
jogadoresController.addJogador = async (req, res) => {
    const { NOME, DATA_NASC, GENERO, LINK, NACIONALIDADE, DADOS_ENC, NOTA_ADM, STATUS } = req.body;

    try {
        // Fetch the highest current id_jogadores in the collection
        const maxJogador = await Jogadores.findOne().sort({ ID_JOGADORES: -1 }).select('ID_JOGADORES');
        const ID_JOGADOR = maxJogador ? maxJogador.ID_JOGADORES + 1 : 1; // Increment the max id_jogadores by 1 or set to 1 if none exists

        // Create a new jogador document with the calculated id_jogadores
        const jogador = new Jogador({ NOME, DATA_NASC, GENERO, LINK, NACIONALIDADE, DADOS_ENC, NOTA_ADM, STATUS, ID_JOGADORES: ID_JOGADOR });
        await jogador.save();

        res.status(201).json({ message: 'Jogador adicionado com sucesso!', jogador });
    } catch (error) {
        console.error('Erro ao adicionar jogador:', error);
        res.status(500).json({ error: 'Erro ao adicionar jogador' });
    }
};

jogadoresController.addPlayerPage = async (req, res) => {
  const { NOME, DATA_NASC, GENERO, LINK, NACIONALIDADE } = req.body;

  try {
    const maxJogador = await Jogadores.findOne().sort({ ID_JOGADORES: -1 }).select('ID_JOGADORES');
    const ID_JOGADOR = maxJogador ? maxJogador.ID_JOGADORES + 1 : 1;

    const STATUS = "Active";

    const jogador = new Jogadores({
      NOME,
      DATA_NASC,
      GENERO,
      LINK,
      NACIONALIDADE,
      STATUS,
      ID_JOGADORES: ID_JOGADOR,
    });

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

jogadoresController.getLastTenPlayers = async (req, res) => {
  try {
    const jogadores = await Jogadores.find({})
      .sort({ ID_JOGADORES: -1 })
      .limit(10)
      .select("NOME NOTA_ADM"); // Certifique-se de usar NOTA_ADM

    res.status(200).json(jogadores);
  } catch (error) {
    console.error("Erro ao buscar os últimos 10 jogadores:", error);
    res.status(500).json({ error: "Erro ao buscar os jogadores." });
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
  const { ID_USER } = req.params;

  try {

    // Fetch all relatorios for the given user
    const relatorios = await Relatorio.find({ ID_USER }).select('ID_JOGADORES');

    const jogadorIds = relatorios.map((relatorio) => relatorio.ID_JOGADORES);

    if (!jogadorIds.length) {
      console.log('No jogadores IDs found for user:', ID_USER);
      return res.status(404).json({ message: 'No players found for this user' });
    }

    // Fetch jogadores using correct field name
    const jogadores = await Jogador.find({ ID_JOGADORES: { $in: jogadorIds } });

    if (!jogadores.length) {
      console.log('No jogadores found for extracted IDs');
    }

    res.status(200).json(jogadores);
  } catch (error) {
    console.error('Error fetching players:', error);
    res.status(500).json({ error: 'Failed to fetch players' });
  }
};

// Fetch player by ID_JOGADORES
jogadoresController.getJogadorById = async (req, res) => {
  const { ID_JOGADORES } = req.params;

  try {
      const jogador = await Jogador.findOne({ ID_JOGADORES });
      if (!jogador) {
          return res.status(404).json({ message: 'Jogador não encontrado' });
      }

      res.status(200).json(jogador);
  } catch (error) {
      console.error('Erro ao buscar jogador:', error);
      res.status(500).json({ error: 'Erro ao buscar jogador' });
  }
};




module.exports = jogadoresController;
