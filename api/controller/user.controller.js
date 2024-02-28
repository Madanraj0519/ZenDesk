const userModel = require('../model/user.model');
const errorHandler = require('../utils/errorHandler');
const bcrypt = require('bcryptjs');


const updateUser = async(req, res, next) => {
    if(req.user._id !== req.params.id){
        return next(errorHandler(401, 'you can update only your account!'));
    }

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
        const {userPassword, ...restDetails} = updateUser._doc;
        res.status(200)
        .json({
            success : true,
            message : "User updated successfully",
            restDetails
        });
    }catch(err){
        next(err);
    }
};


const deleteUser = async(req, res, next) => {
    
    if (req.user._id !== req.params.id) {
        return next(errorHandler(401, 'You can delete only your account!'));
      }

      console.log(req.user.id);
      console.log(req.params.id);
    try{
        await userModel.findByIdAndDelete(req.params.id);
        res.status(200).
        json({
            success : true,
            message : "Your account has been deleted successfully",
        })
    }catch(err){
        next(err);
    };
};
module.exports = {
    updateUser,
    deleteUser,
}