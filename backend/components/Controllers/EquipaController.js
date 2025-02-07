const Equipa = require('../Models/Equipa');
const Relationship11 = require("../Models/Relationship_11");

const equipaController = {};

// Add a new team
equipaController.addEquipa = async (req, res) => {
  const { NOME, ESCALAO, ID_CLUBE } = req.body;

  try {
    const maxEquipa = await Equipa.findOne().sort({ ID_EQUIPA: -1 }).select('ID_EQUIPA');
    const ID_EQUIPA = maxEquipa ? maxEquipa.ID_EQUIPA + 1 : 1;

    const equipa = new Equipa({ NOME, ESCALAO, ID_CLUBE, ID_EQUIPA });
    await equipa.save();

    res.status(201).json({ message: 'Equipa adicionada com sucesso!', equipa });
  } catch (error) {
    console.error('Erro ao adicionar equipa:', error);
    res.status(500).json({ error: 'Erro ao adicionar equipa' });
  }
};

// List all teams
equipaController.listEquipa = async (req, res) => {
  try {
    const equipas = await Equipa.find();
    res.status(200).json(equipas);
  } catch (error) {
    console.error('Erro ao listar equipas:', error);
    res.status(500).json({ error: 'Erro ao listar equipas' });
  }
};

// Edit a team by id_equipa
equipaController.editEquipa = async (req, res) => {
  const { ID_EQUIPA } = req.params;
  const { NOME, ESCALAO, ID_CLUBE } = req.body;

  try {
    const equipa = await Equipa.findOne({ ID_EQUIPA });
    if (!equipa) {
      return res.status(404).json({ message: 'Equipa não encontrada' });
    }

    if (NOME) equipa.NOME = NOME;
    if (ESCALAO) equipa.ESCALAO = ESCALAO;
    if (ID_CLUBE) equipa.ID_CLUBE = ID_CLUBE;

    const updatedEquipa = await equipa.save();
    res.status(200).json({ message: 'Equipa atualizada com sucesso!', equipa: updatedEquipa });
  } catch (error) {
    console.error('Erro ao atualizar equipa:', error);
    res.status(500).json({ error: 'Erro ao atualizar equipa' });
  }
};

// Delete a team by id_equipa
equipaController.deleteEquipa = async (req, res) => {
  const { ID_EQUIPA } = req.params;

  try {
    const deletedEquipa = await Equipa.findOneAndDelete({ ID_EQUIPA });
    if (!deletedEquipa) {
      return res.status(404).json({ message: 'Equipa não encontrada' });
    }

    res.status(200).json({ message: 'Equipa deletada com sucesso!', equipa: deletedEquipa });
  } catch (error) {
    console.error('Erro ao deletar equipa:', error);
    res.status(500).json({ error: 'Erro ao deletar equipa' });
  }
};

equipaController.listTeamsByClub = async (req, res) => {
  try {
    const { ID_CLUBE } = req.params;

    if (!ID_CLUBE) {
      return res.status(400).json({ error: "ID do clube é obrigatório" });
    }

    // Buscar apenas as informações necessárias da equipa
    const equipas = await Equipa.find(
      { ID_CLUBE },
      { ID_EQUIPA: 1, NOME: 1, ABREVIATURA: 1, ESCALAO: 1, _id: 0 }
    );

    if (!equipas.length) {
      return res.status(404).json({ message: "Nenhuma equipa encontrada para este clube." });
    }

    // Buscar número de jogadores atribuídos a cada equipa
    const equipasComJogadores = await Promise.all(
      equipas.map(async (equipa) => {
        const numJogadores = await Relationship11.countDocuments({
          ID_EQUIPA: equipa.ID_EQUIPA,
        });

        return {
          ID_EQUIPA: equipa.ID_EQUIPA,
          NOME: equipa.NOME,
          ABREVIATURA: equipa.ABREVIATURA,
          ESCALAO: equipa.ESCALAO,
          NUMERO_JOGADORES: numJogadores, // 🔹 Número total de jogadores atribuídos
        };
      })
    );

    res.status(200).json(equipasComJogadores);
  } catch (error) {
    console.error("Erro ao listar equipas:", error);
    res.status(500).json({ error: "Erro ao listar equipas" });
  }
};

// Delete a team and its associated players in Relationship_11
// Delete a team and its associated players in Relationship_11
equipaController.deleteEquipaAndRemovePlayers = async (req, res) => {
  const { ID_EQUIPA } = req.params;
  console.log(`Deletando equipa com ID: ${ID_EQUIPA}`);  // Verifique se o ID está sendo capturado corretamente

  try {
    // Remover as relações na Relationship_11
    const deletedRelations = await Relationship11.deleteMany({ ID_EQUIPA });

    // Remover a equipa
    const deletedEquipa = await Equipa.findOneAndDelete({ ID_EQUIPA });

    if (!deletedEquipa) {
      return res.status(404).json({ message: 'Equipa não encontrada' });
    }

    res.status(200).json({
      message: 'Equipa e suas relações de jogadores deletadas com sucesso!',
      equipa: deletedEquipa,
      relationsDeleted: deletedRelations.deletedCount
    });
  } catch (error) {
    console.error('Erro ao deletar equipa e relações:', error);
    res.status(500).json({ error: 'Erro ao deletar equipa e relações' });
  }
};




module.exports = equipaController;
