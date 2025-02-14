import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';
import { UserEntity } from '../../entity/user.entity';
import { RoleEntity } from '../../entity/role.entity';

export class UserSeeder implements Seeder {
  async run(dataSource: DataSource): Promise<void> {
    const userRepo = dataSource.getRepository(UserEntity);
    const roleRepo = dataSource.getRepository(RoleEntity);

    // Lấy role từ database
    const adminRole = await roleRepo.findOne({ where: { name: 'ADMIN' } });
    const userRole = await roleRepo.findOne({ where: { name: 'USER' } });

    if (!adminRole || !userRole) {
      console.error('>>>>>> Roles not found! Run RoleSeeder first.');
      return;
    }

    await userRepo.insert([
      {
        username: 'admin',
        name: 'Admin',
        password: 'admin',
        email: 'admin123@gmail.com',
        address: 'Vietnam',
        role: adminRole,
      },
      {
        username: 'user1',
        name: 'user1',
        password: 'user1',
        email: 'user1123@gmail.com',
        address: 'Vietnam',
        role: userRole,
      },
    ]);

    console.log('>>>>>> Seeded Users!');
  }
}
