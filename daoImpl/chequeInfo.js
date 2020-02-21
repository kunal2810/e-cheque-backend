const chequeDetails = require('../models/chequeDetails');
const userDetails = require('../models/userDetails');

function saveChequeDetails(chequeObj){
    return new Promise(async(resolve,reject)=> {
        const dataObject = new chequeDetails(chequeObj);
        await dataObject.save(async (error,result) => {
            if(error)
                return reject({
                    "result" : "error"
                });
            else {
                await userDetails.findOneAndUpdate({'_id' : chequeObj.payer_id},{
                    $push : {
                       "issuedCheque" : result.id
                    }
                });
                return resolve({
                        "result" : 'success'
                })
            }
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

function depositChequeDetails(chequeNo,payee_id) {
    var dateFormat = require('dateformat');
    const isEmpty = require('is-empty');
    return new Promise(async(resolve,reject)=> {
        chequeDetails.findOneAndUpdate({chequeNo: chequeNo},{
            $set : {
                'status' : "Deposited",
                'dateOfDeposit' : dateFormat(),
                'payee_id' : payee_id
            }
        })
        .then(async (res) => {
            if(isEmpty(res))
            return reject({
                "result" : "error"
            })
            else {
                await userDetails.findOneAndUpdate({'_id' : payee_id},{
                    $push : {
                        "depositCheque" : res.id
                     }
                });
                return resolve({
                    "result" : 'success'
                })
            }
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