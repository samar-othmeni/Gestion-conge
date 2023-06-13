const User = require('../models/userModel')
const jwt = require('jsonwebtoken')
const { mongoose } = require('mongoose')
const Account = require ('../models/accountModel')


const createUser = async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const getUsers = async (req, res) => {
  const users = await User.find({})
  res.status(200).json(users)
}


const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).populate('account');
    if (!user) {
      throw new Error('Aucun employé trouvé avec cet identifiant.');
    }

    // access matricule field of the associated Account document
    const matricule = user.account.matricule;

    // add the matricule field to the user object
    user.matricule = matricule;

    res.json(user);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

module.exports = {createUser, getUsers,getUser}