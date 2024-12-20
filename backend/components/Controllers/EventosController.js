const Eventos = require('../Models/Eventos');
const Evento = require('../Models/Eventos');

const eventosController = {};

// Add a new event
eventosController.addEvento = async (req, res) => {
    const { data, hora, equipa_casa, visitante, local, id_relatorio } = req.body;
  
    try {
      // Fetch the highest current id_eventos in the collection
      const maxEvento = await Evento.findOne().sort({ id_eventos: -1 }).select('id_eventos');
      const id_evento = maxEvento ? maxEvento.id_eventos + 1 : 1; // Increment the max id_eventos by 1 or set to 1 if none exists
  
      // Create a new evento document with the calculated id_evento
      const evento = new Evento({ data, hora, equipa_casa, visitante, local, id_relatorio, id_eventos: id_evento });
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
    const eventos = await Evento.find().populate('id_eventos');
    res.status(200).json(eventos);
  } catch (error) {
    console.error('Erro ao listar eventos:', error);
    res.status(500).json({ error: 'Erro ao listar eventos' });
  }
};

// Edit an event by id_evento
eventosController.editEvento = async (req, res) => {
  const { id_eventos } = req.params;
  const { data, hora, equipa_casa, visitante, local, id_relatorio } = req.body;

  try {
    const evento = await Eventos.findOne({ id_eventos });
    if (!evento) {
      return res.status(404).json({ message: 'Evento não encontrado' });
    }

    if (data) evento.data = data;
    if (hora) evento.hora = hora;
    if (equipa_casa) evento.equipa_casa = equipa_casa;
    if (visitante) evento.visitante = visitante;
    if (local) evento.local = local;
    if (id_relatorio) evento.id_relatorio = id_relatorio;

    const updatedEvento = await evento.save();
    res.status(200).json({ message: 'Evento atualizado com sucesso!', evento: updatedEvento });
  } catch (error) {
    console.error('Erro ao atualizar evento:', error);
    res.status(500).json({ error: 'Erro ao atualizar evento' });
  }
};

// Delete an event by id_evento
eventosController.deleteEvento = async (req, res) => {
  const { id_evento } = req.params;

  try {
    const deletedEvento = await Evento.findOneAndDelete({ id_evento });
    if (!deletedEvento) {
      return res.status(404).json({ message: 'Evento não encontrado' });
    }

    res.status(200).json({ message: 'Evento deletado com sucesso!', evento: deletedEvento });
  } catch (error) {
    console.error('Erro ao deletar evento:', error);
    res.status(500).json({ error: 'Erro ao deletar evento' });
  }
};

module.exports = eventosController;
