import 'reflect-metadata';
import express, { Express } from 'express';
import swaggerInit from './config';
import { dataSource } from './data-source';
import { router } from './routes/user.route';
const app: Express = express();
const port = process.env.PORT || 3000;

(async () => {
  await dataSource.initialize();
  console.log('[server]: Database connection established successfully');

  app.use(express.json());
  app.use('/users', router);
  swaggerInit(app);
  app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
  });
})();
