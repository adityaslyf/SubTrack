import { Router } from 'express';
import { signup, signin, signout } from '../controllers/auth.controller.js';

const authRouter = Router();

authRouter.post('/signup', signup);

authRouter.post('/signin', signin, (req, res) => {
  res.status(200).json({ message: 'Signin' });
});

authRouter.post('/signout', signout, (req, res) => {
  res.status(200).json({ message: 'Signout' });
});


export default authRouter;