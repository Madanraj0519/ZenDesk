const { default: mongoose } = require("mongoose");

const ticketModel = new mongoose.Schema({
    customerName : {
        type : String,
        required : true,
    },
    customerEmail : {
        type : String,
        required : true,
    },
    customerPhone : {
        type : String,
        required : true,   
    },
    ticketTitle : {
        type : String,
        required : true
    },
    ticketDescription : {
        type : String,
        required : true
    },
    ticketStatus : {
        type : String,
        default : 'Pending',
    },
    assignedTo : {
        type : mongoose.Schema.Types.ObjectId,
        // ref : 'Employee'
    },
}, { timestamps : true });


module.exports = mongoose.model('Ticket', ticketModel);