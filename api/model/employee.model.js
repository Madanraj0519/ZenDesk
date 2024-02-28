const { default: mongoose } = require("mongoose");

const employeeModel = new mongoose.Schema({
    employeeEmail : {
        type : String,
        required : true,
        unique : true
    },
    employeeName : {
        type : String,
        required : true,
    },
    employeePhone : {
        type : String,
        required : true,
        unique : true
    },
    employeeRole : {
        type : String,
        required : true,
    },
    employeePassword : {
        type : String,
        required : true,
    },
    isAdmin : {
        type : Boolean,
        default : false,
    },
}, { timestamps : true });


module.exports = mongoose.model('Employee', employeeModel);