import { Router } from 'express';
import {
  deleteUser,
  fetchUsers,
  storeUser,
  updateUser,
} from '../controllers/user.controller';
import { upload } from '../config/multer.config';

export const router = Router();
/**
 * @swagger
 * /users:
 *   get:
 *     summary: Lấy danh sách người dùng
 *     responses:
 *       200:
 *         description: Thành công
 */
router.get('/', fetchUsers);
/**
 * @swagger
 * /users:
 *   post:
 *     summary: thêm người dùng
 *     responses:
 *       201:
 *         description: Thành công
 */
router.post('/', upload().single('avatar'), storeUser);
/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: chỉnh sửa người dùng
 *     responses:
 *       200:
 *         description: Thành công
 */
router.put('/:id', upload().single('avatar'), updateUser);
/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: xóa người dùng
 *     responses:
 *       204:
 *         description: Thành công
 */
router.delete('/:id', deleteUser);
