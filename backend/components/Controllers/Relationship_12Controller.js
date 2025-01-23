const Relationship12 = require('../Models/Relationship_12');

const relationship12Controller = {};

// Add a new favorito
relationship12Controller.addRelationship12 = async (req, res) => {
  const { ID_JOGADORES, ID_EVENTOS } = req.body;

  try {
    // Create a new favorito document with the calculated id_favorito
    const relationship12 = new Relationship12({ ID_JOGADORES, ID_EVENTOS });
    await relationship12.save();

    res.status(201).json({ message: 'Relationship12 adicionado com sucesso!', relationship12 });
  } catch (error) {
    console.error('Erro ao adicionar relationship12:', error);
    res.status(500).json({ error: 'Erro ao adicionar relationship12' });
  }
};

// List all favoritos
relationship12Controller.listRelationship12 = async (req, res) => {
  try {
    const relationship12 = await Relationship12.find();
    res.status(200).json(relationship12);
  } catch (error) {
    console.error('Erro ao listar relationship12:', error);
    res.status(500).json({ error: 'Erro ao listar relationship12' });
  }
};

// Edit a favorito by id_favoritos
relationship12Controller.editRelationship12 = async (req, res) => {
  const { ID_JOGADORES, ID_EVENTOS } = req.params;
  const { NEW_ID_JOGADORES, NEW_ID_EVENTOS } = req.body;

  try {
    const relationship12 = await Relationship12.findOne({ ID_JOGADORES, ID_EVENTOS });
    if (!relationship12) {
      return res.status(404).json({ message: 'Relationship12 não encontrado' });
    }

    if (NEW_ID_JOGADORES) relationship12.ID_JOGADORES = NEW_ID_JOGADORES;
    if (NEW_ID_EVENTOS) relationship12.ID_EVENTOS = NEW_ID_EVENTOS;

    const updatedRelationship12 = await relationship12.save();
    res.status(200).json({ message: 'Relationship12 atualizado com sucesso!', relationship12: updatedRelationship12 });
  } catch (error) {
    console.error('Erro ao atualizar relationship12:', error);
    res.status(500).json({ error: 'Erro ao atualizar relationship12' });
  }
};

// Delete a favorito by id_favoritos
relationship12Controller.deleteRelationship12 = async (req, res) => {
  const { ID_JOGADORES, ID_EVENTOS } = req.params;

  try {
    const deletedRelationship12 = await Relationship12.findOneAndDelete({ ID_JOGADORES, ID_EVENTOS });
    if (!deletedRelationship12) {
      return res.status(404).json({ message: 'Relationship12 não encontrado' });
    }

    res.status(200).json({ message: 'Relationship12 deletado com sucesso!', relationship12: deletedRelationship12 });
  } catch (error) {
    console.error('Erro ao deletar relationship12:', error);
    res.status(500).json({ error: 'Erro ao deletar relationship12' });
  }
};

module.exports = relationship12Controller;
