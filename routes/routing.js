const express = require('express');
const router = express.Router();
const chequeController = require('../controller/chequeController');
const userController = require('../controller/userController');
const sendVerifyOTP = require('../functions/sendVerifyOTP');

router.get('/',(request,response) => {
    response.send("Welcome to the E-Cheque");
});

router.post('/register',(request,response) => {
    userController.registerUser(request.body,function(result){
        response.send(result);
    })
});

router.post('/login',(request,response) => {
    userController.loginUser(request.body,function(result){
        response.send(result);
    })
});

router.post('/chequeDetails',(request,response) => {
    chequeController.issueCheque(request.body,function(result){
        response.send(result);
    })
});

router.post('/sendOTP',(request,response) => {
    console.log("request.body",request.body)
    sendVerifyOTP.sendOTP(request.body, function(result){
        response.send(result);
    });
});

router.post('/verifyOTP',(request,response) => {
    sendVerifyOTP.verifyOTP(request.body, function(result){
        response.send(result);
    });
});

router.post('/searchCheque',(request,response) => {
    chequeController.searchCheque(request.body, function(result){
        response.send(result);
    });
});

router.post('/depositCheque',(request,response) => {
    chequeController.depositCheque(request.body, function(result){
        response.send(result);
    });
});

router.post('/fetchAllDetails',(request,response) => {
    userController.dashboardDetails(request.body, function(result){
        response.send(result);
    });
});



module.exports = router;