const express = require('express');
const userRoute = express.Router();
const {updateUser} = require('../controller/user.controller');


userRoute.post('/update/:id', updateUser);

module.exports = {
    userRoute
}