const { default: mongoose } = require("mongoose");

const memberModel = new mongoose.Schema({
    memberEmail : {
        type : String,
        required : true,
        unique : true
    },
    memberName : {
        type : String,
        required : true,
    },
    memberPhone : {
        type : String,
        required : true,
        unique : true
    },
    memberRole : {
        type : String,
        required : true,
    },
    memberPassword : {
        type : String,
        required : true,
    },
    isAdmin : {
        type : Boolean,
        default : false,
    },
}, { timestamps : true });


module.exports = mongoose.model('Member', memberModel);