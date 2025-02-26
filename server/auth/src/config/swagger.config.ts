import { Express } from 'express';
import { serve, setup } from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';
import path from 'path';

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
  apis: [path.join(__dirname, '../routes/user.route.ts')],
};
const specs = swaggerJSDoc(options);
const swaggerInit = (app: Express) => {
  app.use('/api-docs', serve, setup(specs, { explorer: true }));
};
export default swaggerInit;
