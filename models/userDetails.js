const mongoose = require("mongoose");

const userDetails = new mongoose.Schema({
    name : String,
    email : {
        type : String,
        unique : true,
    },
    password : String,
    issuedCheque : [{type: mongoose.Schema.Types.ObjectId, ref: 'chequeDetails'}],
    depositCheque : [{type: mongoose.Schema.Types.ObjectId, ref: 'chequeDetails'}]
    
})

module.exports = mongoose.model("userDetails", userDetails);