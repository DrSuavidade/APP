const Relatorio = require('../Models/Relatorio');

const relatoriosController = {};

// Add a new report
relatoriosController.addRelatorio = async (req, res) => {
  const { TECNICA, VELOCIDADE, COMPETITIVA, INTELIGENCIA, ALTURA, MORFOLOGIA, COMENTARIO, STATUS, ID_USER, ID_JOGADORES, ID_EVENTOS, COMENTARIO_ADM, DATA, NOTA } = req.body;

  try {
    // Fetch the highest current id_relatorios in the collection
    const maxRelatorio = await Relatorio.findOne().sort({ ID_RELATORIOS: -1 }).select('ID_RELATORIOS');
    const ID_RELATORIO = maxRelatorio ? maxRelatorio.ID_RELATORIOS + 1 : 1; // Increment the max id_relatorios by 1 or set to 1 if none exists

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
      ID_RELATORIOS: ID_RELATORIO 
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
    const relatorios = await Relatorio.find().populate('ID_RELATORIOS');
    res.status(200).json(relatorios);
  } catch (error) {
    console.error('Erro ao listar relatórios:', error);
    res.status(500).json({ error: 'Erro ao listar relatórios' });
  }
};

// Edit a report by id_relatorio
relatoriosController.editRelatorio = async (req, res) => {
  const { ID_RELATORIOS } = req.params;
  const { TECNICA, VELOCIDADE, COMPETITIVA, INTELIGENCIA, ALTURA, MORFOLOGIA, COMENTARIO, STATUS, ID_USER, ID_JOGADORES, ID_EVENTOS, COMENTARIO_ADM, DATA, NOTA } = req.body;

  try {
    const relatorio = await Relatorio.findOne({ ID_RELATORIOS });
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
  const { ID_RELATORIOS } = req.params;

  try {
    const deletedRelatorio = await Relatorio.findOneAndDelete({ ID_RELATORIOS });
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
    const relatorio = await Relatorio.findOne({ id_jogadores, id_user });
    if (!relatorio) {
      return res.status(404).json({ message: 'Relatório não encontrado' });
    }
    res.status(200).json(relatorio);
  } catch (error) {
    console.error('Erro ao buscar relatório:', error);
    res.status(500).json({ error: 'Erro ao buscar relatório' });
  }
};

// Update a specific relatorio by id_relatorios
relatoriosController.editAppRelatorio = async (req, res) => {
  const { id_relatorios } = req.params;
  const { tecnica, velocidade, competitiva, inteligencia, altura, morfologia, comentario, data } = req.body;

  try {
    const relatorio = await Relatorio.findOne({ id_relatorios });
    if (!relatorio) {
      return res.status(404).json({ message: 'Relatório não encontrado' });
    }

    // Update the fields if provided
    if (tecnica !== undefined) relatorio.tecnica = tecnica;
    if (velocidade !== undefined) relatorio.velocidade = velocidade;
    if (competitiva !== undefined) relatorio.competitiva = competitiva;
    if (inteligencia !== undefined) relatorio.inteligencia = inteligencia;
    if (altura !== undefined) relatorio.altura = altura;
    if (morfologia !== undefined) relatorio.morfologia = morfologia;
    if (comentario !== undefined) relatorio.comentario = comentario;
    if (data !== undefined) relatorio.data = data;

    const updatedRelatorio = await relatorio.save();
    res.status(200).json({ message: 'Relatório atualizado com sucesso!', relatorio: updatedRelatorio });
  } catch (error) {
    console.error('Erro ao atualizar relatório:', error);
    res.status(500).json({ error: 'Erro ao atualizar relatório' });
  }
};

module.exports = relatoriosController;
