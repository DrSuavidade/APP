const RelacaoSombra = require('../Models/RelacaoSombra');
const Jogadores = require("../Models/Jogadores");

const relacaoSombraController = {};

// Add a new tipoUtilizador
relacaoSombraController.addRelacaoSombra = async (req, res) => {
  const { ID_POSICAO, ID_JOGADORES, ID_SOMBRA } = req.body;

  try {
    // Check if a relation already exists for the same position, team, and player
    const existingEntry = await RelacaoSombra.findOne({
      ID_POSICAO,
      ID_JOGADORES,
      ID_SOMBRA,
    });

    if (existingEntry) {
      return res.status(400).json({ message: "O jogador já está nessa posição para essa equipe sombra." });
    }

    // If no duplicate is found, create a new entry
    const newEntry = new RelacaoSombra({ ID_POSICAO, ID_JOGADORES, ID_SOMBRA });
    await newEntry.save();

    res.status(201).json({ message: "Jogador adicionado com sucesso!" });
  } catch (error) {
    console.error("Erro ao adicionar jogador à posição:", error);
    res.status(500).json({ error: "Erro ao adicionar jogador à posição." });
  }
};

// List all tipoUtilizador
relacaoSombraController.listRelacaoSombra = async (req, res) => {
  try {
    const relacaoSombra = await RelacaoSombra.find();
    res.status(200).json(relacaoSombra);
  } catch (error) {
    console.error('Erro ao listar relacoes sombra:', error);
    res.status(500).json({ error: 'Erro ao listar relacoes sombra' });
  }
};

// Edit a tipoUtilizador by id_tipo
relacaoSombraController.editRelacaoSombra = async (req, res) => {
  const { ID_RELACAO } = req.params;
  const { ID_JOGADORES, ID_SOMBRA, ID_POSICAO } = req.body;

  try {
    const relacaoSombra = await RelacaoSombra.findOne({ ID_RELACAO });
    if (!relacaoSombra) {
      return res.status(404).json({ message: 'Relacao Sombra não encontrada' });
    }

    if (ID_JOGADORES) relacaoSombra.ID_JOGADORES = ID_JOGADORES;
    if (ID_SOMBRA) relacaoSombra.ID_SOMBRA = ID_SOMBRA;
    if (ID_POSICAO) relacaoSombra.ID_POSICAO = ID_POSICAO;

    const updatedRelacaoSombra = await relacaoSombra.save();
    res.status(200).json({ message: 'Relacao Sombra atualizado com sucesso!', relacaoSombra: updatedRelacaoSombra });
  } catch (error) {
    console.error('Erro ao atualizar relacao sombra:', error);
    res.status(500).json({ error: 'Erro ao atualizar relacao sombra' });
  }
};

// Delete a tipoUtilizador by id_tipo
relacaoSombraController.deleteRelacaoSombra = async (req, res) => {
  const { ID_RELACAO } = req.params;

  try {
    const deletedRelacaoSombra = await RelacaoSombra.findOneAndDelete({ ID_RELACAO });
    if (!deletedRelacaoSombra) {
      return res.status(404).json({ message: 'RelacaoSombra não encontrada' });
    }

    res.status(200).json({ message: 'RelacaoSombra deletada com sucesso!', relacaoSombra: deletedRelacaoSombra });
  } catch (error) {
    console.error('Erro ao deletar relacao sombra:', error);
    res.status(500).json({ error: 'Erro ao deletar relacao sombra' });
  }
};

relacaoSombraController.listPlayersByPosition = async (req, res) => {
  const { ID_SOMBRA, ID_POSICAO } = req.query; // Get parameters from query

  try {
    // Step 1: Find all relations where the given position and shadow team exist
    const relations = await RelacaoSombra.find({ ID_SOMBRA, ID_POSICAO });

    if (!relations.length) {
      return res.status(404).json({ message: "No players found for this position." });
    }

    // Step 2: Extract all player IDs from RELACAOSOMBRA
    const playerIds = relations.map(rel => rel.ID_JOGADORES);

    // Step 3: Fetch full player details using the extracted IDs
    const players = await Jogadores.find({ ID_JOGADORES: { $in: playerIds } });

    res.status(200).json(players);
  } catch (error) {
    console.error("Error fetching players:", error);
    res.status(500).json({ error: "Error fetching players." });
  }
};

relacaoSombraController.removeRelacaoSombra = async (req, res) => {
  const { ID_POSICAO, ID_JOGADORES, ID_SOMBRA } = req.body;

  try {
    // Find and delete the relation
    const deletedEntry = await RelacaoSombra.findOneAndDelete({
      ID_POSICAO,
      ID_JOGADORES,
      ID_SOMBRA,
    });

    if (!deletedEntry) {
      return res.status(404).json({ message: "Relação não encontrada." });
    }

    res.status(200).json({ message: "Jogador removido com sucesso!" });
  } catch (error) {
    console.error("Erro ao remover jogador da posição:", error);
    res.status(500).json({ error: "Erro ao remover jogador da posição." });
  }
};

module.exports = relacaoSombraController;
