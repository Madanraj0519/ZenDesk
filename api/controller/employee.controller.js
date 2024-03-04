const employeeModel = require('../model/employee.model');
const userModel = require('../model/user.model');
const bcrypt = require('bcryptjs');
const errorHandler = require('../utils/errorHandler');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const path = require('path');
const ticketModel = require('../model/ticket.model');


const createToken = (_id) => {
    const jwtSecretKey  = process.env.JWT_SECRET_KEY;

    return jwt.sign({_id}, jwtSecretKey);
}


const getEmployee = async(req, res, next) => {

    const loggedAdminId = req.user._id;

    try{

        let employee = await employeeModel.find({'createdBy._id' : loggedAdminId})
                         .populate({path : 'ticketLists', model : 'Ticket'});

        res.status(200).json({
            success:false,
            message : "Employee data has been fetched successfully",
            employees : employee
        });

    }catch(err){
        next(err);
    }
};

const createEmployee = async (req, res, next) => {

    const { employeeEmail, employeeName, employeePhone, employeePassword, employeeRole } = req.body;
    const adminId = req.user._id;

    try {
        let admin = await userModel.findById({_id : adminId}); 

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

        const hashPassword = bcrypt.hashSync(employeePassword, 10); 
        employee = new employeeModel({
            employeeEmail, employeeName, employeePhone,
            employeePassword: hashPassword, employeeRole,
            createdBy : createBy,
        });

        await employee.save();

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

const loginEmployee = async (req, res, next) => {

    const {employeeEmail, employeePassword} = req.body;

    try{
        const validEmployee = await employeeModel.findOne({ employeeEmail });
        if(!validEmployee){
            return next(errorHandler(404, 'Employee is not found'));
        }
        //comparing the password which is coming from the request and in the database
        const validPassword = bcrypt.compareSync(employeePassword, validEmployee.employeePassword);

        if(!validPassword){
            return next(errorHandler(401, 'Invalid credentials'));
        }

        const {employeePassword : hashPassword, ...restDetails} = validEmployee._doc;
        const token = createToken(validEmployee._id);

         // Set cookie with expiration in 15 days
        const expirationDate = new Date(Date.now() + 15 * 24 * 3600 * 1000);
        res
        .cookie('access_token', token, { httpOnly: true, expires: expirationDate })
        .status(200)
        .json({
            success: true,
            message: `Welcome, ${restDetails.employeeName}, `,
            restDetails,
            token,
        })
        
       }catch(err){
        next(err)
       }
};

const updateEmployee = async(req, res, next) => {
    
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
            message : "Employee data updated successfully",
            restDetails
        });
    }catch(err){
        next(err);
    }
};

const deleteEmployee = async(req, res, next) => {
    
    try{
        const ticket =  await ticketModel.find({ "assignedTo" : req.params.id});
        await ticketModel.findByIdAndUpdate(
            ticket[0]._id,
            {
                assignedTo : null,
                isAssigned : false,
            },
        );
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

const employeeSignOut = (req, res, next) => {
    res.clearCookie('access_token')
    .status(200)
    .json({
        success: true,
        message: 'Sign out successfully',
    })
};

module.exports = {
    getEmployee,
    createEmployee,
    loginEmployee,
    updateEmployee,
    deleteEmployee,
    employeeSignOut,
}