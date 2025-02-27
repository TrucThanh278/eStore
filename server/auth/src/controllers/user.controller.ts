import { UserEntity } from '../entity/user.entity';
import { dataSource } from '../data-source';
import { Request, Response } from 'express';
import { instanceToPlain } from 'class-transformer';
import { StatusCodesList } from '../common/constants/status-codes.constant';
import { ExceptionMessageList } from '../common/constants/exception-title-list.constants';
import { RoleEntity } from '../entity/role.entity';
import init, { meta } from '../pagination/meta';
import uploadToCloudinary from '../utils/cloudinary';

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
  try {
    const user = userRepository.create({
      username,
      name,
      password,
      email,
      address,
      avatar:
        'https://res.cloudinary.com/ddwhlsmqv/image/upload/v1740634202/defaultAvatar.png',
      role: role ?? undefined,
    });
    if (req.file) {
      const result = await uploadToCloudinary(req.file);
      user.avatar = result.url;
    }
    const result = await userRepository.save(user);
    res
      .status(StatusCodesList.Created)
      .json({ result: instanceToPlain(result) });
  } catch (e) {
    console.error('>>>> Error store user: ', e);
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
  try {
    if (existUser) {
      const { username, name, email, address } = req.body;
      Object.assign(existUser, {
        username: username ?? existUser.username,
        name: name ?? existUser.name,
        email: email ?? existUser.email,
        address: address ?? existUser.address,
        avatar: req.file
          ? await uploadToCloudinary(req.file).then((res) => res.url)
          : existUser.avatar,
      });
      const result = await userRepository.save(existUser);
      res
        .status(StatusCodesList.Success)
        .json({ result: instanceToPlain(result) });
    } else {
      res
        .status(StatusCodesList.NotFound)
        .json({ result: ExceptionMessageList.NotFound });
    }
  } catch (e) {
    console.error('>>>> Error update user: ', e);
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
