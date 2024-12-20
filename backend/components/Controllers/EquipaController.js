const Equipa = require('../Models/Equipa');

const equipaController = {};

// Add a new team
equipaController.addEquipa = async (req, res) => {
  const { nome, escalao, id_clube } = req.body;

  try {
    const maxEquipa = await Equipa.findOne().sort({ id_equipa: -1 }).select('id_equipa');
    const id_equipa = maxEquipa ? maxEquipa.id_equipa + 1 : 1;

    const equipa = new Equipa({ nome, escalao, id_clube, id_equipa });
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
  const { id_equipa } = req.params;
  const { nome, escalao, id_clube } = req.body;

  try {
    const equipa = await Equipa.findOne({ id_equipa });
    if (!equipa) {
      return res.status(404).json({ message: 'Equipa não encontrada' });
    }

    if (nome) equipa.nome = nome;
    if (escalao) equipa.escalao = escalao;
    if (id_clube) equipa.id_clube = id_clube;

    const updatedEquipa = await equipa.save();
    res.status(200).json({ message: 'Equipa atualizada com sucesso!', equipa: updatedEquipa });
  } catch (error) {
    console.error('Erro ao atualizar equipa:', error);
    res.status(500).json({ error: 'Erro ao atualizar equipa' });
  }
};

// Delete a team by id_equipa
equipaController.deleteEquipa = async (req, res) => {
  const { id_equipa } = req.params;

  try {
    const deletedEquipa = await Equipa.findOneAndDelete({ id_equipa });
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
