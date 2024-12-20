const TipoUtilizador = require('../Models/TipoUtilizador');

const tipoUtilizadorController = {};

// Add a new tipoUtilizador
tipoUtilizadorController.addTipoUtilizador = async (req, res) => {
  const { permissoes } = req.body;

  try {
    // Fetch the highest current id_tipo in the collection
    const maxTipoUtilizador = await TipoUtilizador.findOne().sort({ id_tipo: -1 }).select('id_tipo');
    const id_tipo = maxTipoUtilizador ? maxTipoUtilizador.id_tipo + 1 : 1; // Increment the max id_tipo by 1 or set to 1 if none exists

    // Create a new tipoUtilizador document with the calculated id_tipo
    const tipoUtilizador = new TipoUtilizador({ permissoes, id_tipo });
    await tipoUtilizador.save();

    res.status(201).json({ message: 'Tipo de Utilizador adicionado com sucesso!', tipoUtilizador });
  } catch (error) {
    console.error('Erro ao adicionar tipo de utilizador:', error);
    res.status(500).json({ error: 'Erro ao adicionar tipo de utilizador' });
  }
};

// List all tipoUtilizador
tipoUtilizadorController.listTipoUtilizador = async (req, res) => {
  try {
    const tipoUtilizadors = await TipoUtilizador.find();
    res.status(200).json(tipoUtilizadors);
  } catch (error) {
    console.error('Erro ao listar tipo de utilizador:', error);
    res.status(500).json({ error: 'Erro ao listar tipo de utilizador' });
  }
};

// Edit a tipoUtilizador by id_tipo
tipoUtilizadorController.editTipoUtilizador = async (req, res) => {
  const { id_tipo } = req.params;
  const { permissoes } = req.body;

  try {
    const tipoUtilizador = await TipoUtilizador.findOne({ id_tipo });
    if (!tipoUtilizador) {
      return res.status(404).json({ message: 'Tipo de Utilizador não encontrado' });
    }

    if (permissoes) tipoUtilizador.permissoes = permissoes;

    const updatedTipoUtilizador = await tipoUtilizador.save();
    res.status(200).json({ message: 'Tipo de Utilizador atualizado com sucesso!', tipoUtilizador: updatedTipoUtilizador });
  } catch (error) {
    console.error('Erro ao atualizar tipo de utilizador:', error);
    res.status(500).json({ error: 'Erro ao atualizar tipo de utilizador' });
  }
};

// Delete a tipoUtilizador by id_tipo
tipoUtilizadorController.deleteTipoUtilizador = async (req, res) => {
  const { id_tipo } = req.params;

  try {
    const deletedTipoUtilizador = await TipoUtilizador.findOneAndDelete({ id_tipo });
    if (!deletedTipoUtilizador) {
      return res.status(404).json({ message: 'Tipo de Utilizador não encontrado' });
    }

    res.status(200).json({ message: 'Tipo de Utilizador deletado com sucesso!', tipoUtilizador: deletedTipoUtilizador });
  } catch (error) {
    console.error('Erro ao deletar tipo de utilizador:', error);
    res.status(500).json({ error: 'Erro ao deletar tipo de utilizador' });
  }
};

module.exports = tipoUtilizadorController;
