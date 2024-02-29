const employeeModel = require('../model/employee.model');
const userModel = require('../model/user.model');
const bcrypt = require('bcryptjs');
const errorHandler = require('../utils/errorHandler');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');


const createToken = (_id) => {
    const jwtSecretKey  = process.env.JWT_SECRET_KEY;

    return jwt.sign({_id}, jwtSecretKey);
}


const getEmployee = async(req, res, next) => {

    const loggedAdminId = req.user._id;

    try{

        let employee = await employeeModel.find({'createdBy._id' : loggedAdminId});

        res.status(200).json({
            success:false,
            message : "Employee has been fetched successfully",
            employees : employee
        });

        console.log(employee);
    }catch(err){
        next(err);
    }
};

const createEmployee = async (req, res, next) => {

    const { employeeEmail, employeeName, employeePhone, employeePassword, employeeRole } = req.body;
    const adminId = req.user._id;
    // console.log("crete:",createdBy);

    try {
        let admin = await userModel.findById({_id : adminId});     // console.log("admin:", admin);

        if (!admin) {
            return next(errorHandler(404, "Admin not found"));
        }

        const createBy = {
            _id : admin._id,
            userEmail : admin.userEmail,
        }
        let employee = await employeeModel.findOne({ employeeEmail });
        if (employee) {
            return next(errorHandler(400, 'Employee with this email already exists'));
        }

        const hashPassword = bcrypt.hashSync(employeePassword, 10); // 10 is the salt rounds
        employee = new employeeModel({
            employeeEmail, employeeName, employeePhone,
            employeePassword: hashPassword, employeeRole,
            createdBy : createBy,
        });

        await employee.save();

        // console.log(employee);

        const token = createToken(employee._id);

        res.status(200).json({
            success: true,
            message: 'Employee created successfully',
            employee,
            token,
        });
    } catch (err) {
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
    getEmployee,
    createEmployee,
    updateEmployee,
    deleteEmployee,
}