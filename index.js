const express = require('express');
const bodyParser = require('body-parser');
// initialize our express app
const app = express();

const authRouter = require('./Routes/Auth');

app.use('/api/user', authRouter);

app.listen(3000, () => console.log('Server up and Running'));