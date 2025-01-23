const Relatorio = require('../Models/Relatorio');

const relatoriosController = {};

// Add a new report
relatoriosController.addRelatorio = async (req, res) => {
  const { tecnica, velocidade, competitiva, inteligencia, altura, morfologia, comentario, status, id_user, id_jogadores, data } = req.body;

  try {
    // Fetch the highest current id_relatorios in the collection
    const maxRelatorio = await Relatorio.findOne().sort({ id_relatorios: -1 }).select('id_relatorios');
    const id_relatorio = maxRelatorio ? maxRelatorio.id_relatorios + 1 : 1; // Increment the max id_relatorios by 1 or set to 1 if none exists

    // Create a new relatorio document with the calculated id_relatorio
    const relatorio = new Relatorio({ 
      tecnica, 
      velocidade, 
      competitiva, 
      inteligencia, 
      altura, 
      morfologia, 
      comentario, 
      status, 
      id_user, 
      id_jogadores, 
      data, 
      id_relatorios: id_relatorio 
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
    const relatorios = await Relatorio.find().populate('id_relatorios');
    res.status(200).json(relatorios);
  } catch (error) {
    console.error('Erro ao listar relatórios:', error);
    res.status(500).json({ error: 'Erro ao listar relatórios' });
  }
};

// Edit a report by id_relatorio
relatoriosController.editRelatorio = async (req, res) => {
  const { id_relatorios } = req.params;
  const { tecnica, velocidade, competitiva, inteligencia, altura, morfologia, comentario, status, id_user, id_jogadores, data } = req.body;

  try {
    const relatorio = await Relatorio.findOne({ id_relatorios });
    if (!relatorio) {
      return res.status(404).json({ message: 'Relatório não encontrado' });
    }

    if (tecnica) relatorio.tecnica = tecnica;
    if (velocidade) relatorio.velocidade = velocidade;
    if (competitiva) relatorio.competitiva = competitiva;
    if (inteligencia) relatorio.inteligencia = inteligencia;
    if (altura) relatorio.altura = altura;
    if (morfologia) relatorio.morfologia = morfologia;
    if (comentario) relatorio.comentario = comentario;
    if (status) relatorio.status = status;
    if (id_user) relatorio.id_user = id_user;
    if (id_jogadores) relatorio.id_jogadores = id_jogadores;
    if (data) relatorio.data = data;

    const updatedRelatorio = await relatorio.save();
    res.status(200).json({ message: 'Relatório atualizado com sucesso!', relatorio: updatedRelatorio });
  } catch (error) {
    console.error('Erro ao atualizar relatório:', error);
    res.status(500).json({ error: 'Erro ao atualizar relatório' });
  }
};

// Delete a report by id_relatorio
relatoriosController.deleteRelatorio = async (req, res) => {
  const { id_relatorio } = req.params;

  try {
    const deletedRelatorio = await Relatorio.findOneAndDelete({ id_relatorio });
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
