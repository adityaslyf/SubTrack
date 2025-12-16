import Subscription from '../models/subscription.model.js';
import { ErrorResponse } from '../middlewares/error.middleware.js';

export const createSubscription = async (req, res, next) => {
  try {
    const subscription = await Subscription.create({
      ...req.body,
      user: req.user._id,
    });
    res.status(201).json({
      success: true,
      message: 'Subscription created successfully',
      data: subscription,
    });
  } catch (error) {
    next(error);
  }
};

export const getSubscriptions = async (req, res, next) => {
  try {
    // Check if the authenticated user is requesting their own subscriptions
    if(req.user._id.toString() !== req.params.id) {
      return next(new ErrorResponse('You are not authorized to access this resource', 401));
    }
    const subscriptions = await Subscription.find({ user: req.params.id });
    res.status(200).json({
      success: true,
      message: 'Subscriptions fetched successfully',
      data: subscriptions,
    });
  } catch (error) {
    next(error);
  }
};