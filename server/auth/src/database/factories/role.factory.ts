import { setSeederFactory } from 'typeorm-extension';
import { RoleEntity } from '../../entity/role.entity';

// Nếu muốn sử dụng instance factory của RoleEntity thì nên dùng facker để random data cho các field.
const roleFactory = setSeederFactory(RoleEntity, () => {
  const role = new RoleEntity();
  role.name = 'Test2';
  role.description = 'Test2';
  return role;
});
export default roleFactory;
