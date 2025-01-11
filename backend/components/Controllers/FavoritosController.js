const Favoritos = require('../Models/Favoritos');

const favoritosController = {};

// Add a new favorito
favoritosController.addFavorito = async (req, res) => {
  const { id_clube, id_user } = req.body;

  try {
    // Fetch the highest current id_favoritos in the collection
    const maxFavorito = await Favoritos.findOne().sort({ id_favoritos: -1 }).select('id_favoritos');
    const id_favorito = maxFavorito ? maxFavorito.id_favoritos + 1 : 1; // Increment the max id_favoritos by 1 or set to 1 if none exists

    // Create a new favorito document with the calculated id_favorito
    const favorito = new Favoritos({ id_clube, id_user, id_favoritos: id_favorito });
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
    const favoritos = await Favoritos.find().populate('id_favoritos');
    res.status(200).json(favoritos);
  } catch (error) {
    console.error('Erro ao listar favoritos:', error);
    res.status(500).json({ error: 'Erro ao listar favoritos' });
  }
};

// Edit a favorito by id_favoritos
favoritosController.editFavorito = async (req, res) => {
  const { id_favoritos } = req.params;
  const { id_clube, id_user } = req.body;

  try {
    const favorito = await Favoritos.findOne({ id_favoritos });
    if (!favorito) {
      return res.status(404).json({ message: 'Favorito não encontrado' });
    }

    if (id_clube) favorito.id_clube = id_clube;
    if (id_user) favorito.id_user = id_user;

    const updatedFavorito = await favorito.save();
    res.status(200).json({ message: 'Favorito atualizado com sucesso!', favorito: updatedFavorito });
  } catch (error) {
    console.error('Erro ao atualizar favorito:', error);
    res.status(500).json({ error: 'Erro ao atualizar favorito' });
  }
};

// Delete a favorito by id_favoritos
favoritosController.deleteFavorito = async (req, res) => {
  const { id_favoritos } = req.params;

  try {
    const deletedFavorito = await Favoritos.findOneAndDelete({ id_favoritos });
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
