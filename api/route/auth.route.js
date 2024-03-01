const express = require('express');
const { registerUser, loginUser, verifyEmail, signOut, adminEmployeeData, getUsers } = require('../controller/auth.controller');
const { verifyToken } = require('../utils/verifyToken');
const authRoute = express.Router();


authRoute.get('/', getUsers);
authRoute.post('/register', registerUser);
authRoute.post('/login', loginUser);
authRoute.post('/verify-email', verifyEmail);
// authRoute.get('/admin-employees-data', verifyToken ,adminEmployeeData);
authRoute.get('/signout', signOut);


module.exports = {
    authRoute
}