require('dotenv').config();
const express = require('express');
const errorHandler = require('./middlewares/error-handler.middleware');
const authenticationMiddleware = require('./middlewares/authentication.middleware');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger');

const app = express();

// Unprotected route
require('./routes/stripe.routes')(app);

// Middlewares
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use('/images', express.static('public/images'));

// Routes
// app.use(authenticationMiddleware);
require('./routes')(app);

// Swagger middleware
// localhost:8000/api-docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Error handler
app.use(errorHandler);

const PORT = process.env.APP_PORT;
app.listen(PORT, () => {
    console.log(`App is running on port ${PORT}`);
});