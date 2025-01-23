const RelacaoSombra = require('../Models/RelacaoSombra');

const relacaoSombraController = {};

// Add a new tipoUtilizador
relacaoSombraController.addRelacaoSombra = async (req, res) => {
  const { ID_JOGADORES, ID_SOMBRA, ID_POSICAO } = req.body;

  try {
    // Fetch the highest current id_tipo in the collection
    const maxRelacaoSombra = await RelacaoSombra.findOne().sort({ ID_RELACAO: -1 }).select('ID_RELACAO');
    const ID_RELACAO = maxRelacaoSombra ? maxRelacaoSombra.ID_RELACAO + 1 : 1; // Increment the max id_tipo by 1 or set to 1 if none exists

    // Create a new tipoUtilizador document with the calculated id_tipo
    const relacaoSombra = new RelacaoSombra({ ID_JOGADORES, ID_SOMBRA, ID_POSICAO, ID_RELACAO });
    await relacaoSombra.save();

    res.status(201).json({ message: 'Relacao Sombra adicionado com sucesso!', relacaoSombra });
  } catch (error) {
    console.error('Erro ao adicionar relacao sombra:', error);
    res.status(500).json({ error: 'Erro ao adicionar relacao sombra' });
  }
};

// List all tipoUtilizador
relacaoSombraController.listRelacaoSombra = async (req, res) => {
  try {
    const relacaoSombra = await RelacaoSombra.find();
    res.status(200).json(relacaoSombra);
  } catch (error) {
    console.error('Erro ao listar relacoes sombra:', error);
    res.status(500).json({ error: 'Erro ao listar relacoes sombra' });
  }
};

// Edit a tipoUtilizador by id_tipo
relacaoSombraController.editRelacaoSombra = async (req, res) => {
  const { ID_RELACAO } = req.params;
  const { ID_JOGADORES, ID_SOMBRA, ID_POSICAO } = req.body;

  try {
    const relacaoSombra = await RelacaoSombra.findOne({ ID_RELACAO });
    if (!relacaoSombra) {
      return res.status(404).json({ message: 'Relacao Sombra não encontrada' });
    }

    if (ID_JOGADORES) relacaoSombra.ID_JOGADORES = ID_JOGADORES;
    if (ID_SOMBRA) relacaoSombra.ID_SOMBRA = ID_SOMBRA;
    if (ID_POSICAO) relacaoSombra.ID_POSICAO = ID_POSICAO;

    const updatedRelacaoSombra = await relacaoSombra.save();
    res.status(200).json({ message: 'Relacao Sombra atualizado com sucesso!', relacaoSombra: updatedRelacaoSombra });
  } catch (error) {
    console.error('Erro ao atualizar relacao sombra:', error);
    res.status(500).json({ error: 'Erro ao atualizar relacao sombra' });
  }
};

// Delete a tipoUtilizador by id_tipo
relacaoSombraController.deleteRelacaoSombra = async (req, res) => {
  const { ID_RELACAO } = req.params;

  try {
    const deletedRelacaoSombra = await RelacaoSombra.findOneAndDelete({ ID_RELACAO });
    if (!deletedRelacaoSombra) {
      return res.status(404).json({ message: 'RelacaoSombra não encontrada' });
    }

    res.status(200).json({ message: 'RelacaoSombra deletada com sucesso!', relacaoSombra: deletedRelacaoSombra });
  } catch (error) {
    console.error('Erro ao deletar relacao sombra:', error);
    res.status(500).json({ error: 'Erro ao deletar relacao sombra' });
  }
};

module.exports = relacaoSombraController;
