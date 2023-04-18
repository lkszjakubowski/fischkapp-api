import swaggerJSDoc from 'swagger-jsdoc';
import { version } from '../../package.json';

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Fischkapp REST API',
      version,
    },
  },
  apis: ['src/cards/card.routes.ts', 'src/cards/card.schemas.ts'],
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
