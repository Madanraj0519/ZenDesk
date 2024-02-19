const { default: mongoose } = require("mongoose");

const userModel = new mongoose.Schema({
    userEmail : {
        type : 'string',
        required : true,
        unique : true
    },
    userName : {
        type : 'string',
        required : true,
    },
    userPhone : {
        type : 'string',
        required : true,
        unique : true
    },
    userJob : {
        type : 'string',
        required : true,
    },
    userCompany : {
        type : 'string',
        required : true,
    },
    userEmployees : {
        type : 'string',
        required : true,
    },
    userPassword : {
        type : 'string',
        required : true,
    },
}, { timestamps : true });


module.exports = mongoose.model('User', userModel);