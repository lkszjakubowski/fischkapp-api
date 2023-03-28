import swaggerJs from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.1.0',
    swagger: '2.0',
    info: {
      title: 'FischkApp Express API',
      version: '1.0.0',
      description: 'CRUD API made with Express and Typescript',
      license: {
        name: 'MIT',
        url: 'https://spdx.org/licenses/MIT.html',
      },
    },
    servers: [
      {
        url: 'http://localhost:4000',
      },
    ],
  },
  apis: ['../cards/card.routes.ts'],
};

const specs = swaggerJs(options);

export default specs;
