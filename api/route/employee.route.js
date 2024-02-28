const express = require('express');
const { createEmployee, updateEmployee, deleteEmployee } = require('../controller/employee.controller');
const employeeRoute = express.Router();

employeeRoute.post("/create", createEmployee);
employeeRoute.post("/update/:id", updateEmployee);
employeeRoute.delete("/delete/:id", deleteEmployee);


module.exports = {
    employeeRoute
}