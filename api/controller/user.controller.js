const userModel = require('../model/user.model');
const errorHandler = require('../utils/errorHandler');
const bcrypt = require('bcryptjs');


const updateUser = async(req, res, next) => {
    // if(req.user.id !== req.params.id){
    //     return next(errorHandler(401, 'you can update only your account!'));
    // }

    try{
        if(req.body.userPassword){
            req.body.userPassword = bcrypt.hashSync(req.body.userPassword, 10);
        }

        const updateUser = await userModel.findByIdAndUpdate(
            req.params.id,
            {
                $set : {
                    userEmail : req.body.userEmail,
                    userName : req.body.userName,
                    userPassword : req.body.userPassword,
                    userPhone : req.body.userPhone,
                    userJob : req.body.userJob,
                    userCompany : req.body.userCompany,
                    userEmployees : req.body.userEmployees,
                }
            },
            {new : true},
        );
        const {userPassword, ...rest} = updateUser._doc;
        res.status(200)
        .json({
            success : true,
            message : "User updated successfully",
            data : rest
        });
    }catch(err){
        next(err);
    }
};

module.exports = {
    updateUser,
}