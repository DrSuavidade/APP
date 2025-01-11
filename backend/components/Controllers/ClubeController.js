const Clube = require('../Models/Clube');

const clubeController = {};

// Add a new club
clubeController.addClube = async (req, res) => {
  const { nome, abreviatura } = req.body;

  try {
    const maxClube = await Clube.findOne().sort({ id_clube: -1 }).select('id_clube');
    const id_clube = maxClube ? maxClube.id_clube + 1 : 1;

    const clube = new Clube({ nome, abreviatura, id_clube });
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
  const { id_clube } = req.params;
  const { nome, abreviatura } = req.body;

  try {
    const clube = await Clube.findOne({ id_clube });
    if (!clube) {
      return res.status(404).json({ message: 'Clube não encontrado' });
    }

    if (nome) clube.nome = nome;
    if (abreviatura) clube.abreviatura = abreviatura;

    const updatedClube = await clube.save();
    res.status(200).json({ message: 'Clube atualizado com sucesso!', clube: updatedClube });
  } catch (error) {
    console.error('Erro ao atualizar clube:', error);
    res.status(500).json({ error: 'Erro ao atualizar clube' });
  }
};

// Delete a club by id_clube
clubeController.deleteClube = async (req, res) => {
  const { id_clube } = req.params;

  try {
    const deletedClube = await Clube.findOneAndDelete({ id_clube });
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
