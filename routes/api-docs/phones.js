'use strict';

const express = require('express');
const app = express();

const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');

//Swagger documentation
const swaggerOptions = {
  swaggerDefinition: {
    info: {
      version: '1.0.0',
      title: 'Funk-o-Fone API',
      description: 'Funk-o-Fone API Documentation for use',
      contact: {
        name: 'Ítalo Ravina Clemente',
        url: 'https://www.linkedin.com/in/italofranco/',
      },
      servers: ['http://localhost:9000'],
    },
  },
  basePath: '/',
  apis: ['./routes/api/phones.js'],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/', swaggerUI.serve, swaggerUI.setup(swaggerDocs));

module.exports = app;
