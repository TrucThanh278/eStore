import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { UserEntity } from './entity/user.entity';
import { PermissionEntity } from './entity/permission.entity';
import { RoleEntity } from './entity/role.entity';

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'ngoquang178',
  database: 'estore',
  synchronize: false,
  logging: false,
  entities: [UserEntity, PermissionEntity, RoleEntity],
  migrations: ['src/database/migrations/**/*.ts'], // TypeORM sẽ tự tìm file migration ở đây
  subscribers: [],
});
