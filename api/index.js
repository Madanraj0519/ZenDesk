const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const { authRoute } = require('./route/auth.route');
const nodemailer = require('nodemailer');
const { userRoute } = require('./route/user.route');
const cookieParser = require('cookie-parser');
const { employeeRoute } = require('./route/employee.route');
const { ticketRoute } = require('./route/ticket.route');
const path = require('path');
dotenv.config();

const PORT = 3000;

const ___dirname = path.resolve();

// console.log(___dirname);

app.use(express.json());
app.use(cookieParser());
app.use(cors());

mongoose.connect(process.env.MONGO_DB)
.then(() => {
    console.log('Database connection established successfully');
})
.catch(err => { console.log(err)} );


app.use('/api/auth', authRoute);
app.use('/api/user', userRoute);
app.use('/api/employee', employeeRoute);
app.use('/api/ticket', ticketRoute);

app.use(express.static(path.join(___dirname, '/client/dist')));

app.get('*', (req, res) => {
    res.sendFile(path.join(___dirname, 'client', 'dist', 'index.html'))
});

app.listen(PORT, () => {
    console.log(`Listening on port, http://localhost:${PORT} `);
});



// handling errors;
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    return res.status(statusCode).json({
        success : false,
        message,
        statusCode
    });
});