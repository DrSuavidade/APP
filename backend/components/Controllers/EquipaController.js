const Equipa = require('../Models/Equipa');

const equipaController = {};

// Add a new team
equipaController.addEquipa = async (req, res) => {
  const { NOME, ESCALAO, ID_CLUBE } = req.body;

  try {
    const maxEquipa = await Equipa.findOne().sort({ ID_EQUIPA: -1 }).select('ID_EQUIPA');
    const ID_EQUIPA = maxEquipa ? maxEquipa.ID_EQUIPA + 1 : 1;

    const equipa = new Equipa({ NOME, ESCALAO, ID_CLUBE, ID_EQUIPA });
    await equipa.save();

    res.status(201).json({ message: 'Equipa adicionada com sucesso!', equipa });
  } catch (error) {
    console.error('Erro ao adicionar equipa:', error);
    res.status(500).json({ error: 'Erro ao adicionar equipa' });
  }
};

// List all teams
equipaController.listEquipa = async (req, res) => {
  try {
    const equipas = await Equipa.find();
    res.status(200).json(equipas);
  } catch (error) {
    console.error('Erro ao listar equipas:', error);
    res.status(500).json({ error: 'Erro ao listar equipas' });
  }
};

// Edit a team by id_equipa
equipaController.editEquipa = async (req, res) => {
  const { ID_EQUIPA } = req.params;
  const { NOME, ESCALAO, ID_CLUBE } = req.body;

  try {
    const equipa = await Equipa.findOne({ ID_EQUIPA });
    if (!equipa) {
      return res.status(404).json({ message: 'Equipa não encontrada' });
    }

    if (NOME) equipa.NOME = NOME;
    if (ESCALAO) equipa.ESCALAO = ESCALAO;
    if (ID_CLUBE) equipa.ID_CLUBE = ID_CLUBE;

    const updatedEquipa = await equipa.save();
    res.status(200).json({ message: 'Equipa atualizada com sucesso!', equipa: updatedEquipa });
  } catch (error) {
    console.error('Erro ao atualizar equipa:', error);
    res.status(500).json({ error: 'Erro ao atualizar equipa' });
  }
};

// Delete a team by id_equipa
equipaController.deleteEquipa = async (req, res) => {
  const { ID_EQUIPA } = req.params;

  try {
    const deletedEquipa = await Equipa.findOneAndDelete({ ID_EQUIPA });
    if (!deletedEquipa) {
      return res.status(404).json({ message: 'Equipa não encontrada' });
    }

    res.status(200).json({ message: 'Equipa deletada com sucesso!', equipa: deletedEquipa });
  } catch (error) {
    console.error('Erro ao deletar equipa:', error);
    res.status(500).json({ error: 'Erro ao deletar equipa' });
  }
};

module.exports = equipaController;
