const userDetails = require('../models/userDetails');
const isEmpty = require('is-empty');

function saveuserDetails(userObj){
    return new Promise(async(resolve,reject)=> {
        const dataObject = new userDetails(userObj);
        await dataObject.save((error,result) => {
            if(error)
                return resolve({
                    "result" : "error",
                    "response" : "Email is Already Registered with Us"
                });
            else
                return resolve({
                    "result" : "success",
                    "response" : "Registration Done Succesfully"
                })
        })
    });
}

function findUser(email,password){
    return new Promise(async(resolve,reject)=> {
        userDetails.findOne({email : email})
        .then((response) => {
            if(isEmpty(response))
                return resolve({
                    "result" : 'error',
                    "response" : "Email id is not Registered with Us"
                })
            else {
                if(password === response.password){
                    return resolve({
                        "response" : response,
                        "result" : 'success'
                    })
                }
                else{
                    return resolve({
                        "response" : "You entered Invalid Password",
                        "result" : 'error',
                    })
                }
            }
        }).catch((e) => {
            return reject({
                "result" : 'error',
                "response" : "OOPs Something went wrong"
            })
        })
    });
}

module.exports = {
    saveuserDetails,
    findUser
}