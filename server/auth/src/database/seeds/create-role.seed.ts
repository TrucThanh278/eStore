import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';
import { RoleEntity } from '../../entity/role.entity';

export class RoleSeeder implements Seeder {
  async run(dataSource: DataSource): Promise<void> {
    const roleRepo = dataSource.getRepository(RoleEntity);

    await roleRepo.insert([
      { name: 'ADMIN', description: 'Admin Role' },
      { name: 'USER', description: 'User Role' },
    ]);

    // const roleFactory = await factoryManager.get(RoleEntity);
    // // save 1 factory generated entity, to the database
    // await roleFactory.save();

    console.log('>>>>>> Seeded Roles!');
  }
}
