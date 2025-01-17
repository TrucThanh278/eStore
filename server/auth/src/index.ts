// import { AppDataSource } from './data-source';
// import { UserEntity } from './entity/user.entity';
// import express, { Express, Request, Response } from 'express';
// import swaggerInit from './config';

// AppDataSource.initialize()
//   .then(async () => {
//     console.log('Inserting a new user into the database...');
//     const user = new UserEntity();
//     user.username = 'admin';
//     user.password = 'Admin@123';
//     user.email = 'admin123@gmail.com';
//     await AppDataSource.manager.save(user);
//     console.log('Saved a new user with id: ' + user.id);

//     console.log('Loading users from the database...');
//     const users = await AppDataSource.manager.find(UserEntity);
//     console.log('Loaded users: ', users);

//     console.log(
//       'Here you can setup and run express / fastify / any other framework.',
//     );
//   })
//   .catch((error) => console.log(error));

// const app: Express = express();
// const port = process.env.PORT || 3000;
// swaggerInit(app);

// app.get('/', (req: Request, res: Response) => {
//   res.send('Express + TypeScript Server');
// });

// app.listen(port, () => {
//   console.log(`[server]: Server is running at http://localhost:${port}`);
// });

console.log('Hello World!');
