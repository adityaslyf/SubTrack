import mongoose from 'mongoose';
import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { JWT_SECRET, JWT_EXPIRE_IN } from '../config/env.js';
import { ErrorResponse } from '../middlewares/error.middleware.js';

export const signup = async (req, res, next) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const { name, email, password } = req.body;

    // Validate required fields
    if (!name || !email || !password) {
      const error = new Error('Name, email, and password are required');
      error.statusCode = 400;
      throw error;
    }

    // Validate password requirements
    if (password.length < 8) {
      const error = new Error('Password must be at least 8 characters long');
      error.statusCode = 400;
      throw error;
    }
    if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password)) {
      const error = new Error('Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character');
      error.statusCode = 400;
      throw error;
    }

    const existingUser = await User.findOne({ email }, null, { session })

    if (existingUser) {
      const error = new Error('User already exist')
      error.statusCode = 409;
      throw error;
    }

    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(password, salt);

    const newUsers = await User.create([{ name, email, password: hashPassword }], { session });

    const token = jwt.sign({ userId: newUsers[0]._id }, JWT_SECRET, { expiresIn: JWT_EXPIRE_IN })
    
    // Convert user to object and remove password before sending response
    const userObj = newUsers[0].toObject();
    delete userObj.password;
    
    await session.commitTransaction();
    session.endSession();
    res.status(201).json({
       success:true,
       message: 'User created successfully',
       data: {
        token,
        user: userObj
       }
       });

  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    next(error);
  }
};

export const signin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    // Explicitly select password field since it's excluded by default
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return next(new ErrorResponse('Invalid email or password', 401));
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return next(new ErrorResponse('Invalid email or password', 401));
    }
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: JWT_EXPIRE_IN });
    res.status(200).json({ message: 'Signin successful', token });
  } catch (error) {
    next(error);
  }
};

export const signout = async (req, res, next) => {
  try {
    res.clearCookie('token');
    res.status(200).json({ message: 'Signout successful' });
  } catch (error) {
    next(error);
  }
};

export default { signup, signin, signout };