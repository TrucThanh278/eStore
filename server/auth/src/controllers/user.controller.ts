import { UserEntity } from '../entity/user.entity';
import { dataSource } from '../data-source';
import { Request, Response } from 'express';
import { instanceToPlain } from 'class-transformer';
import { StatusCodesList } from '../common/constants/status-codes.constant';
import { ExceptionMessageList } from '../common/constants/exception-title-list.constants';
import { RoleEntity } from '../entity/role.entity';
import init, { meta } from '../pagination/meta';

export const fetchUsers = async (req: Request, res: Response) => {
  const { page } = req.query;
  const { page_size, current_page, offset } = init(page);
  const userRepository = dataSource.getRepository(UserEntity);
  const [users, totalUsers] = await userRepository
    .createQueryBuilder('user')
    .innerJoin('user.role', 'role')
    .select(['user', 'role'])
    .take(page_size)
    .skip(offset)
    .getManyAndCount();
  res
    .status(!users.length ? StatusCodesList.NotFound : StatusCodesList.Success)
    .json({
      meta: meta({
        current_page: current_page,
        page_size: page_size,
        totalItems: totalUsers,
        count: users.length,
      }),
      result: instanceToPlain(users),
    });
};

export const storeUser = async (req: Request, res: Response) => {
  const { username, name, password, email, address, roleId } = req.body;
  const userRepository = dataSource.getRepository(UserEntity);
  const roleRepository = dataSource.getRepository(RoleEntity);
  const role = await roleRepository.findOne({ where: { id: roleId } });
  const user = userRepository.create({
    username,
    name,
    password,
    email,
    address,
    role: role ?? undefined,
  });

  try {
    const result = await userRepository.save(user);
    res
      .status(StatusCodesList.Created)
      .json({ result: instanceToPlain(result) });
  } catch {
    res
      .status(StatusCodesList.BadRequest)
      .json({ result: ExceptionMessageList.BadRequest });
  }
};

/*
 * @description: This function for administrators that they update others user
 */
export const updateUser = async (req: Request, res: Response) => {
  const userRepository = dataSource.getRepository(UserEntity);
  const existUser = await userRepository.findOne({
    where: { id: parseInt(req.params.id) },
  });
  console.log(existUser);
  try {
    //  chuyển việc check role sang  middleware
    if (existUser) {
      const { username, name, email, address } = req.body;
      Object.assign(existUser, {
        username: username ?? existUser.username,
        name: name ?? existUser.name,
        email: email ?? existUser.email,
        address: address ?? existUser.address,
      });
      const result = await userRepository.save(existUser);
      res
        .status(StatusCodesList.Success)
        .json({ result: instanceToPlain(result) });
    } else
      res
        .status(StatusCodesList.UnauthorizedAccess)
        .json({ result: ExceptionMessageList.Unauthorized });
  } catch {
    res
      .status(StatusCodesList.BadRequest)
      .json({ result: ExceptionMessageList.BadRequest });
  }
  return;
};

/*
 * @description: This function for administrators that they delete others user
 */
export const deleteUser = async (req: Request, res: Response) => {
  const userRepository = dataSource.getRepository(UserEntity);
  const existUser = await userRepository.findOne({
    where: { id: parseInt(req.params.id) },
  });
  try {
    if (existUser) await userRepository.remove(existUser);
    res
      .status(StatusCodesList.Deleted)
      .json({ result: ExceptionMessageList.NoContent });
  } catch {
    res
      .status(StatusCodesList.BadRequest)
      .json({ result: ExceptionMessageList.BadRequest });
  }
};
