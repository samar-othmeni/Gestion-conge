const express = require('express')
const router = express.Router()


//user controllers
const {createUser,getUsers,getUser} = require ('../controllers/userControllers')

// create user
router.post('/' , createUser)

//get user
router.get('/' , getUsers)

//get user by id a specific user
router.get('/:userId' , getUser)

module.exports = router