const express = require('express')
const router = express.Router()

const {
    createConge,
    getAllConges,
    getAllCongesByUser,
    checkAndApproveConge,
    checkAndRefuseConge
} = require('../controllers/congeControllers')

// Route pour créer une demande de congé
router.post('/' , createConge)

// Route pour récupérer toutes les demandes de congé
router.get('/',getAllConges)

// Route pour récupérer toutes les demandes de congé d'un employé
router.get('/user/:userId/conges', getAllCongesByUser);

// Route pour accepter une demande de congé
router.put('/:congeId/accepter', checkAndApproveConge);

// Route pour refuser une demande de congé
router.put('/:congeId/refuser', checkAndRefuseConge);

module.exports = router

