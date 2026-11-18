const swaggerJsdoc = require('swagger-jsdoc');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'IFN Admin Api',
            version: '1.0.0',
            description: 'API documentation'
        },
        servers: [
            {
                url: 'http://localhost:8000',
                description: 'Development server'
            }
        ]
    },
    apis: ['./routes/*.js']
};

const swaggerSpec = seaggerJsdoc(options);

module.exports = swaggerSpec;