import mongoose from 'mongoose';

const subscriptionSchema = new mongoose.Schema({
  name:{
    type: String,
    required: [true, 'Subscription Name is required'],
    trim: true,
    minlength: [3, 'Subscription Name must be at least 3 characters long'],
    maxlength: [50, 'Subscription Name must be less than 50 characters long'],
  },
  price:{
    type: Number,
    required: [true, 'Subscription Price is required'],
    min: [0, 'Subscription Price must be greater than 0'],
  },
  currency:{
    type: String,
    required: [true, 'Subscription Currency is required'],
    trim: true,
    enum: ['USD', 'EUR', 'INR']
  },
  frequency:{
    type: String,
    required: [true, 'Subscription Frequency is required'],
  },
  category:{
    type: String,
    required: [true, 'Subscription Category is required'],
    trim: true,
    enum: ['Food', 'Entertainment', 'Shopping', 'Other'],
  },
  paymentMethod:{
    type: String,
    required: [true, 'Payment Method is required'],
    trim: true,
  },
  status:{
    type: String,
    required: [true, 'Subscription Status is required'],
    default: 'Active',
    enum: ['Active', 'Inactive', 'Cancelled'],
  },
startDate:{
  type: Date,
  required: [true, 'Start Date is required'],
  validate: {
    validator: function(startDate) {
      return startDate < new Date();
    },
    message: 'Start Date must be in the past',
  },
},
renewalDate:{
  type: Date,
  validate: {
    validator: function(renewalDate) {
      return renewalDate > this.startDate;
    },
    message: 'Renewal Date must be in the future',
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User is required'],
    index: true,
  }
},  
}, {timestamps: true});

subscriptionSchema.pre('save', function(next) {

  if(!this.renewalDate) {
    const renewalperiod ={
      Daily: 1,
      Weekly: 7,
      Monthly: 30,
      Yearly: 365,
    };
    this.renewalDate = new Date(this.startDate);
    this.renewalDate.setDate(this.renewalDate.getDate() + renewalperiod[this.frequency]);
  }
  if(this.renewalDate < new Date()) {
    this.status = 'Inactive';
  }
  next();
});

export default Subscription;