const SendOtp = require('sendotp');
const sendOtp = new SendOtp('316398Ag0W2VYV4a5e37ebfdP1');

function sendOTP(body,callback){
    let mobile = body.mobile;
    console.log("mobile", mobile)
    mobile = `91${mobile}`;
    sendOtp.send(mobile, "echque", function (error,data) {
        callback({
            "result" : data.type
        });    
      });

}

function verifyOTP(body,callback){
    let OTP = body.OTP;
    let mobile = body.mobile;
    mobile = `91${mobile}`;
    sendOtp.verify(mobile, OTP, function (error,data) {
        console.log(data); // data object with keys 'message' and 'type'
        callback({
            "result" : data.type
        });
      });
}


module.exports = {
    sendOTP,
    verifyOTP
}