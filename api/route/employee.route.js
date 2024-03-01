const express = require('express');
const { createEmployee, updateEmployee, deleteEmployee, getEmployee, loginEmployee, employeeSignOut } = require('../controller/employee.controller');
const { verifyToken } = require('../utils/verifyToken');
const employeeRoute = express.Router();


employeeRoute.get('/', verifyToken, getEmployee);
employeeRoute.post('/login', loginEmployee);
employeeRoute.post("/create", verifyToken, createEmployee);
employeeRoute.post("/update/:id", updateEmployee);
employeeRoute.delete("/delete/:id", deleteEmployee);
employeeRoute.get("/employee-signout", employeeSignOut);


module.exports = {
    employeeRoute
}