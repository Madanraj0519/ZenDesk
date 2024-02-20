const userModel = require('../model/user.model');
const bcrypt = require('bcryptjs');
const errorHandler = require('../utils/errorHandler');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');


const createToken = (_id) => {
    const jwtSecretKey  = process.env.JWT_SECRET_KEY;

    return jwt.sign({_id}, jwtSecretKey, { expiresIn : "1d"});
}

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
                    emailToken : crypto.randomBytes(16).toString('hex'),
                });
                await user.save();
                const token = createToken(user._id);
                 res.status(200).
                 json({
                    success : true,
                    message : 'User saved successfully',
                    user,
                    token,
                });
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
        const {userPassword : hashPassword, ...restDetails} = validUser._doc;
        const token = createToken(validUser._id);

        res.status(200)
        .json({
            success: true,
            message: 'User logged in successfully',
            restDetails,
            token,
        })
        
       }catch(err){
        next(err)
       }
};

const verifyEmail = async(req, res, next) => {
    try{
        const emailToken = req.body.emailToken;
        if(!emailToken){
            return next(errorHandler(404, 'Email\Token not found...'));
        }

        const user = await userModel.findOne({emailToken});

        console.log(user);
        
        if(user){
            user.isVerified = true;
            user.emailToken = null;
            
            await user.save();

            const token = createToken(user._id);

            res.status(200).json({
                success: true,
                message : "Email verified successfully",
                _id : user._id,
                userEmail : user.userEmail,
                userName : user.userName,
                userPassword : user.userPassword,
                token,
                isVerified : user?.isVerified,
            })
        }else{
            next(errorHandler(404, 'Email verification failed, invalid token'));
        }
    }catch(err){
        next(err);
    }
};

module.exports = {
    registerUser,
    loginUser,
    verifyEmail,
}