const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const Schema = mongoose.Schema

const accountSchema = new Schema({
    matricule: {
        type: String,
        required: true,
    },

    password: {
        type: String,
        required: true
    },

    role: {
        type: String,
        enum: ["manager", "employee"],
        required: true
    }
}, { timestamps: true })


accountSchema.statics.signup = async function (matricule, password, role)  {

    const exists = await this.findOne({matricule})

    if (exists) {
        throw Error('matricule already in use')
    }

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    const account = await this.create({matricule, password: hash,role })
    
    return account
}


//static login method
accountSchema.statics.login = async function (matricule, password) {

    if (!matricule || !password) {
        throw Error('All fields must be filled')
    }

    const account = await this.findOne({matricule})

    if(!account) {
        throw Error('Incorrect matricule')
    }

    const match = await bcrypt.compare(password, account.password)

    if (!match) {
        throw Error ('Incorrect password')
    }

    return account
}


module.exports = mongoose.model('Account', accountSchema)
