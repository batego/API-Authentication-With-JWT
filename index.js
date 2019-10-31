const express = require('express');
const app = express();// initialize our express app
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const authRouter = require('./Routes/Auth');

dotenv.config();

// Connect MongoDB at default port 27017.
mongoose.connect( process.env.DB_CONNECT, { useNewUrlParser: true, useCreateIndex: true }, (err) => {
    if (!err) {
        console.log('MongoDB Connection Succeeded.')
    } else {
        console.log('Error in DB connection: ' + err)
    }
});

// const bodyParser = require('body-parser');

//Middleware
app.use(express.json());
//Routes Middleware
app.use('/api/user', authRouter);

app.listen(3000, () => console.log('Server up and Running'));
