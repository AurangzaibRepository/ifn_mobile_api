const express = require('express');
const dotenv = require('dotenv');
dotenv.config();

const app = express();

// Middlewares
app.use(express.urlencoded({extended: true}));
app.use(express.json());

// Routes
require('./routes')(app);

const PORT = process.env.APP_PORT;
app.listen(PORT, () => {
    console.log(`App is running on port ${PORT}`);
});