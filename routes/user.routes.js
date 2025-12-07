import { Router } from 'express';
import { getAllUsers,getUserById} from '../controllers/user.controller.js';
import authorize from '../middlewares/auth.middleware.js';

const userRouter = Router();

userRouter.get('/',(req, res, next) => {
  getAllUsers(req, res, next);
});
userRouter.get('/:id', authorize, (req, res, next) => {
  getUserById(req, res, next);
});

userRouter.post('/',(req, res) => {
  res.status(200).json({ title: 'Create User', message: 'Create User' });
});

userRouter.put('/:id',(req, res) => {
  res.status(200).json({ title: 'Update User by ID', message: 'Update User by ID' });
});

userRouter.delete('/:id',(req, res) => {
  res.status(200).json({ title: 'Delete User by ID', message: 'Delete User by ID' });
});

export default userRouter;