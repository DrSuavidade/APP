const Favoritos = require('../Models/Favoritos');

const favoritosController = {};

// Add a new favorito
favoritosController.addFavorito = async (req, res) => {
  const { ID_CLUBE, ID_USER } = req.body;

  try {
    // Create a new favorito document with the calculated id_favorito
    const favorito = new Favoritos({ ID_CLUBE, ID_USER });
    await favorito.save();

    res.status(201).json({ message: 'Favorito adicionado com sucesso!', favorito });
  } catch (error) {
    console.error('Erro ao adicionar favorito:', error);
    res.status(500).json({ error: 'Erro ao adicionar favorito' });
  }
};

// List all favoritos
favoritosController.listFavoritos = async (req, res) => {
  try {
    const favoritos = await Favoritos.find();
    res.status(200).json(favoritos);
  } catch (error) {
    console.error('Erro ao listar favoritos:', error);
    res.status(500).json({ error: 'Erro ao listar favoritos' });
  }
};

// Edit a favorito by id_favoritos
favoritosController.editFavorito = async (req, res) => {
  const { ID_CLUBE, ID_USER } = req.params;
  const { NEW_ID_CLUBE, NEW_ID_USER } = req.body;

  try {
    const favorito = await Favoritos.findOne({ ID_CLUBE, ID_USER });
    if (!favorito) {
      return res.status(404).json({ message: 'Favorito não encontrado' });
    }

    if (NEW_ID_CLUBE) favorito.ID_CLUBE = NEW_ID_CLUBE;
    if (NEW_ID_USER) favorito.ID_USER = NEW_ID_USER;

    const updatedFavorito = await favorito.save();
    res.status(200).json({ message: 'Favorito atualizado com sucesso!', favorito: updatedFavorito });
  } catch (error) {
    console.error('Erro ao atualizar favorito:', error);
    res.status(500).json({ error: 'Erro ao atualizar favorito' });
  }
};

// Delete a favorito by id_favoritos
favoritosController.deleteFavorito = async (req, res) => {
  const { ID_CLUBE, ID_USER } = req.params;

  try {
    const deletedFavorito = await Favoritos.findOneAndDelete({ ID_CLUBE, ID_USER });
    if (!deletedFavorito) {
      return res.status(404).json({ message: 'Favorito não encontrado' });
    }

    res.status(200).json({ message: 'Favorito deletado com sucesso!', favorito: deletedFavorito });
  } catch (error) {
    console.error('Erro ao deletar favorito:', error);
    res.status(500).json({ error: 'Erro ao deletar favorito' });
  }
};

module.exports = favoritosController;
