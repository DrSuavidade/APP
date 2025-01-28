const TipoUtilizador = require('../Models/TipoUtilizador');

const tipoUtilizadorController = {};

// Add a new tipoUtilizador
tipoUtilizadorController.addTipoUtilizador = async (req, res) => {
  const { PERMISSOES } = req.body;

  try {
    // Fetch the highest current id_tipo in the collection
    const maxTipoUtilizador = await TipoUtilizador.findOne().sort({ ID_TIPO: -1 }).select('ID_TIPO');
    const ID_TIPO = maxTipoUtilizador ? maxTipoUtilizador.ID_TIPO + 1 : 1; // Increment the max id_tipo by 1 or set to 1 if none exists

    // Create a new tipoUtilizador document with the calculated id_tipo
    const tipoUtilizador = new TipoUtilizador({ PERMISSOES, ID_TIPO });
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

tipoUtilizadorController.listTPbyName = async (req, res) => {
  try {
    // Buscar apenas os campos necessários: ID_TIPO e PERMISSOES
    const tipoUtilizadores = await TipoUtilizador.find().select("ID_TIPO PERMISSOES -_id");
    res.status(200).json(tipoUtilizadores);
  } catch (error) {
    console.error("Erro ao listar os tipos de utilizadores:", error);
    res.status(500).json({ error: "Erro ao listar tipos de utilizadores." });
  }
};



// Edit a tipoUtilizador by id_tipo
tipoUtilizadorController.editTipoUtilizador = async (req, res) => {
  const { ID_TIPO } = req.params;
  const { PERMISSOES } = req.body;

  try {
    const tipoUtilizador = await TipoUtilizador.findOne({ ID_TIPO });
    if (!tipoUtilizador) {
      return res.status(404).json({ message: 'Tipo de Utilizador não encontrado' });
    }

    if (PERMISSOES) tipoUtilizador.PERMISSOES = PERMISSOES;

    const updatedTipoUtilizador = await tipoUtilizador.save();
    res.status(200).json({ message: 'Tipo de Utilizador atualizado com sucesso!', tipoUtilizador: updatedTipoUtilizador });
  } catch (error) {
    console.error('Erro ao atualizar tipo de utilizador:', error);
    res.status(500).json({ error: 'Erro ao atualizar tipo de utilizador' });
  }
};

// Delete a tipoUtilizador by id_tipo
tipoUtilizadorController.deleteTipoUtilizador = async (req, res) => {
  const { ID_TIPO } = req.params;

  try {
    const deletedTipoUtilizador = await TipoUtilizador.findOneAndDelete({ ID_TIPO });
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
