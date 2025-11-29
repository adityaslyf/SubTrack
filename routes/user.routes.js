import { Router } from 'express';

const userRouter = Router();

userRouter.get('/',(req, res) => {
  res.status(200).json({ title: 'Get All Users', message: 'Get All Users' });
});
userRouter.get('/:id',(req, res) => {
  res.status(200).json({ title: 'Get User by ID', message: 'Get User by ID' });
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