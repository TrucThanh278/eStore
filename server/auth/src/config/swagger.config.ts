import { Express } from 'express';
import { serve, setup } from 'swagger-ui-express';
import * as swaggerJsdoc from 'swagger-jsdoc';
const options = {
  definition: {
    openapi: '3.1.0',
    info: {
      title: 'eStore Express API with Swagger',
      version: '0.1.0',
      description:
        'This is a simple CRUD API application made with Express and documented with Swagger',
    },
    servers: [
      {
        url: 'http://localhost:3000',
      },
    ],
  },
  apis: ['./routes/*.js'],
};
const specs = swaggerJsdoc(options);
const swaggerInit = (app: Express) => {
  app.use('/api-docs', serve, setup(specs));
};
export default swaggerInit;
