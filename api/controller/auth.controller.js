const userModel = require('../model/user.model');
const bcrypt = require('bcryptjs');
const errorHandler = require('../utils/errorHandler');


const registerUser = async(req, res, next) => {
    const { userEmail, userName, userPhone, userJob,
            userCompany, userEmployees, userPassword } = req.body;
            try{
                let user = await userModel.findOne({userEmail});
                if(user){
                    next(errorHandler(400, 'user with this email already exists'))
                }
                const hashPassword = bcrypt.hashSync(userPassword);
                user = await userModel({
                    userEmail, userName, userPhone, userJob, 
                    userCompany, userEmployees, userPassword : hashPassword,
                });
                await user.save();
            }catch(err){
                next(err);
            }
};


const loginUser = async (req, res, next) => {
    const {userEmail, userPassword} = req.body;

    try{
        const validUser = await userModel.findOne({userEmail});
        if(!validUser){
            return next(errorHandler(404, 'user not found'));
        }
        //comparing the password which is coming from the request and in the database
        const validPassword = bcrypt.compareSync(userPassword, validUser.userPassword);
        if(!validPassword){
            return next(errorHandler(401, 'Invalid credentials'));
        }
        res.status(200).
        json({
            success : true,
            message : 'User logged in successfully',
            data : validUser
        });
       }catch(err){
        next(err)
       }
};

module.exports = {
    registerUser,
    loginUser,
}