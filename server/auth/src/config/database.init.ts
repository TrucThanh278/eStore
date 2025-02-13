import { AppDataSource } from '../data-source';
import { RoleEntity } from '../entity/role.entity';
import { UserEntity } from '../entity/user.entity';

const databaseInitialize = async () => {
  const roles = ['ADMIN', 'USER'];
  try {
    await AppDataSource.initialize();
    const currentRole = await AppDataSource.manager.find(RoleEntity);
    if (currentRole.length!= 0 ) return;
    for (const role of roles) {
      const roleEntity = new RoleEntity();
      roleEntity.name = role;
      await AppDataSource.manager.save(roleEntity);
      if (role === 'ADMIN') {
        const user = new UserEntity();
        user.username = 'admin';
        user.password = 'admin';
        user.email = 'admin123@gmail.com';
        user.name = 'admin';
        user.address = '';
        user.role = roleEntity;
        await AppDataSource.manager.save(user);
      }
    }
  } catch (error) {
    console.error(error);
  }
};

export default databaseInitialize;
