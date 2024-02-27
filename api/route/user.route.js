const express = require('express');
const userRoute = express.Router();
const {updateUser, deleteUser} = require('../controller/user.controller');


userRoute.post('/update/:id', updateUser);
userRoute.delete('/delete/:id', deleteUser);

module.exports = {
    userRoute
}