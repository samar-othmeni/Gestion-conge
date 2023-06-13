const TypeConge = require('../models/typeCongeModel')

// créer un nouveau type de congé
const createTypeConge = async (req, res) => {
  try {
    const newTypeConge = new TypeConge(req.body);
    const savedTypeConge = await newTypeConge.save();
    res.status(201).json(savedTypeConge);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};


// récupérer tous les types de congé
const getAllTypesConge = async (req, res) => {
  try {
    const typesConge = await TypeConge.find({});
    res.status(200).json(typesConge);
  } catch (error) {
    res.status(500).json({ err: err.message });
  }
};

const getTypeConge = async (req, res) => {
  try {
    const typeConge = await TypeConge.findById(req.params.typeCongeId);
    if (!typeConge) {
      throw new Error('Aucun type de congé trouvé avec cet identifiant.');
    }
    res.json(typeConge);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};


module.exports ={
    createTypeConge,
    getAllTypesConge,
    getTypeConge
}