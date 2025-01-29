const Relatorio = require('../Models/Relatorio');
const Jogadores = require('../Models/Jogadores');

const relatoriosController = {};

// Add a new report
relatoriosController.addRelatorio = async (req, res) => {
  const {
    TECNICA = 0, // Default value
    VELOCIDADE = 0, // Default value
    COMPETITIVA = 0, // Default value
    INTELIGENCIA = 0, // Default value
    ALTURA = 0, // Default value
    MORFOLOGIA = "", // Default value
    COMENTARIO = "", // Default value
    STATUS = "Em Andamento", // Default value
    ID_USER,
    ID_JOGADORES,
    ID_EVENTOS,
    COMENTARIO_ADM = "", // Default value
    DATA = new Date(), // Default value
    NOTA = 0, // Default value
  } = req.body;

  try {
    // Check if a relatorio with the same ID_USER, ID_JOGADORES, and ID_EVENTOS exists
    const existingRelatorio = await Relatorio.findOne({
      ID_USER,
      ID_JOGADORES,
      ID_EVENTOS,
    });

    if (existingRelatorio) {
      return res
        .status(400)
        .json({
          error:
            "Não pode ter vários relatórios para o mesmo jogador no mesmo evento.",
        });
    }

    // Fetch the highest current ID_RELATORIO in the collection
    const maxRelatorio = await Relatorio.findOne()
      .sort({ ID_RELATORIO: -1 })
      .select("ID_RELATORIO");
    const ID_RELATORIO = maxRelatorio
      ? maxRelatorio.ID_RELATORIO + 1
      : 1; // Increment the max ID_RELATORIO by 1 or set to 1 if none exists

    // Create a new relatorio document with the calculated ID_RELATORIO
    const relatorio = new Relatorio({
      TECNICA,
      VELOCIDADE,
      COMPETITIVA,
      INTELIGENCIA,
      ALTURA,
      MORFOLOGIA,
      COMENTARIO,
      STATUS,
      ID_USER,
      ID_JOGADORES,
      ID_EVENTOS,
      COMENTARIO_ADM,
      DATA,
      NOTA,
      ID_RELATORIO: ID_RELATORIO,
    });

    // Save the new relatorio
    await relatorio.save();

    res
      .status(201)
      .json({ message: "Relatório adicionado com sucesso!", relatorio });
  } catch (error) {
    console.error("Erro ao adicionar relatório:", error);
    res.status(500).json({ error: "Erro ao adicionar relatório." });
  }
};



// List all reports
relatoriosController.listRelatorio = async (req, res) => {
  try {
    const relatorios = await Relatorio.find().populate('ID_RELATORIO');
    res.status(200).json(relatorios);
  } catch (error) {
    console.error('Erro ao listar relatórios:', error);
    res.status(500).json({ error: 'Erro ao listar relatórios' });
  }
};

// Edit a report by id_relatorio
relatoriosController.editRelatorio = async (req, res) => {
  const { ID_RELATORIO } = req.params;
  const { TECNICA, VELOCIDADE, COMPETITIVA, INTELIGENCIA, ALTURA, MORFOLOGIA, COMENTARIO, STATUS, ID_USER, ID_JOGADORES, ID_EVENTOS, COMENTARIO_ADM, DATA, NOTA } = req.body;

  try {
    const relatorio = await Relatorio.findOne({ ID_RELATORIO });
    if (!relatorio) {
      return res.status(404).json({ message: 'Relatório não encontrado' });
    }

    if (TECNICA) relatorio.TECNICA = TECNICA;
    if (VELOCIDADE) relatorio.VELOCIDADE = VELOCIDADE;
    if (COMPETITIVA) relatorio.COMPETITIVA = COMPETITIVA;
    if (INTELIGENCIA) relatorio.INTELIGENCIA = INTELIGENCIA;
    if (ALTURA) relatorio.ALTURA = ALTURA;
    if (MORFOLOGIA) relatorio.MORFOLOGIA = MORFOLOGIA;
    if (COMENTARIO) relatorio.COMENTARIO = COMENTARIO;
    if (STATUS) relatorio.STATUS = STATUS;
    if (ID_USER) relatorio.ID_USER = ID_USER;
    if (ID_JOGADORES) relatorio.ID_JOGADORES = ID_JOGADORES;
    if (ID_EVENTOS) relatorio.ID_EVENTOS = ID_EVENTOS;
    if (COMENTARIO_ADM) relatorio.COMENTARIO_ADM = COMENTARIO_ADM;
    if (DATA) relatorio.DATA = DATA;
    if (NOTA) relatorio.NOTA = NOTA;

    const updatedRelatorio = await relatorio.save();
    res.status(200).json({ message: 'Relatório atualizado com sucesso!', relatorio: updatedRelatorio });
  } catch (error) {
    console.error('Erro ao atualizar relatório:', error);
    res.status(500).json({ error: 'Erro ao atualizar relatório' });
  }
};

// Delete a report by id_relatorio
relatoriosController.deleteRelatorio = async (req, res) => {
  const { ID_RELATORIO } = req.params;

  try {
    const deletedRelatorio = await Relatorio.findOneAndDelete({ ID_RELATORIO });
    if (!deletedRelatorio) {
      return res.status(404).json({ message: 'Relatório não encontrado' });
    }

    res.status(200).json({ message: 'Relatório deletado com sucesso!', relatorio: deletedRelatorio });
  } catch (error) {
    console.error('Erro ao deletar relatório:', error);
    res.status(500).json({ error: 'Erro ao deletar relatório' });
  }
};

relatoriosController.getRelatorioByPlayerAndUser = async (req, res) => {
  const { id_jogadores, id_user } = req.params; // Use params instead of query

  try {
    // Log the parameters for debugging
    console.log('ID_JOGADORES:', id_jogadores);
    console.log('ID_USER:', id_user);

    // Ensure the parameters are numbers
    const jogadorId = parseInt(id_jogadores, 10);
    const userId = parseInt(id_user, 10);

    if (isNaN(jogadorId) || isNaN(userId)) {
      return res.status(400).json({ error: 'Invalid ID_JOGADORES or ID_USER' });
    }

    // Fetch the relatorio for the given player and user
    const relatorio = await Relatorio.findOne({ ID_JOGADORES: jogadorId, ID_USER: userId });

    if (!relatorio) {
      return res.status(404).json({ message: 'Relatório não encontrado' });
    }

    res.status(200).json(relatorio);
  } catch (error) {
    console.error('Erro ao buscar relatório:', error);
    res.status(500).json({ error: 'Erro ao buscar relatório' });
  }
};



relatoriosController.listHistoricoRelatorios = async (req, res) => {
  try {
    const relatorios = await Relatorio.find({ STATUS: { $ne: 'Ativo' } });
    const jogadores = await Jogadores.find({
      ID_JOGADORES: { $in: relatorios.map(r => r.ID_JOGADORES) },
    });

    const results = relatorios.map(relatorio => {
      const jogador = jogadores.find(j => j.ID_JOGADORES === relatorio.ID_JOGADORES);
      return {
        ...relatorio.toObject(),
        JOGADOR_NOME: jogador ? jogador.NOME : 'Desconhecido',
      };
    });

    res.status(200).json(results);
  } catch (error) {
    console.error('Erro ao listar relatórios históricos:', error);
    res.status(500).json({ error: 'Erro ao listar relatórios históricos' });
  }
};





module.exports = relatoriosController;
