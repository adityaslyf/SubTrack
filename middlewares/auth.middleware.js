import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/env.js';
import User from '../models/user.model.js';

 const authorize = async (req, res, next) => {
  try {
    let token;
    if(req.headers.authorization?.startsWith('Bearer')){
      token = req.headers.authorization.split(' ')[1];
    }
    if(!token){
      const error = new Error('Unauthorized');
      error.statusCode = 401;
      return next(error);
    }
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decoded.userId);
    if(!user){
      const error = new Error('Unauthorized');
      error.statusCode = 401;
      return next(error);
    }
    req.user = user;
    next();
  } catch (error) {
    // JWT verification errors or database errors
    error.statusCode = 401;
    next(error);
  }
};

export default authorize;
