const Posicao = require('../Models/Posicao');

const posicaoController = {};

// Add a new position
posicaoController.addPosicao = async (req, res) => {
  const { NOME } = req.body;

  try {
    const maxPosicao = await Posicao.findOne().sort({ ID_POSICAO: -1 }).select('ID_POSICAO');
    const ID_POSICAO = maxPosicao ? maxPosicao.ID_POSICAO + 1 : 1;

    const posicao = new Posicao({ NOME, ID_POSICAO });
    await posicao.save();

    res.status(201).json({ message: 'Posição adicionada com sucesso!', posicao });
  } catch (error) {
    console.error('Erro ao adicionar posição:', error);
    res.status(500).json({ error: 'Erro ao adicionar posição' });
  }
};

// List all positions
posicaoController.listPosicao = async (req, res) => {
  try {
    const posicoes = await Posicao.find();
    res.status(200).json(posicoes);
  } catch (error) {
    console.error('Erro ao listar posições:', error);
    res.status(500).json({ error: 'Erro ao listar posições' });
  }
};

// Edit a position by id_posicao
posicaoController.editPosicao = async (req, res) => {
  const { ID_POSICAO } = req.params;
  const { NOME } = req.body;

  try {
    const posicao = await Posicao.findOne({ ID_POSICAO });
    if (!posicao) {
      return res.status(404).json({ message: 'Posição não encontrada' });
    }

    if (NOME) posicao.NOME = NOME;

    const updatedPosicao = await posicao.save();
    res.status(200).json({ message: 'Posição atualizada com sucesso!', posicao: updatedPosicao });
  } catch (error) {
    console.error('Erro ao atualizar posição:', error);
    res.status(500).json({ error: 'Erro ao atualizar posição' });
  }
};

// Delete a position by id_posicao
posicaoController.deletePosicao = async (req, res) => {
  const { ID_POSICAO } = req.params;

  try {
    const deletedPosicao = await Posicao.findOneAndDelete({ ID_POSICAO });
    if (!deletedPosicao) {
      return res.status(404).json({ message: 'Posição não encontrada' });
    }

    res.status(200).json({ message: 'Posição deletada com sucesso!', posicao: deletedPosicao });
  } catch (error) {
    console.error('Erro ao deletar posição:', error);
    res.status(500).json({ error: 'Erro ao deletar posição' });
  }
};

module.exports = posicaoController;
