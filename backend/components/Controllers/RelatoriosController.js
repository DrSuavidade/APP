const Relatorio = require('../Models/Relatorio');

const relatoriosController = {};

// Add a new report
relatoriosController.addRelatorio = async (req, res) => {
  const { TECNICA, VELOCIDADE, COMPETITIVA, INTELIGENCIA, ALTURA, MORFOLOGIA, COMENTARIO, STATUS, ID_USER, ID_JOGADORES, ID_EVENTOS, COMENTARIO_ADM, DATA, NOTA } = req.body;

  try {
    // Fetch the highest current id_relatorios in the collection
    const maxRelatorio = await Relatorio.findOne().sort({ ID_RELATORIO: -1 }).select('ID_RELATORIO');
    const ID_RELATORIO = maxRelatorio ? maxRelatorio.ID_RELATORIO + 1 : 1; // Increment the max id_relatorios by 1 or set to 1 if none exists

    // Create a new relatorio document with the calculated id_relatorio
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
      ID_RELATORIO: ID_RELATORIO 
    });

    // Log the document before saving to ensure the id_relatorios field is set correctly
    console.log('Relatório to be saved:', relatorio);

    // Save the new relatorio
    await relatorio.save();

    res.status(201).json({ message: 'Relatório adicionado com sucesso!', relatorio });
  } catch (error) {
    console.error('Erro ao adicionar relatório:', error);
    res.status(500).json({ error: 'Erro ao adicionar relatório' });
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
  const { id_jogadores, id_user } = req.query;

  try {
    console.log('Query Parameters:', req.query);

    // Fetch the relatorio for the given player and user
    const relatorio = await Relatorio.findOne({
      ID_JOGADORES: parseInt(id_jogadores), // Ensure correct type
      ID_USER: parseInt(id_user),
    });

    if (!relatorio) {
      console.log('Relatório não encontrado.');
      return res.status(404).json({ message: 'Relatório não encontrado' });
    }

    console.log('Relatório encontrado:', relatorio);
    res.status(200).json(relatorio);
  } catch (error) {
    console.error('Erro ao buscar relatório:', error);
    res.status(500).json({ error: 'Erro ao buscar relatório' });
  }
};



// Update a specific relatorio by id_relatorios
relatoriosController.editAppRelatorio = async (req, res) => {
  const { id_relatorio } = req.params;
  const { tecnica, velocidade, competitiva, inteligencia, altura, morfologia, comentario, data } = req.body;

  try {
    // Find the relatorio by its ID
    const relatorio = await Relatorio.findOne({ ID_RELATORIO: id_relatorio });
    if (!relatorio) {
      return res.status(404).json({ message: 'Relatório não encontrado' });
    }

    // Update fields if provided
    if (tecnica !== undefined) relatorio.TECNICA = tecnica;
    if (velocidade !== undefined) relatorio.VELOCIDADE = velocidade;
    if (competitiva !== undefined) relatorio.COMPETITIVA = competitiva;
    if (inteligencia !== undefined) relatorio.INTELIGENCIA = inteligencia;
    if (altura !== undefined) relatorio.ALTURA = altura;
    if (morfologia !== undefined) relatorio.MORFOLOGIA = morfologia;
    if (comentario !== undefined) relatorio.COMENTARIO = comentario;
    if (data !== undefined) relatorio.DATA = new Date(data);

    const updatedRelatorio = await relatorio.save();
    res.status(200).json({ message: 'Relatório atualizado com sucesso!', relatorio: updatedRelatorio });
  } catch (error) {
    console.error('Erro ao atualizar relatório:', error);
    res.status(500).json({ error: 'Erro ao atualizar relatório' });
  }
};


module.exports = relatoriosController;
