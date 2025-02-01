const Clube = require('../Models/Clube');
const Equipa = require('../Models/Equipa');
const clubeController = {};

// Add a new club
clubeController.addClube = async (req, res) => {
  const { NOME, ABREVIATURA } = req.body;

  try {
    const maxClube = await Clube.findOne().sort({ ID_CLUBE: -1 }).select('ID_CLUBE');
    const ID_CLUBE = maxClube ? maxClube.ID_CLUBE + 1 : 1;

    const clube = new Clube({ NOME, ABREVIATURA, ID_CLUBE });
    await clube.save();

    res.status(201).json({ message: 'Clube adicionado com sucesso!', clube });
  } catch (error) {
    console.error('Erro ao adicionar clube:', error);
    res.status(500).json({ error: 'Erro ao adicionar clube' });
  }
};

// List all clubs
clubeController.listClube = async (req, res) => {
  try {
    const clubes = await Clube.find();
    res.status(200).json(clubes);
  } catch (error) {
    console.error('Erro ao listar clubes:', error);
    res.status(500).json({ error: 'Erro ao listar clubes' });
  }
};

// Edit a club by id_clube
clubeController.editClube = async (req, res) => {
  const { ID_CLUBE } = req.params;
  const { NOME, ABREVIATURA } = req.body;

  try {
    const clube = await Clube.findOne({ ID_CLUBE });
    if (!clube) {
      return res.status(404).json({ message: 'Clube não encontrado' });
    }

    if (NOME) clube.NOME = NOME;
    if (ABREVIATURA) clube.ABREVIATURA = ABREVIATURA;

    const updatedClube = await clube.save();
    res.status(200).json({ message: 'Clube atualizado com sucesso!', clube: updatedClube });
  } catch (error) {
    console.error('Erro ao atualizar clube:', error);
    res.status(500).json({ error: 'Erro ao atualizar clube' });
  }
};

// Delete a club by id_clube
clubeController.deleteClube = async (req, res) => {
  const { ID_CLUBE } = req.params;

  try {
    const deletedClube = await Clube.findOneAndDelete({ ID_CLUBE });
    if (!deletedClube) {
      return res.status(404).json({ message: 'Clube não encontrado' });
    }

    res.status(200).json({ message: 'Clube deletado com sucesso!', clube: deletedClube });
  } catch (error) {
    console.error('Erro ao deletar clube:', error);
    res.status(500).json({ error: 'Erro ao deletar clube' });
  }
};

clubeController.listClubesWithTeams = async (req, res) => {
  try {
    const clubes = await Clube.find({}, { NOME: 1, ABREVIATURA: 1, ID_CLUBE: 1 });

    const clubesComTotalEquipas = await Promise.all(
      clubes.map(async (clube) => {
        const totalEquipas = await Equipa.countDocuments({ ID_CLUBE: clube.ID_CLUBE });
        return {
          id_clube: clube.ID_CLUBE,  // Agora retorna também o ID_CLUBE
          nome: clube.NOME,
          abreviatura: clube.ABREVIATURA,
          totalEquipas,
        };
      })
    );

    res.status(200).json(clubesComTotalEquipas);
  } catch (error) {
    console.error("Erro ao listar clubes com equipas:", error);
    res.status(500).json({ error: "Erro ao listar clubes com equipas." });
  }
};

clubeController.deleteSelectedClubes = async (req, res) => {
  const { clubesIds } = req.body; // Recebe uma lista de IDs dos clubes a serem excluídos

  if (!clubesIds || clubesIds.length === 0) {
    return res.status(400).json({ error: "Nenhum clube selecionado para exclusão." });
  }

  try {
    // Deletar os clubes que têm os IDs fornecidos
    const deletedClubs = await Clube.deleteMany({ ID_CLUBE: { $in: clubesIds } });

    if (deletedClubs.deletedCount === 0) {
      return res.status(404).json({ error: "Nenhum clube encontrado para exclusão." });
    }

    res.status(200).json({ success: true, message: "Clubes excluídos com sucesso!", count: deletedClubs.deletedCount });
  } catch (error) {
    console.error("❌ Erro ao excluir clubes:", error);
    res.status(500).json({ error: "Erro ao excluir clubes." });
  }
};

// Novo método para buscar nome e abreviatura de um clube pelo ID_CLUBE
clubeController.getClubeById = async (req, res) => {
  try {
    const { ID_CLUBE } = req.params;

    if (!ID_CLUBE) {
      return res.status(400).json({ error: "ID do clube é obrigatório" });
    }

    const clube = await Clube.findOne(
      { ID_CLUBE },
      { NOME: 1, ABREVIATURA: 1, _id: 0 }
    );

    if (!clube) {
      return res.status(404).json({ message: "Clube não encontrado." });
    }

    res.status(200).json(clube);
  } catch (error) {
    console.error("Erro ao buscar informações do clube:", error);
    res.status(500).json({ error: "Erro ao buscar informações do clube." });
  }
};


module.exports = clubeController;
