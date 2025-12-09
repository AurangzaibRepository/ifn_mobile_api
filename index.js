const express = require('express');
const dotenv = require('dotenv');
const errorHandler = require('./middlewares/error-handler.middleware');
const authenticationMiddleware = require('./middlewares/authentication.middleware');
dotenv.config();

const app = express();

// Middlewares
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(authenticationMiddleware);

// Routes
require('./routes')(app);

// Error handler
app.use(errorHandler);

const PORT = process.env.APP_PORT;
app.listen(PORT, () => {
    console.log(`App is running on port ${PORT}`);
});