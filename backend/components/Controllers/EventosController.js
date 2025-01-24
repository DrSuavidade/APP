const Eventos = require('../Models/Eventos');
const Evento = require('../Models/Eventos');
const Relatorio = require('../Models/Relatorio');

const eventosController = {};

// Add a new event
eventosController.addEvento = async (req, res) => {
    const { DATA, HORA, EQUIPA_CASA, VISITANTE, LOCAL, ID_USER } = req.body;
  
    try {
      // Fetch the highest current id_eventos in the collection
      const maxEvento = await Evento.findOne().sort({ ID_EVENTOS: -1 }).select('ID_EVENTOS');
      const ID_EVENTO = maxEvento ? maxEvento.ID_EVENTOS + 1 : 1; // Increment the max id_eventos by 1 or set to 1 if none exists
  
      // Create a new evento document with the calculated id_evento
      const evento = new Evento({ DATA, HORA, EQUIPA_CASA, VISITANTE, LOCAL, ID_USER, ID_EVENTOS: ID_EVENTO });
      await evento.save();
  
      res.status(201).json({ message: 'Evento adicionado com sucesso!', evento });
    } catch (error) {
      console.error('Erro ao adicionar evento:', error);
      res.status(500).json({ error: 'Erro ao adicionar evento' });
    }
  };

// List all events
eventosController.listEvento = async (req, res) => {
  try {
    const eventos = await Evento.find().populate('ID_EVENTOS');
    res.status(200).json(eventos);
  } catch (error) {
    console.error('Erro ao listar eventos:', error);
    res.status(500).json({ error: 'Erro ao listar eventos' });
  }
};

// Edit an event by id_evento
eventosController.editEvento = async (req, res) => {
  const { ID_EVENTOS } = req.params;
  const { DATA, HORA, EQUIPA_CASA, VISITANTE, LOCAL, ID_USER } = req.body;

  try {
    const evento = await Eventos.findOne({ ID_EVENTOS });
    if (!evento) {
      return res.status(404).json({ message: 'Evento não encontrado' });
    }

    if (DATA) evento.DATA = DATA;
    if (HORA) evento.HORA = HORA;
    if (EQUIPA_CASA) evento.EQUIPA_CASA = EQUIPA_CASA;
    if (VISITANTE) evento.VISITANTE = VISITANTE;
    if (LOCAL) evento.LOCAL = LOCAL;
    if (ID_USER) evento.ID_USER = ID_USER;

    const updatedEvento = await evento.save();
    res.status(200).json({ message: 'Evento atualizado com sucesso!', evento: updatedEvento });
  } catch (error) {
    console.error('Erro ao atualizar evento:', error);
    res.status(500).json({ error: 'Erro ao atualizar evento' });
  }
};

// Delete an event by id_evento
eventosController.deleteEvento = async (req, res) => {
  const { ID_EVENTOS } = req.params;

  try {
    const deletedEvento = await Evento.findOneAndDelete({ ID_EVENTOS });
    if (!deletedEvento) {
      return res.status(404).json({ message: 'Evento não encontrado' });
    }

    res.status(200).json({ message: 'Evento deletado com sucesso!', evento: deletedEvento });
  } catch (error) {
    console.error('Erro ao deletar evento:', error);
    res.status(500).json({ error: 'Erro ao deletar evento' });
  }
};

// Fetch games related to a specific user
eventosController.getGamesByUser = async (req, res) => {
  const { ID_USER } = req.params;

  try {
    console.log(`Fetching games for user ID: ${ID_USER}`);

    // Find all relatorios linked to the user
    const relatorios = await Relatorio.find({ ID_USER }).select('ID_EVENTOS');

    // Extract unique event IDs from relatorios
    const eventIds = relatorios.map((relatorio) => relatorio.ID_EVENTOS);

    // Fetch eventos using the event IDs
    const eventos = await Evento.find({ ID_EVENTOS: { $in: eventIds } });

    res.status(200).json(eventos);
  } catch (error) {
    console.error('Error fetching games for user:', error);
    res.status(500).json({ message: 'Erro no servidor ao buscar jogos do usuário.' });
  }
};



module.exports = eventosController;
