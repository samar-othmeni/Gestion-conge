const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const Schema = mongoose.Schema

const userSchema = new Schema({
    account: {
        type: mongoose.Types.ObjectId,
        ref: 'Account',
        required: true 
    },
    nom: {
        type: String,
        required: true
    },
    prenom: {
        type: String,
        required: true
    },
    cin :{
        type:String,
        required: true
    },
    dateNaissance: {
        type: String,
        required: true
    },
    gender : {
        type:String,
        required: true
    },
    telephone: {
        type: String,
        required: true
    },
    grade: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    dateCreation: {
        type: Date,
        default: Date.now
    },
    solde: {
        annual: { type: Number, default: 25 },
        medical: { type: Number, default: 30 },
        maternite: { type: Number, default: 16 },
        mariage: { type: Number, default: 4 },
        deces: { type: Number, default: 3 } 
    },
    isAdmin: { type: Boolean, required: true, default: false },
    isEmploye: { type: Boolean, required: true, default: true }
}, { timestamps: true })




module.exports = mongoose.model('User', userSchema)