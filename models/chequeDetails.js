const mongoose = require("mongoose");

const chequeDetails = new mongoose.Schema({
    payeeName : String,
    amtWords : String,
    amtRs : String,
    bankName : String,
    mobile : Number,
    dateOfIssue : String,
    dateOfDeposit : String,
    chequeNo : {
        type : Number,
        unique : true
    },
    status : {
        type : String,
        default : "Issued"
    }

});

module.exports = mongoose.model("chequeDetails", chequeDetails);