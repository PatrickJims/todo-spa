const express = require('express');
const app = express();
const cors = require('cors');
const pool = require('./db');

//middleware
app.use(cors());
app.use(express.json());

//ROUTES
app.use('/auth', require('./routes/jwtAuth'));
app.use('/landing', require('./routes/landing'));

app.listen(5000, () => {
    console.log('Server started at port 5000');
})