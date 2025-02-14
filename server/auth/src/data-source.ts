import 'reflect-metadata';
import { DataSource, DataSourceOptions } from 'typeorm';
import { UserEntity } from './entity/user.entity';
import { PermissionEntity } from './entity/permission.entity';
import { RoleEntity } from './entity/role.entity';
import { SeederOptions } from 'typeorm-extension';
import { RefreshToken } from './entity/refresh-token.entity';

const options: DataSourceOptions & SeederOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'ThanhTruc2708',
  database: 'estore',
  synchronize: false,
  logging: false,
  entities: [UserEntity, PermissionEntity, RoleEntity, RefreshToken],
  seeds: ['src/database/seeds/**/*{.ts,.js}'], // TypeORM sẽ tự tìm file seed ở đây
  migrations: ['src/database/migrations/**/*.ts'], // TypeORM sẽ tự tìm file migration ở đây
  subscribers: [],
};

export const dataSource = new DataSource(options);
