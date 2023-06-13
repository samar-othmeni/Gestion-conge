const express = require('express')
const router = express.Router()

const {
    createTypeConge,
    getAllTypesConge,
    getTypeConge
} = require('../controllers/typeCongeControllers')


router.post('/' , createTypeConge)

router.get('/' , getAllTypesConge)

router.get('/typeCongeId',getTypeConge)

module.exports = router