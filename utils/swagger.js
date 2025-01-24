const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'CRM Backend API',
            version: '1.0.0',
            description: 'API documentation for the CRM system.',
        },
        servers: [{ url: 'http://localhost:5000' }], // Adjust the URL for your environment
    },
    apis: ['./routes/*.js'], // Path to files where Swagger comments are located
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

module.exports = { swaggerDocs, swaggerUi };
