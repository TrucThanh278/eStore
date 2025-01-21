import 'reflect-metadata';
import express, { Express, Request, Response } from 'express';
import swaggerInit from './config';
import databaseInitialize from './config/database.init';
const app: Express = express();
const port = process.env.PORT || 3000;
swaggerInit(app);
databaseInitialize();

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});

