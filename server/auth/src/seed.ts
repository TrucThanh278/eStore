import 'reflect-metadata';
import { runSeeders } from 'typeorm-extension';
import { dataSource } from './data-source';
import { UserSeeder } from './database/seeds/create-user.seed';
import { RoleSeeder } from './database/seeds/create-role.seed';

(async () => {
  try {
    await dataSource.initialize();
    await runSeeders(dataSource, {
      seeds: [RoleSeeder, UserSeeder], // Chạy RoleSeeder trước, UserSeeder sau
    });
    console.log('>>>>> Database & seed init successfully!');
  } catch (error) {
    console.error('>>>>> Error database & seed init: ', error);
  } finally {
    dataSource.destroy();
  }
})();
