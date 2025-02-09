const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true, // Corrected from 'require' to 'required'
      minlength: 2, // Corrected from 'min' to 'minlength'
      maxlength: 100, // Corrected from 'max' to 'maxlength'
    },
    email: {
      type: String,
      required: true, // Corrected from 'require' to 'required'
      maxlength: 100, // Corrected from 'max' to 'maxlength'
      unique: true,
    },
    password: {
      type: String,
      required: true, // Corrected from 'require' to 'required'
      minlength: 5, // Corrected from 'min' to 'minlength'
    },
    city: String,
    state: String,
    country: String,
    occupation: String,
    phoneNumber: String,
    transaction: Array,
    role: {
      type: String, // Added type for the 'role' field
      enum: ["user", "admin", "superadmin"],
      default: "admin",
    },
  },
  { timestamps: true }
);

const User = mongoose.model('User', UserSchema);

module.exports = User;
