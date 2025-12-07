import mongoose from 'mongoose';

const userschema = new mongoose.Schema({
  name:{
    type: String, 
    required: [true, 'UserName is required'],
    trim: true,
    minlength: [3, 'UserName must be at least 3 characters long'],
    maxlength: [50, 'UserName must be less than 50 characters long'],
  },
  email:{
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    trim: true,
    lowercase: true,
    validate: {
      validator: function(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
      },
      message: 'Invalid email address',
    },
    minlength: [3, 'Email must be at least 3 characters long'],
    maxlength: [50, 'Email must be less than 50 characters long'],
  },

  password:{
    type: String,
    required: [true, 'Password is required'],
    maxlength: [200, 'Password must be less than 200 characters long'],
    select: false, // Exclude password from queries by default
  },
}, {timestamps: true});

const User = mongoose.model('User', userschema);

export default User;