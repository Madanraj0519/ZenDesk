const { default: mongoose } = require("mongoose");

const userModel = new mongoose.Schema({
    userEmail : {
        type : String,
        required : true,
        unique : true
    },
    userName : {
        type : String,
        required : true,
    },
    userPhone : {
        type : String,
        required : true,
        unique : true
    },
    userJob : {
        type : String,
        required : true,
    },
    userCompany : {
        type : String,
        required : true,
    },
    userEmployees : {
        type : String,
        required : true,
    },
    userPassword : {
        type : String,
        required : true,
    },
    isVerified : {
        type : Boolean,
        default : false
    },
    emailToken : { type : String}
}, { timestamps : true });


module.exports = mongoose.model('User', userModel);