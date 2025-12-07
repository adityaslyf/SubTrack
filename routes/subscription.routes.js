import { Router } from 'express';
import authorize from '../middlewares/auth.middleware.js';
import { createSubscription } from '../controllers/subscription.controller.js';

const subscriptionRouter = Router();

subscriptionRouter.get('/',(req, res) => {
  res.status(200).json({ title: 'Get All Subscriptions', message: 'Get All Subscriptions' });
});
subscriptionRouter.get('/:id',(req, res) => {
  res.status(200).json({ title: 'Get Subscription by ID', message: 'Get Subscription by ID' });
});
subscriptionRouter.post('/', authorize, createSubscription);

subscriptionRouter.put('/:id',(req, res) => {
  res.status(200).json({ title: 'Update Subscription by ID', message: 'Update Subscription by ID' });
});
subscriptionRouter.delete('/:id',(req, res) => {
  res.status(200).json({ title: 'Delete Subscription by ID', message: 'Delete Subscription by ID' });
});

subscriptionRouter.get('/user/:id',(req, res) => {
  res.status(200).json({ title: 'Get Subscriptions by User ID', message: 'Get Subscriptions by User ID' });
});

subscriptionRouter.get('/:id/cancel',(req, res) => {
  res.status(200).json({ title: 'Cancel Subscription by ID', message: 'Cancel Subscription by ID' });
});

subscriptionRouter.get('/upcoming-renewals',(req, res) => {
  res.status(200).json({ title: 'Get Upcoming Renewals', message: 'Get Upcoming Renewals' });
});


export default subscriptionRouter;