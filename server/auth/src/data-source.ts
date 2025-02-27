import 'reflect-metadata';
import { DataSource, DataSourceOptions } from 'typeorm';
import { UserEntity } from './entity/user.entity';
import { PermissionEntity } from './entity/permission.entity';
import { RoleEntity } from './entity/role.entity';
import { SeederOptions } from 'typeorm-extension';
import { RefreshToken } from './entity/refresh-token.entity';

const options: DataSourceOptions & SeederOptions = {
  type: process.env.DB_TYPE,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: false,
  logging: true,
  entities: [UserEntity, PermissionEntity, RoleEntity, RefreshToken],
  seeds: ['src/database/seeds/**/*{.ts,.js}'], // TypeORM sẽ tự tìm file seed ở đây
  migrations: ['src/database/migrations/**/*.ts'], // TypeORM sẽ tự tìm file migration ở đây
  subscribers: [],
};

export const dataSource = new DataSource(options);
