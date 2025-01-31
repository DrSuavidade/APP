const EquipaSombra = require('../Models/EquipaSombra');

const equipaSombraController = {};

// Add a new tipoUtilizador
equipaSombraController.addEquipaSombra = async (req, res) => {
  const { ID_USER, NOME } = req.body;

  try {
    // Fetch the highest current id_tipo in the collection
    const maxEquipaSombra = await EquipaSombra.findOne().sort({ ID_SOMBRA: -1 }).select('ID_SOMBRA');
    const ID_SOMBRA = maxEquipaSombra ? maxEquipaSombra.ID_SOMBRA + 1 : 1; // Increment the max id_tipo by 1 or set to 1 if none exists

    // Create a new tipoUtilizador document with the calculated id_tipo
    const equipaSombra = new EquipaSombra({ ID_USER, ID_SOMBRA, NOME });
    await equipaSombra.save();

    res.status(201).json({ message: 'Equipa Sombra adicionado com sucesso!', equipaSombra });
  } catch (error) {
    console.error('Erro ao adicionar equipa sombra:', error);
    res.status(500).json({ error: 'Erro ao adicionar equipa sombra' });
  }
};

// List all tipoUtilizador
equipaSombraController.listEquipaSombra = async (req, res) => {
  try {
    const equipaSombra = await EquipaSombra.find();
    res.status(200).json(equipaSombra);
  } catch (error) {
    console.error('Erro ao listar equipas sombra:', error);
    res.status(500).json({ error: 'Erro ao listar equipas sombra' });
  }
};

equipaSombraController.listEquipaSombraByUser = async (req, res) => {
  const { ID_USER } = req.query; // Get user ID from query params

  try {
    const equipasSombra = await EquipaSombra.find({ ID_USER }).select();
    res.status(200).json(equipasSombra);
  } catch (error) {
    console.error('Erro ao listar equipas sombra:', error);
    res.status(500).json({ error: 'Erro ao listar equipas sombra' });
  }
};


// Edit a tipoUtilizador by id_tipo
equipaSombraController.editEquipaSombra = async (req, res) => {
  const { ID_SOMBRA } = req.params;
  const { ID_USER, NOME } = req.body;

  try {
    const equipaSombra = await EquipaSombra.findOne({ ID_SOMBRA });
    if (!equipaSombra) {
      return res.status(404).json({ message: 'Equipa Sombra não encontrada' });
    }

    if (ID_USER) equipaSombra.ID_USER = ID_USER;
    if (NOME) equipaSombra.NOME = NOME;

    const updatedEquipaSombra = await equipaSombra.save();
    res.status(200).json({ message: 'Equipa Sombra atualizado com sucesso!', equipaSombra: updatedEquipaSombra });
  } catch (error) {
    console.error('Erro ao atualizar equipa sombra:', error);
    res.status(500).json({ error: 'Erro ao atualizar equipa sombra' });
  }
};

// Delete a tipoUtilizador by id_tipo
equipaSombraController.deleteEquipaSombra = async (req, res) => {
  const { ID_SOMBRA } = req.params;

  try {
    const deletedEquipaSombra = await EquipaSombra.findOneAndDelete({ ID_SOMBRA });
    if (!deletedEquipaSombra) {
      return res.status(404).json({ message: 'EquipaSombra não encontrada' });
    }

    res.status(200).json({ message: 'EquipaSombra deletada com sucesso!', equipaSombra: deletedEquipaSombra });
  } catch (error) {
    console.error('Erro ao deletar equipa sombra:', error);
    res.status(500).json({ error: 'Erro ao deletar equipa sombra' });
  }
};

module.exports = equipaSombraController;
