const Account = require('../models/accountModel')
const jwt = require('jsonwebtoken')
const { mongoose } = require('mongoose')

const createToken = (_id, role) => {
    return jwt.sign({_id, role}, process.env.SECRET, {expiresIn:'3d'} )
}

// login user
const loginUser = async (req,res) => {
    const {matricule, password} = req.body

    try {
        const account = await Account.login(matricule, password)

        //create token
        const token = createToken(account._id, account.role)
        res.status(200).json({matricule, token, role:account.role})
        
    } catch (error) {
        res.status(400).json({error:error.message})
    }
}

//signup user
const signupUser = async (req,res) =>{
    const {matricule, password, role} = req.body

    try {
        const account = await Account.signup(matricule, password, role)

        //create a token
        const token = createToken(account._id, account.role)

        res.status(200).json({matricule, token})
    }catch (error){
        res.status(400).json({error: error.message})
    }
}


module.exports = {signupUser ,loginUser}