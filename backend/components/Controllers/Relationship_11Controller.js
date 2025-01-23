const Relationship11 = require('../Models/Relationship_11');

const relationship11Controller = {};

// Add a new favorito
relationship11Controller.addRelationship11 = async (req, res) => {
  const { ID_EQUIPA, ID_JOGADORES } = req.body;

  try {
    // Create a new favorito document with the calculated id_favorito
    const relationship11 = new Relationship11({ ID_EQUIPA, ID_JOGADORES });
    await relationship11.save();

    res.status(201).json({ message: 'Relationship11 adicionado com sucesso!', relationship11 });
  } catch (error) {
    console.error('Erro ao adicionar relationship11:', error);
    res.status(500).json({ error: 'Erro ao adicionar relationship11' });
  }
};

// List all favoritos
relationship11Controller.listRelationship11 = async (req, res) => {
  try {
    const relationship11 = await Relationship11.find();
    res.status(200).json(relationship11);
  } catch (error) {
    console.error('Erro ao listar relationship11:', error);
    res.status(500).json({ error: 'Erro ao listar relationship11' });
  }
};

// Edit a favorito by id_favoritos
relationship11Controller.editRelationship11 = async (req, res) => {
  const { ID_EQUIPA, ID_JOGADORES } = req.params;
  const { NEW_ID_EQUIPA, NEW_ID_JOGADORES } = req.body;

  try {
    const relationship11 = await Relationship11.findOne({ ID_EQUIPA, ID_JOGADORES });
    if (!relationship11) {
      return res.status(404).json({ message: 'Relationship11 não encontrado' });
    }

    if (NEW_ID_EQUIPA) relationship11.ID_EQUIPA = NEW_ID_EQUIPA;
    if (NEW_ID_JOGADORES) relationship11.ID_JOGADORES = NEW_ID_JOGADORES;

    const updatedRelationship11 = await relationship11.save();
    res.status(200).json({ message: 'Relationship11 atualizado com sucesso!', relationship11: updatedRelationship11 });
  } catch (error) {
    console.error('Erro ao atualizar relationship11:', error);
    res.status(500).json({ error: 'Erro ao atualizar relationship11' });
  }
};

// Delete a favorito by id_favoritos
relationship11Controller.deleteRelationship11 = async (req, res) => {
  const { ID_EQUIPA, ID_JOGADORES } = req.params;

  try {
    const deletedRelationship11 = await Relationship11.findOneAndDelete({ ID_EQUIPA, ID_JOGADORES });
    if (!deletedRelationship11) {
      return res.status(404).json({ message: 'Relationship11 não encontrado' });
    }

    res.status(200).json({ message: 'Relationship11 deletado com sucesso!', relationship11: deletedRelationship11 });
  } catch (error) {
    console.error('Erro ao deletar relationship11:', error);
    res.status(500).json({ error: 'Erro ao deletar relationship11' });
  }
};

module.exports = relationship11Controller;
