const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'TactusBook API',
      version: '1.0.0',
      description:
        'API REST pour TactusBook — CRM basique de gestion de contacts clients. ' +
        'Chaque commercial gere ses propres contacts (isolation par userId).',
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'Paste the JWT returned by POST /api/auth/login',
        },
      },
    },
  },
  apis: ['./src/routes/*.js'],
};

module.exports = swaggerJsdoc(options);