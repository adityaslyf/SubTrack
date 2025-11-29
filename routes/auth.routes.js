import { Router } from 'express';

const authRouter = Router();

authRouter.post('/signup',(req, res) => {
  res.status(200).json({ message: 'Signup' });
});

authRouter.post('/signin',(req, res) => {
  res.status(200).json({ message: 'Signin' });
});

authRouter.post('/signout',(req, res) => {
  res.status(200).json({ message: 'Signout' });
});


export default authRouter;