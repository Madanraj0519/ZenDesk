const  mongoose  = require("mongoose");

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
    createdBy: {
        _id : {
            type : mongoose.Schema.Types.ObjectId,
        },
        userEmail : {
            type : String,
        }
      },
    isAdmin : {
        type : Boolean,
        default : false,
    },
    ticketLists : {
        type : [ mongoose.Schema.Types.ObjectId ],
        ref : 'Ticket',
    }
}, { timestamps : true });


module.exports = mongoose.model('Employee', employeeModel);