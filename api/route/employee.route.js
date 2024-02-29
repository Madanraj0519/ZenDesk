const express = require('express');
const { createEmployee, updateEmployee, deleteEmployee, getEmployee } = require('../controller/employee.controller');
const { verifyToken } = require('../utils/verifyToken');
const employeeRoute = express.Router();


employeeRoute.get('/', verifyToken, getEmployee);
employeeRoute.post("/create", verifyToken, createEmployee);
employeeRoute.post("/update/:id", updateEmployee);
employeeRoute.delete("/delete/:id", deleteEmployee);


module.exports = {
    employeeRoute
}