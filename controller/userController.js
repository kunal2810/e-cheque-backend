const UserInfo = require('../daoImpl/userInfo');
const userDetails = require('../models/userDetails');

function registerUser(body,callback) {
    let name = body.name;
    let email = body.email;
    let password = body.password;

    let userInfo = {
        name,
        email,
        password
    }

    UserInfo.saveuserDetails(userInfo)
    .then((result) => {
        callback(result);
    })
}

function loginUser(body,callback){
    let email = body.email;
    let password = body.password;

    UserInfo.findUser(email,password)
    .then((result) => {
        callback(result);
    })
}

function dashboardDetails(body,callback) {
    let user_id = body.user_id;

    userDetails.findOne({'_id' : user_id}).populate('issuedCheque').populate('depositCheque')
    .exec((error,response) => {
        console.log("error", error)
        callback({
            "result" : 'success',
            "response" : response
        })
    })

}

module.exports = {
    registerUser,
    loginUser,
    dashboardDetails
}