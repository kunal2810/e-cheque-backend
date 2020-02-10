const chequeDetails = require('../models/chequeDetails');

function saveChequeDetails(chequeObj){
    return new Promise(async(resolve,reject)=> {
        const dataObject = new chequeDetails(chequeObj);
        await dataObject.save((error,result) => {
            if(error)
                return reject({
                    "result" : "error"
                });
            else
                return resolve({
                    "result" : "success"
                })
        })
    });
}

function fetchChequeDetails(chequeNo){
    return new Promise(async(resolve,reject)=> {
        chequeDetails.findOne({chequeNo : chequeNo})
        .then((response) => {
                return resolve({
                    "result" : response
                })
        }).catch((e) => {
            return reject({
                "result" : 'error'
            })
        })
    });
}

function depositChequeDetails(chequeNo) {
    var dateFormat = require('dateformat');
    const isEmpty = require('is-empty');
    return new Promise(async(resolve,reject)=> {
        chequeDetails.findOneAndUpdate({chequeNo: chequeNo},{
            $set : {
                'status' : "Deposited",
                'dateOfDeposit' : dateFormat(),
            }
        })
        .then((res) => {
            if(isEmpty(res))
            return reject({
                "result" : "error"
            })
            else
            return resolve({
                "result" : "success"
            })
        })
        .catch((e) => {
            return reject({
                "result" : "error"
            })
        })
    })
}

module.exports = {
    saveChequeDetails,
    fetchChequeDetails,
    depositChequeDetails
}