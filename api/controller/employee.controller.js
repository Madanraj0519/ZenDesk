const employeeModel = require('../model/employee.model');
const bcrypt = require('bcryptjs');
const errorHandler = require('../utils/errorHandler');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');


const createToken = (_id) => {
    const jwtSecretKey  = process.env.JWT_SECRET_KEY;

    return jwt.sign({_id}, jwtSecretKey);
}

const createEmployee = async(req, res, next) => {
    const { employeeEmail, employeeName, employeePhone, employeePassword, employeeRole } = req.body;
            try{
                let employee = await employeeModel.findOne({employeeEmail});
                if(employee){
                    next(errorHandler(400, 'Employee with this email already exists'))
                }
                const hashPassword = bcrypt.hashSync(employeePassword);
                employee = await employeeModel({
                    employeeEmail, employeeName, employeePhone,
                    employeePassword : hashPassword, employeeRole
                });
                await employee.save();

                const token = createToken(employee._id);

                res.status(200).
                 json({
                    success : true,
                    message : 'Employee created successfully',
                    employee,
                    token,
                });
            }catch(err){
                next(err);
            }
};


const updateEmployee = async(req, res, next) => {
    
    // if(req.user._id !== req.params.id){
    //     return next(errorHandler(401, 'you can update only your account!'));
    // }

    try{
        if(req.body.employeePassword){
            req.body.employeePassword = bcrypt.hashSync(req.body.employeePassword, 10);
        }

        const updateEmployee = await employeeModel.findByIdAndUpdate(
            req.params.id,
            {
                $set : {
                    employeeEmail : req.body.employeeEmail,
                    employeeName : req.body.employeeName,
                    employeePassword : req.body.employeePassword,
                    employeePhone : req.body.employeePhone,
                    employeeRole : req.body.employeeRole,
                }
            },
            {new : true},
        );
        const {employeePassword, ...restDetails} = updateEmployee._doc;
        res.status(200)
        .json({
            success : true,
            message : "Employee updated successfully",
            restDetails
        });
    }catch(err){
        next(err);
    }
};

const deleteEmployee = async(req, res, next) => {
    
    // if (req.user._id !== req.params.id) {
    //     return next(errorHandler(401, 'You can delete only your account!'));
    //   }

    try{
        await employeeModel.findByIdAndDelete(req.params.id);
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
    createEmployee,
    updateEmployee,
    deleteEmployee,
}