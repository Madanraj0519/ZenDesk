const express = require('express');
const { createEmployee, updateEmployee, deleteEmployee, getEmployee } = require('../controller/employee.controller');
const employeeRoute = express.Router();


employeeRoute.get('/', getEmployee);
employeeRoute.post("/create", createEmployee);
employeeRoute.post("/update/:id", updateEmployee);
employeeRoute.delete("/delete/:id", deleteEmployee);


module.exports = {
    employeeRoute
}