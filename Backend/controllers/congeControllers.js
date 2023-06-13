//const  mongoose  = require('mongoose');
const Conge = require('../models/congeModels');
const User = require('../models/userModel')
const TypeConge = require('../models/typeCongeModel')
const moment = require('moment');




const createConge = async (req, res) => {
  const { userId, typeCongeId, dateDebut, dateFin } = req.body;
  const errors = []; // Add an empty array to store errors

  try {
    const user = await User.findById(userId);
    if (!user) {
      errors.push('Aucun employé trouvé avec cet identifiant.'); // Push the error message to the errors array
    }
    const typeConge = await TypeConge.findById(typeCongeId);
    if (!typeConge) {
      errors.push('Aucun type de congé trouvé avec cet identifiant.'); // Push the error message to the errors array
    }

    if (moment(dateDebut).isSameOrAfter(moment(dateFin))) {
      errors.push('La date de début doit être antérieure à la date de fin.'); // Push the error message to the errors array
    }

    const daysRequested = moment(dateFin).diff(moment(dateDebut), 'days') ;
    const userSolde = user.solde[typeConge.nom.toLowerCase()];
    const maxJours = typeConge.nombreMaxJours;

    if (daysRequested > userSolde) {
      errors.push(`Le solde de congé pour ${typeConge.nom} est insuffisant.`); // Push the error message to the errors array
    }

    if (daysRequested > maxJours) {
      errors.push(`Le nombre de jours demandés (${daysRequested}) dépasse le nombre maximum de jours (${maxJours}) pour le type de congé ${typeConge.nom}.`); // Push the error message to the errors array
    }

    if (errors.length > 0) { // Check if there are any errors
      res.status(400).json({ errors }); // Return the errors array as the response
    } else {
      const conge = new Conge({ user: user._id, typeConge: typeConge._id, dateDebut, dateFin });
      await conge.save();

      const populatedConge = await Conge.findById(conge._id).populate('user').populate('typeConge');

      res.status(201).json(populatedConge);
    }
  } catch (error) {
    res.status(400).json({ errors: [error.message] }); // Wrap the error message in an array and return as response
  }
};



// ici l'administrateur va récuperer toutes les demendes de tous les employs
const getAllConges = async (req, res) => {
  try {
    const conges = await Conge.find();
    res.json(conges);
  } catch (error) {
    res.status(400).json({ error });
  }
};


// l'employe va récuperer tous ces demandes de congé
const getAllCongesByUser = async (req, res) => {
  const userId = req.params.userId;

  try {
    const conges = await Conge.find({ user: userId })
      .populate('typeConge', 'nom nombreMaxJours')
      .select('-user -createdAt -updatedAt -__v');
    res.json(conges);
    
  } catch (error) {
    res.status(400).json({ error });
  }
}



const checkAndApproveConge = async (req, res) => {
  const { congeId } = req.params;
  const { userId } = req.body;

  try {
    // Vérifier que l'utilisateur est un administrateur
    const adminUser = await User.findById(userId);
    if (!adminUser || !adminUser.isAdmin) {
      throw new Error('Vous n\'êtes pas autorisé à effectuer cette action.');
    }

    // Vérifier que la demande de congé existe
    const conge = await Conge.findById(congeId);
    if (!conge) {
      throw new Error('Aucune demande de congé trouvée avec cet identifiant.');
    }

    // Vérifier que la demande de congé est en attente
    if (conge.status !== 'en attente') {
      throw new Error('Cette demande de congé a déjà été traitée.');
    }

    // Vérifier que le solde est suffisant pour l'utilisateur
    const user = await User.findById(conge.user);
    const typeCongeId = conge.typeConge;
    const typeConge = await TypeConge.findById(typeCongeId);
    const typeCongeNom = typeConge && typeConge.nom ? typeConge.nom.toLowerCase() : null;
    const userSolde = user.solde[typeCongeNom] || 0;
    const daysRequested = moment(conge.dateFin).diff(moment(conge.dateDebut), 'days') ;
    if (!typeConge || !typeConge.nom || !typeCongeNom || userSolde < daysRequested) {
      const message = `Le solde de congé ${typeCongeNom ? `pour ${typeCongeNom}` : ''} est insuffisant.`;
      throw new Error(message);
    }

    // Mettre à jour le statut de la demande de congé
    conge.status = 'approuvé';
    await conge.save();

    // Mettre à jour le solde de l'utilisateur
    user.solde[typeCongeNom] -= daysRequested;
    await user.save();

    res.status(200).json({ message: 'La demande de congé a été acceptée.' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};







const checkAndRefuseConge = async (req, res) => {
  const { congeId } = req.params;
  const { userId, typeCongeId } = req.body;
  
  try {
    // Vérifier que l'utilisateur est un administrateur
    const user = await User.findById(userId);
    if (!user || !user.isAdmin) {
      throw new Error('Vous n\'êtes pas autorisé à effectuer cette action.');
    }
    
    // Vérifier que la demande de congé existe
    const conge = await Conge.findById(congeId);
    if (!conge) {
      throw new Error('Aucune demande de congé trouvée avec cet identifiant.');
    }
    
    // Vérifier que la demande de congé est en attente
    if (conge.status !== 'en attente') {
      throw new Error('Cette demande de congé a déjà été traitée.');
    }
    

    
    // Mettre à jour le statut de la demande de congé
    conge.status = 'refusé';
    await conge.save();
    
    res.status(200).json({ message: 'La demande de congé a été refusée.' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


module.exports = {
    createConge,
    getAllConges,
    getAllCongesByUser,
    checkAndApproveConge,
    checkAndRefuseConge
}