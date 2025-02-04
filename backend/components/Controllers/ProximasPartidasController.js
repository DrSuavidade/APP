const Evento = require('../Models/Eventos');
const Equipa = require('../Models/Equipa');

const proximasPartidasController = {};

// Listar próximas partidas com ou sem filtro por escalão
proximasPartidasController.listarProximasPartidas = async (req, res) => {
  try {
    const { ESCALAO } = req.query;
    const hoje = new Date();
    
    console.log(`🔍 Buscando próximas partidas a partir de: ${hoje.toISOString()}`);

    // Buscar eventos futuros
    const eventosFuturos = await Evento.find({ DATA: { $gte: hoje } });

    if (eventosFuturos.length === 0) {
      return res.status(404).json({ message: "Nenhuma partida futura encontrada." });
    }

    console.log(`✅ Eventos futuros encontrados: ${eventosFuturos.length}`);

    // Buscar equipas para obter o escalão
    const equipas = await Equipa.find();
    const equipaMap = {};
    equipas.forEach(equipa => {
      equipaMap[equipa.NOME] = equipa.ESCALAO;
    });

    // Associar eventos ao escalão
    const eventosFormatados = eventosFuturos.map(evento => ({
      JOGO: `${evento.EQUIPA_CASA} vs ${evento.VISITANTE}`,
      ESCALAO: equipaMap[evento.EQUIPA_CASA] || equipaMap[evento.VISITANTE] || "Desconhecido",
      DATA: evento.DATA,
      HORA: evento.HORA,
      LOCAL: evento.LOCAL,
    }));

    // Filtrar pelo escalão, se necessário
    const eventosFiltrados = ESCALAO
      ? eventosFormatados.filter(evento => evento.ESCALAO === ESCALAO)
      : eventosFormatados;

    if (eventosFiltrados.length === 0) {
      return res.status(404).json({ message: "Nenhuma partida futura encontrada para esse escalão." });
    }

    console.log(`✅ Partidas filtradas (${ESCALAO || "todas"}): ${eventosFiltrados.length}`);

    res.status(200).json(eventosFiltrados);
  } catch (error) {
    console.error('❌ Erro ao listar próximas partidas:', error);
    res.status(500).json({ error: 'Erro ao listar próximas partidas' });
  }
};

module.exports = proximasPartidasController;
