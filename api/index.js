const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const cors = require('cors');
const { authRoute } = require('./route/auth.route');
dotenv.config();

const PORT = 3000;

app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_DB)
.then(() => {
    console.log('Database connection established successfully');
})
.catch(err => { console.log(err)} );


app.use('/api/auth', authRoute);

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