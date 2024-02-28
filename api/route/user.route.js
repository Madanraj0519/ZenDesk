const express = require('express');
const userRoute = express.Router();
const {updateUser, deleteUser} = require('../controller/user.controller');
const { verifyToken } = require('../utils/verifyToken');


userRoute.post('/update/:id', verifyToken, updateUser);
userRoute.delete('/delete/:id', verifyToken, deleteUser);

module.exports = {
    userRoute
}