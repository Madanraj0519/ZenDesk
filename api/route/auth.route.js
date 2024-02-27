const express = require('express');
const { registerUser, loginUser, verifyEmail, signOut } = require('../controller/auth.controller');
const authRoute = express.Router();



authRoute.post('/register', registerUser);
authRoute.post('/login', loginUser);
authRoute.post('/verify-email', verifyEmail);
authRoute.get('signout', signOut);


module.exports = {
    authRoute
}