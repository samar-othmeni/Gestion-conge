const mongoose = require("mongoose");

const congeSchema = new mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    },
    typeConge:{
        type: mongoose.Types.ObjectId,
        ref: 'TypeConge',
        required: true 
    },
    dateDebut: { 
        type: Date ,
        required: true 
    },
    dateFin: {
        type: Date ,
        required: true 
    },
    status: {
        type: String,
        enum: ['en attente', 'approuvé', 'refusé'],
        default: 'en attente'
    },

}, { timestamps : true });



module.exports = mongoose.model("Conge", congeSchema);
  