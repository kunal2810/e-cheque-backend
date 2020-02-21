const ChequeInfo = require('../daoImpl/chequeInfo');



function issueCheque(body, callback) {
    let payer_id = body.payer_id;
    let payeeName = body.payeeName;
    let amtWords = body.amtWords;
    let amtRs = body.amtRs;
    let bankName = body.bankName;
    let mobile = body.mobile;
    mobile = `91${mobile}`
    let dateOfIssue = body.dateOfIssue;
    let chequeNo = Math.floor(100000 + Math.random() * 900000);

    let chequeObject = {
        payer_id,
        payeeName,
        amtWords,
        amtRs,
        bankName,
        mobile,
        dateOfIssue,
        chequeNo
    }

    const SendOtp = require('sendotp');
    const sendOtp = new SendOtp('316398Ag0W2VYV4a5e37ebfdP1', `Cheque Number ${chequeNo}, please share it to your payee`);

    sendOtp.setOtpExpiry('90');

    sendOtp.send(mobile, "echque", chequeNo, function (error, data) {
        console.log("cheque sent res", data)
        if (data.type != 'success') {
            callback({
                "result": "error"
            })
        }
        else {
            ChequeInfo.saveChequeDetails(chequeObject)
                .then((result) => {
                    callback(result);
                })
        }

    });



}

function searchCheque(body, callback){
    let chequeNo = body.chequeNo;

    ChequeInfo.fetchChequeDetails(chequeNo)
    .then((result) => {
        callback(result)
    });
}

function depositCheque(body, callback){
    let payee_id = body.payee_id;
    let chequeNo = body.chequeNo;

    ChequeInfo.depositChequeDetails(chequeNo,payee_id)
    .then((result) => {
        callback(result)
    })
}


module.exports = {
    issueCheque,
    searchCheque,
    depositCheque
}