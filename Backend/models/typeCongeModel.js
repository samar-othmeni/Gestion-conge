const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const typeCongeSchema = new Schema({
    nom: {
        type: String ,
        required: true
    },
    nombreMaxJours: { 
        type: Number,
        required: true,
    },
}, { timestamps: true })


module.exports = mongoose.model("TypeConge", typeCongeSchema)