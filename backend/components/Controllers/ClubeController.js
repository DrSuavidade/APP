const Clube = require('../Models/Clube');

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

module.exports = clubeController;
