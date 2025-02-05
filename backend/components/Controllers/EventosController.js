const Evento = require('../Models/Eventos');
const Relatorio = require('../Models/Relatorio');
const Equipa = require('../Models/Equipa');
const User = require('../Models/User');

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
  
  eventosController.addEventoWeb = async (req, res) => {
    const { DATA, HORA, EQUIPA_CASA, VISITANTE, LOCAL, ID_USER } = req.body;
  
    try {
      // Validação dos campos obrigatórios
      if (!DATA || !HORA || !EQUIPA_CASA || !VISITANTE || !LOCAL || !ID_USER) {
        return res.status(400).json({ message: "Todos os campos são obrigatórios." });
      }
  
      // Obter o último ID_EVENTOS e incrementar
      const lastEvent = await Evento.findOne().sort({ ID_EVENTOS: -1 }); // Ordena pelo maior ID_EVENTOS
      const newId = lastEvent ? lastEvent.ID_EVENTOS + 1 : 1; // Incrementa ou começa com 1
  
      // Criar o novo evento
      const newEvento = new Evento({
        ID_EVENTOS: newId,
        DATA,
        HORA,
        EQUIPA_CASA,
        VISITANTE,
        LOCAL,
        ID_USER,
      });
  
      // Salvar no banco de dados
      await newEvento.save();
  
      res.status(201).json({ message: "Evento criado com sucesso!", evento: newEvento });
    } catch (error) {
      console.error("Erro ao criar evento:", error);
      res.status(500).json({ message: "Erro no servidor." });
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

// Delete multiple events
eventosController.deleteMultipleEventos = async (req, res) => {
  let { eventosIds } = req.body;

  if (!eventosIds || !Array.isArray(eventosIds) || eventosIds.length === 0) {
    return res.status(400).json({ error: "Lista de eventos inválida." });
  }

  try {
    eventosIds = eventosIds.map(id => Number(id)); // Converter para número, se necessário

    const deletedEventos = await Evento.deleteMany({ ID_EVENTOS: { $in: eventosIds } });

    if (deletedEventos.deletedCount === 0) {
      return res.status(404).json({ message: "Nenhum evento encontrado para exclusão." });
    }

    res.status(200).json({ message: `${deletedEventos.deletedCount} eventos deletados com sucesso!` });
  } catch (error) {
    console.error("Erro ao deletar múltiplos eventos:", error);
    res.status(500).json({ error: "Erro ao deletar eventos." });
  }
};


// Fetch games related to a specific user
eventosController.getGamesByUser = async (req, res) => {
  const { ID_USER } = req.params;

  try {
    console.log(`Fetching games for user ID: ${ID_USER}`);

    // Find all relatorios linked to the user
    const relatorios = await Relatorio.find({ 
          ID_USER, 
          STATUS: 'Ativo' // Replace 'Ativo' with the desired STATUS filter
        }).select('ID_EVENTOS');

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

eventosController.getFilteredGamesByUser = async (req, res) => {
  const { ID_USER } = req.params;
  const { ESCALAO } = req.query;

  try {
    const relatorios = await Relatorio.find({ ID_USER, STATUS: 'Ativo' }).select('ID_EVENTOS');
    const eventIds = relatorios.map((relatorio) => relatorio.ID_EVENTOS);

    const eventos = await Evento.find({ ID_EVENTOS: { $in: eventIds } });

    if (ESCALAO) {
      const equipas = await Equipa.find({ ESCALAO }).select('NOME');
      const equipaNames = equipas.map((equipa) => equipa.NOME);
      const filteredEventos = eventos.filter((evento) =>
        equipaNames.includes(evento.EQUIPA_CASA)
      );
      return res.status(200).json(filteredEventos);
    }

    res.status(200).json(eventos);
  } catch (error) {
    console.error('Error fetching filtered games for user:', error);
    res.status(500).json({ message: 'Erro no servidor ao buscar jogos do usuário.' });
  }
};

eventosController.listEventosRecentes = async (req, res) => {
  try {
    // Buscar todos os eventos ordenados por DATA (mais recentes primeiro)
    const eventos = await Evento.find().sort({ DATA: -1 });

    // Obter os IDs únicos de usuários presentes nos eventos
    const userIds = [...new Set(eventos.map(evento => evento.ID_USER).filter(id => id !== undefined))];

    // Buscar os usuários correspondentes
    const users = await User.find({ ID_USER: { $in: userIds } }).select('ID_USER NOME');

    // Criar um mapa de usuários para busca rápida
    const userMap = {};
    users.forEach(user => {
      userMap[user.ID_USER] = user.NOME;
    });

    // Formatar os eventos para incluir o nome do usuário
    const eventosFormatados = eventos.map(evento => ({
      EQUIPA_CASA: evento.EQUIPA_CASA,
      VISITANTE: evento.VISITANTE,
      ID_EVENTOS: evento.ID_EVENTOS,
      DATA: evento.DATA,
      HORA: evento.HORA,
      LOCAL: evento.LOCAL,
      NOME_USER: userMap[evento.ID_USER] || "Sem Scout Associado"
    }));

    res.status(200).json(eventosFormatados);
  } catch (error) {
    console.error('Erro ao listar eventos recentes:', error);
    res.status(500).json({ error: 'Erro ao listar eventos recentes', detalhes: error.message });
  }
};


// List events filtered by team category (Escalão)
eventosController.listEventosByEscalao = async (req, res) => {
  try {
    const { ESCALAO } = req.params;

    if (!ESCALAO) {
      return res.status(400).json({ error: "Escalão é obrigatório" });
    }

    // Buscar equipas pelo escalão
    const equipas = await Equipa.find({ ESCALAO }).select('NOME');
    const equipaNames = equipas.map(equipa => equipa.NOME);

    if (equipaNames.length === 0) {
      return res.status(404).json({ message: "Nenhuma equipa encontrada para este escalão." });
    }

    // Buscar eventos que envolvem as equipas filtradas
    const eventos = await Evento.find({
      $or: [
        { EQUIPA_CASA: { $in: equipaNames } },
        { VISITANTE: { $in: equipaNames } }
      ]
    });

    res.status(200).json(eventos);
  } catch (error) {
    console.error('Erro ao listar eventos por escalão:', error);
    res.status(500).json({ error: 'Erro ao listar eventos por escalão' });
  }
};




module.exports = eventosController;
