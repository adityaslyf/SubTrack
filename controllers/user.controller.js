import User from '../models/user.model.js';
import { ErrorResponse } from '../middlewares/errror.middleware.js';

export const getAllUsers = async (req, res, next) => {
  try {
    // Password is excluded by default due to select: false in schema
    const users = await User.find();
    res.status(200).json({ success: true, data: users });
  } catch (error) {
    next(error);
  }
};

export const getUserById = async (req, res, next) => {
  const { id } = req.params;
  try {
    // Password is excluded by default due to select: false in schema
    const user = await User.findById(id);
    if (!user) {
      return next(new ErrorResponse('User not found', 404));
    }
    res.status(200).json({ success: true, data: user });
  } catch (error) {
    next(error);
  }
};

export const createUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const user = await User.create({ name, email, password });
    // Remove password from response
    const userObj = user.toObject();
    delete userObj.password;
    res.status(201).json({ success: true, data: userObj });
  } catch (error) {
    next(error);
  }
};