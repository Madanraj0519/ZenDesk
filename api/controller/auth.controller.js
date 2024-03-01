const userModel = require('../model/user.model');
const employeeModel = require('../model/employee.model');
const bcrypt = require('bcryptjs');
const errorHandler = require('../utils/errorHandler');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const { sendEmail } = require('../utils/sendEmail/sendVerification');


const createToken = (_id) => {
    const jwtSecretKey  = process.env.JWT_SECRET_KEY;

    return jwt.sign({_id}, jwtSecretKey);
};


const getUsers = async(req, res, next) => {
    try{
        const users = await userModel.find();

        res.status(200).json({
            success: true,
            message : "Users has been fetched successfully",
            users,
        });
    }catch(err){
        next(err);
    };
};

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
                sendEmail(user);
                const token = createToken(user._id);

                res.status(200).
                 json({
                    success : true,
                    message : 'Verification email has been sent to your box successfully',
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

         // Set cookie with expiration in 15 days
        const expirationDate = new Date(Date.now() + 15 * 24 * 3600 * 1000);
        res
        .cookie('access_token', token, { httpOnly: true, expires: expirationDate })
        .status(200)
        .json({
            success: true,
            message: `Welcome back ${restDetails.userName}, `,
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

        // console.log(user);
        
        if(user){
            user.isVerified = true;
            user.emailToken = null;
            
            await user.save();
            const token = createToken(user._id);

            // Set cookie with expiration in 2 minutes
            const expirationDate = new Date(Date.now() - 1200000);
            res.cookie('access_token', token, { httpOnly: true, expires: expirationDate })
            .status(200)
            .json({
                success: true,
                message : "Email verified successfully",
                _id : user._id,
                userEmail : user.userEmail,
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

const adminEmployeeData = async(req, res, next) => {

    const adminId = "65e0ab5b1415a90ca1cf20ff";

    try{
         // Calculate employee counts by month, year, and weeks for admin-created employees
         const adminEmployeeCounts = await employeeModel.aggregate([
            {
                $match : {
                    'createdBy._id' : adminId,
                },
            },
            {
                $addFields : {
                    week : { $week : '$createdAt'}
                },
            },
            {
                $group : {
                    _id : {
                        week : '$week',
                    },
                    week : { $first : '$week'},
                }
            },
            { $project : { _id : 0}},
         ]);

         res.status(200).json(adminEmployeeCounts);
    }catch(err){
        next(err);
    }
};

const signOut = (req, res, next) => {
    res.clearCookie('access_token')
    .status(200)
    .json({
        success: true,
        message: 'Sign out successfully',
    })
};

module.exports = {
    getUsers,
    registerUser,
    loginUser,
    verifyEmail,
    adminEmployeeData,
    signOut,
}