const Jogadores = require('../Models/Jogadores');
const Jogador = require('../Models/Jogadores');
const Relatorio = require('../Models/Relatorio');
const Relationship12 = require('../Models/Relationship_12');
const Relationship11 = require('../Models/Relationship_11');


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
    const NOTA_ADM = 0; // Define automaticamente a nota como 0

    const jogador = new Jogadores({
      NOME,
      DATA_NASC,
      GENERO,
      LINK,
      NACIONALIDADE,
      STATUS,
      ID_JOGADORES: ID_JOGADOR,
      NOTA_ADM, // Agora sempre será 0 na criação
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
    const relatorios = await Relatorio.find({ 
      ID_USER, 
      STATUS: 'Ativo'
    }).select('ID_JOGADORES ID_RELATORIO');  // ✅ Select both ID_JOGADORES and ID_RELATORIO

    if (!relatorios.length) {
      console.log('No relatorios found for user:', ID_USER);
      return res.status(404).json({ message: 'No players found for this user' });
    }

    // Create a map of ID_JOGADORES -> ID_RELATORIO
    const relatorioMap = {};
    relatorios.forEach((rel) => {
      relatorioMap[rel.ID_JOGADORES] = rel.ID_RELATORIO;
    });

    // Fetch jogadores using correct field name
    const jogadores = await Jogador.find({ ID_JOGADORES: { $in: Object.keys(relatorioMap) } });

    if (!jogadores.length) {
      console.log('No jogadores found for extracted IDs');
      return res.status(404).json({ message: 'Players not found' });
    }

    // Attach ID_RELATORIO to each player
    const jogadoresWithRelatorio = jogadores.map(jogador => ({
      ...jogador.toObject(),  // Convert Mongoose object to plain JSON
      ID_RELATORIO: relatorioMap[jogador.ID_JOGADORES] || null, // Attach the correct ID_RELATORIO
    }));

    res.status(200).json(jogadoresWithRelatorio);
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

jogadoresController.listJogadoresByEvento = async (req, res) => {
  try {
      const { ID_EVENTOS } = req.params;

      // Fetch relationships that match the event ID
      const relationships = await Relationship12.find({ ID_EVENTOS: ID_EVENTOS });

      if (!relationships.length) {
          return res.status(404).json({ message: 'Nenhum jogador encontrado para este evento.' });
      }

      // Extract player IDs
      const jogadorIds = relationships.map(rel => rel.ID_JOGADORES);

      // Fetch player details
      const jogadores = await Jogadores.find({ ID_JOGADORES: { $in: jogadorIds } });

      res.status(200).json(jogadores);
  } catch (error) {
      console.error('Erro ao buscar jogadores:', error);
      res.status(500).json({ message: 'Erro ao buscar jogadores' });
  }
};

jogadoresController.listJogadoresByEquipa = async (req, res) => {
  try {
      console.log("Requisição recebida para listJogadoresByEquipa", req.params);

      const { idEquipa } = req.params;

      if (!idEquipa) {
          return res.status(400).json({ message: 'ID da equipa é obrigatório.' });
      }

      // Buscar relações que correspondem à equipa
      const relationships = await Relationship11.find({ ID_EQUIPA: idEquipa });

      console.log("Relacionamentos encontrados:", relationships);

      if (!relationships.length) {
          return res.status(404).json({ message: 'Nenhum jogador encontrado para esta equipa.' });
      }

      // Extrair IDs dos jogadores
      const jogadorIds = relationships.map(rel => rel.ID_JOGADORES);

      console.log("IDs dos jogadores:", jogadorIds);

      // Buscar detalhes dos jogadores
      const jogadores = await Jogadores.find({ ID_JOGADORES: { $in: jogadorIds } });

      console.log("Jogadores encontrados:", jogadores);

      res.status(200).json(jogadores);
  } catch (error) {
      console.error('Erro ao buscar jogadores:', error);
      res.status(500).json({ message: 'Erro ao buscar jogadores' });
  }
};


jogadoresController.listJogadoresByAge = async (req, res) => {
  try {
      const { year } = req.params;

      if (!year || isNaN(year)) {
          return res.status(400).json({ message: "Ano inválido." });
      }

      console.log(`📌 Buscando jogadores disponíveis do ano: ${year}`);

      const startDate = new Date(`${year}-01-01T00:00:00.000Z`);
      const endDate = new Date(`${year}-12-31T23:59:59.999Z`);

      // Buscar IDs de jogadores que já estão atribuídos a equipas na `RELATIONSHIP_11`
      const jogadoresComEquipa = await Relationship11.find({}, { ID_JOGADORES: 1, _id: 0 });
      const idsComEquipa = jogadoresComEquipa.map(rel => rel.ID_JOGADORES);

      console.log(`🔎 IDs de jogadores já atribuídos a equipas:`, idsComEquipa);

      // Buscar jogadores que NÃO estão na `RELATIONSHIP_11`
      const jogadores = await Jogadores.find({
          DATA_NASC: { $gte: startDate, $lte: endDate },
          ID_JOGADORES: { $nin: idsComEquipa } // Exclui jogadores que já estão atribuídos
      });

      console.log(`📌 Jogadores disponíveis para ${year}:`, jogadores);

      if (!jogadores.length) {
          return res.status(404).json({ message: `Nenhum jogador disponível para o ano ${year}.` });
      }

      res.status(200).json(jogadores);
  } catch (error) {
      console.error("❌ Erro ao buscar jogadores por idade:", error);
      res.status(500).json({ message: "Erro ao buscar jogadores por idade." });
  }
};

jogadoresController.getJogadorDetails = async (req, res) => {
  const { ID_JOGADORES } = req.params;

  try {
    // Fetch player data
    const jogador = await Jogador.findOne({ ID_JOGADORES }).select("NOME DATA_NASC NOTA_ADM");

    if (!jogador) {
      return res.status(404).json({ message: "Jogador não encontrado." });
    }

    // Fetch all reports (RELATORIOS) for this player
    const relatorios = await Relatorio.find({ ID_JOGADORES }).sort({ DATA: -1 });

    if (relatorios.length === 0) {
      return res.status(200).json({
        jogador,
        stats: {
          tecnica: 0,
          velocidade: 0,
          competitiva: 0,
          inteligencia: 0,
          altura: null,
          morfologia: null,
        },
      });
    }

    // Calculate averages for stats
    const totalReports = relatorios.length;
    const avgTecnica = relatorios.reduce((sum, r) => sum + r.TECNICA, 0) / totalReports;
    const avgVelocidade = relatorios.reduce((sum, r) => sum + r.VELOCIDADE, 0) / totalReports;
    const avgCompetitiva = relatorios.reduce((sum, r) => sum + r.COMPETITIVA, 0) / totalReports;
    const avgInteligencia = relatorios.reduce((sum, r) => sum + r.INTELIGENCIA, 0) / totalReports;

    // Get the latest ALTURA and MORFOLOGIA
    const latestRelatorio = relatorios[0];

    const stats = {
      tecnica: avgTecnica.toFixed(1),
      velocidade: avgVelocidade.toFixed(1),
      competitiva: avgCompetitiva.toFixed(1),
      inteligencia: avgInteligencia.toFixed(1),
      altura: latestRelatorio.ALTURA,
      morfologia: latestRelatorio.MORFOLOGIA,
    };

    res.status(200).json({ jogador, stats });
  } catch (error) {
    console.error("Erro ao buscar detalhes do jogador:", error);
    res.status(500).json({ error: "Erro ao buscar detalhes do jogador." });
  }
};

jogadoresController.listPlayersWithoutTeamByYear = async (req, res) => {
  try {
      console.log(`📌 Buscando anos disponíveis para jogadores sem equipe`);

      // Buscar todos os jogadores com equipe atribuída na tabela Relationship11
      const jogadoresComEquipa = await Relationship11.find({}, { ID_JOGADORES: 1 });

      // Extrair os IDs dos jogadores com equipe
      const idsComEquipa = jogadoresComEquipa.map(rel => rel.ID_JOGADORES);

      console.log(`🔎 IDs de jogadores já atribuídos a equipas:`, idsComEquipa);

      // Buscar todos os jogadores na tabela Jogadores
      const todosJogadores = await Jogadores.find({});
      console.log(`📌 Jogadores encontrados:`, todosJogadores);

      // Filtrar jogadores que NÃO estão na lista de jogadores com equipe
      const jogadoresSemEquipa = todosJogadores.filter(player => {
          // Obter o ano de nascimento a partir de DATA_NASC
          const anoNascimento = new Date(player.DATA_NASC).getFullYear();
          return !idsComEquipa.includes(player.ID_JOGADORES);
      });

      // Extrair os anos únicos dos jogadores sem equipe
      const anosDisponiveis = [...new Set(jogadoresSemEquipa.map(player => new Date(player.DATA_NASC).getFullYear()))];

      console.log(`📌 Anos disponíveis:`, anosDisponiveis);

      // Se não houver anos disponíveis
      if (!anosDisponiveis.length) {
          return res.status(404).json({ message: "Nenhum jogador sem equipe encontrado." });
      }

      // Retornar a lista de anos
      res.status(200).json(anosDisponiveis);
  } catch (error) {
      console.error('❌ Erro ao buscar anos de jogadores sem equipe:', error);
      res.status(500).json({ message: 'Erro ao buscar anos de jogadores sem equipe.' });
  }
};





module.exports = jogadoresController;
