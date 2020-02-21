const mongoose = require("mongoose");

const chequeDetails = new mongoose.Schema({
    payer_id : { type: mongoose.Schema.Types.ObjectId, ref: 'userDetails' },
    payeeName : String,
    payee_id : { type: mongoose.Schema.Types.ObjectId, ref: 'userDetails' },
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